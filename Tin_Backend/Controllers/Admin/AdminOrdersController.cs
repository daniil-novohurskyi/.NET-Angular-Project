using DataAccess.Models.Domain;
using DataAccess.Models.DTO;
using DataAccess.Models.Requests.Admin.Orders;
using DataAccess.Models.Responses.Admin.Orders;
using DataAccess.Repository.Interfaces;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;

namespace Tin_Backend.Controllers.Admin;

[ApiController]
[Route("admin/orders")]
public class AdminOrdersController:ControllerBase
{
    private readonly IUnitOfWork _unitOfWork;

    public AdminOrdersController(IUnitOfWork unitOfWork)
    {
        _unitOfWork = unitOfWork;
    }

    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var ordersWithIncludes = await _unitOfWork.OrderRepository.
            GetAllWithIncludesAsync(order => order.User);
        var response = ordersWithIncludes
            .Select(order => new OrdersGetAllResponse()
            {
                Id = order.Id,
                UserName = order.User.Name,
                Date = order.Date,
                Totalprice = order.TotalPrice,
                Status = order.Status
            });

        return Ok(response);
    }

    [HttpGet]
    [Route("{id}/details")]
    public async Task<IActionResult> GetByIdDetails(string id)
    {
        //check if exists
        var isExisting = await _unitOfWork.OrderRepository.GetByIdAsync(id);
        if (isExisting == null)
        {
            return NotFound("order not found");
        }

        var orderWithDetails = await _unitOfWork.OrderRepository.GetByIdDetailsAsync(id);

        var clientInfo = new ClientDTO()
        {
            Name = orderWithDetails!.User.Name,
            Email = orderWithDetails.User.Email
        };

        var deliveryInfo = new DeliveryDetailsDTO()
        {
            Name = orderWithDetails.DeliveryName,
            Phone = orderWithDetails.DeliveryPhone,
            City = orderWithDetails.DeliveryCity,
            PostalCode = orderWithDetails.DeliveryPostalCode,
            Street = orderWithDetails.DeliveryStreet,
            Unit = orderWithDetails.DeliveryUnit
        };

        var orderInfo = new OrderDetailsDTO()
        {
            Id = orderWithDetails.Id,
            Date = orderWithDetails.Date,
            Status = orderWithDetails.Status,
            TotalPrice = orderWithDetails.TotalPrice
        };

        var orderItems = orderWithDetails.OrderItems
            .Select(orderItem => new OrderItemDTO()
            {
                Id = orderItem.Id,
                Title = orderItem.BookIsbnNavigation.Title,
                CoverUrl = orderItem.BookIsbnNavigation.Cover,
                Isbn = orderItem.BookIsbn,
                Quantity = orderItem.Quantity,
                Price = orderItem.Priceperunit * orderItem.Quantity,
                PricePerUnit = orderItem.Priceperunit
            }).ToList();

        var response = new OrderDetailsResponse()
        {
            Client = clientInfo,
            DeliveryDetails = deliveryInfo,
            OrderDetails = orderInfo,
            OrderItems = orderItems
        };

        return Ok(response);
    }
    
    
    [HttpGet]
    [Route("{id}/edit")]
    public async Task<IActionResult> GetByIdEdit(string id)
    {
        //check if exists
        var isExisting = await _unitOfWork.OrderRepository.GetByIdAsync(id);
        if (isExisting == null)
        {
            return NotFound("order not found");
        }

        var orderWithDetails = await _unitOfWork.OrderRepository.GetByIdDetailsAsync(id);

        var clientInfo = new ClientDTO()
        {
            Name = orderWithDetails!.User.Name,
            Email = orderWithDetails.User.Email
        };

        var deliveryInfo = new DeliveryDetailsDTO()
        {
            Name = orderWithDetails.DeliveryName,
            Phone = orderWithDetails.DeliveryPhone,
            City = orderWithDetails.DeliveryCity,
            PostalCode = orderWithDetails.DeliveryPostalCode,
            Street = orderWithDetails.DeliveryStreet,
            Unit = orderWithDetails.DeliveryUnit
        };

        var orderInfo = new OrderDetailsDTO()
        {
            Id = orderWithDetails.Id,
            Date = orderWithDetails.Date,
            Status = orderWithDetails.Status,
            TotalPrice = orderWithDetails.TotalPrice
        };

        var orderItems = orderWithDetails.OrderItems
            .Select(orderItem => new OrderItemDTO()
            {
                Id = orderItem.Id,
                Title = orderItem.BookIsbnNavigation.Title,
                CoverUrl = orderItem.BookIsbnNavigation.Cover,
                Isbn = orderItem.BookIsbn,
                Quantity = orderItem.Quantity,
                Price = orderItem.Priceperunit * orderItem.Quantity,
                PricePerUnit = orderItem.Priceperunit
            }).ToList();

        var response = new OrderDetailsResponse()
        {
            Client = clientInfo,
            DeliveryDetails = deliveryInfo,
            OrderDetails = orderInfo,
            OrderItems = orderItems
        };

        return Ok(response);
    }
    
    [HttpPut]
    [Route("{id}/edit")]
    public async Task<IActionResult> UpdateById(string id, [FromBody] OrderUpsertRequest request)
    {
        await _unitOfWork.BeginTransactionAsync();
        var clientId = request.UserId;
        
        //check if client exists
        var isExistingUser = await _unitOfWork.UserRepository.GetByIdAsync(clientId);
        if (isExistingUser == null)
        {
            return BadRequest($"cant add orderItem with not existed user, provided user id: {clientId}");
        }

        var orderUpdating = await _unitOfWork.OrderRepository.GetByIdWithIncludesAsync(id, order => order.OrderItems);

        var deliveryInfo = request.DeliveryDetails;

        orderUpdating!.UserId = request.UserId;

        orderUpdating.Status = request.Status;
        
        orderUpdating.DeliveryName = deliveryInfo.Name;
        orderUpdating.DeliveryPhone = deliveryInfo.Phone;
        orderUpdating.DeliveryCity = deliveryInfo.City;
        orderUpdating.DeliveryUnit = deliveryInfo.Unit;
        orderUpdating.DeliveryPostalCode = deliveryInfo.PostalCode;
        orderUpdating.Date = request.Date;

        var orderItemsDtoUpdating = request.OrderItems;
        //find removed orderItems
        var deletedOrderItems = orderUpdating
            .OrderItems.Where(item =>  !orderItemsDtoUpdating.Any(dto => dto.Isbn == item.BookIsbn)).ToList();
        //delete relation between Order and OrderItem
        foreach (OrderItem orderItem in deletedOrderItems)
        {
            orderUpdating.OrderItems.Remove(orderItem);
        }
        //delete record of OrderItem
        _unitOfWork.OrderItemRepository.RemoveRange(deletedOrderItems);
        //updated quantity of existed orderItems or add new orderItems
        foreach (var itemUpsertDto in orderItemsDtoUpdating)
        {
            var updatedOrderItem = orderUpdating.OrderItems.FirstOrDefault(item => item.BookIsbn.Equals(itemUpsertDto.Isbn));
            if (updatedOrderItem != null)
            {
                updatedOrderItem.Quantity = itemUpsertDto.Quantity;
            }
            else
            {
                var book = await _unitOfWork.BookRepository.GetByIdAsync(itemUpsertDto.Isbn);
                if (book == null)
                {
                    return BadRequest($"cant add orderItem with not existed book, provided book id: {itemUpsertDto.Isbn}");
                }

                var newOrderItem = new OrderItem()
                {
                    BookIsbn = book.Isbn,
                    OrderId = orderUpdating.Id,
                    Priceperunit = book.Price,
                    Quantity = itemUpsertDto.Quantity
                };
                await _unitOfWork.OrderItemRepository.AddAsync(newOrderItem);
            }
        }
        await _unitOfWork.SaveChangesAsync();
        await _unitOfWork.CommitTransactionAsync();
        return NoContent();
    }

    [HttpPost]
    [Route("new")]
    public async Task<IActionResult> Create([FromBody] OrderUpsertRequest request)
    {
        await _unitOfWork.BeginTransactionAsync();
        var clientId = request.UserId;

        //check if client exists
        var isExistingUser = await _unitOfWork.UserRepository.GetByIdAsync(clientId);
        if (isExistingUser == null)
        {
            return BadRequest($"cant add orderItem with not existed user, provided user id: {clientId}");
        }

        var deliveryInfo = request.DeliveryDetails;
        var orderId = await _unitOfWork.OrderRepository.GenerateIdASync();

        var order = new Order()
        {
            Id = orderId,
            UserId = request.UserId,
            Status = request.Status,
            DeliveryName = deliveryInfo.Name,
            DeliveryPhone = deliveryInfo.Phone,
            DeliveryCity = deliveryInfo.City,
            DeliveryStreet = deliveryInfo.Street,
            DeliveryUnit = deliveryInfo.Unit,
            DeliveryPostalCode = deliveryInfo.PostalCode,
            Date = request.Date
        };
        await _unitOfWork.OrderRepository.AddAsync(order);
        await _unitOfWork.SaveChangesAsync();

        var orderItems = new List<OrderItem>();
        foreach (OrderItemUpsertDTO itemUpsertDto in request.OrderItems)
        {
            var book = await _unitOfWork.BookRepository.GetByIdAsync(itemUpsertDto.Isbn);
            if (book == null)
            {
                return BadRequest($"cant add orderItem with not existed book, provided book id: {itemUpsertDto.Isbn}");
            }

            var orderItem = new OrderItem()
            {
                BookIsbn = itemUpsertDto.Isbn,
                OrderId = order.Id,
                Quantity = itemUpsertDto.Quantity,
                Priceperunit = book.Price
            };
            await _unitOfWork.OrderItemRepository.AddAsync(orderItem);
        }

        await _unitOfWork.SaveChangesAsync();
        await _unitOfWork.CommitTransactionAsync();
        return Ok();
    }

    

    [HttpDelete]
    [Route("{id}")]
    public async Task<IActionResult> Delete(string id)
    {
        await _unitOfWork.BeginTransactionAsync();
        //check if deleting order exists
        var orderDeleting = await _unitOfWork.OrderRepository.GetByIdAsync(id);
        if(orderDeleting == null)
        {
            return NotFound("order not found");
        } 
        
        orderDeleting = await _unitOfWork.OrderRepository.GetByIdWithIncludesAsync(id, order => order.OrderItems);

        _unitOfWork.OrderItemRepository.RemoveRange(orderDeleting!.OrderItems);
        await _unitOfWork.OrderRepository.DeleteAsync(id);
        await _unitOfWork.SaveChangesAsync();
        await _unitOfWork.CommitTransactionAsync();
        
        return NoContent();
    }
    
}