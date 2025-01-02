using DataAccess.Models.Domain;
using DataAccess.Models.DTO;
using DataAccess.Models.Requests.Client;
using DataAccess.Models.Responses.Client;
using DataAccess.Repository.Interfaces;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;

namespace Tin_Backend.Controllers.Client;

[ApiController]
public class CartContoller : ControllerBase
{
    private readonly IUnitOfWork _unitOfWork;

    public CartContoller(IUnitOfWork unitOfWork)
    {
        _unitOfWork = unitOfWork;
    }

    [HttpPost]
    [Route("cart")]
    public async Task<IActionResult> GetCartBooks([FromBody] List<string>? booksIsbn)
    {
        if (booksIsbn == null || !booksIsbn.Any())
        {
            return BadRequest("List of books isbn must be not empty.");
        }

        var books = await _unitOfWork.BookRepository.GetAllFromIdList(booksIsbn);

        var response = books.Select(book => new CartItemResponse()
        {
            Isbn = book.Isbn,
            CoverUrl = book.Cover,
            Price = book.Price,
            Title = book.Title
        });

        return Ok(response);
    }

    [HttpPost]
    [Route("order")]
    public async Task<IActionResult> CreateOrder([FromBody] CreateOrderRequest request)
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
}