using DataAccess.Models.Domain;
using DataAccess.Models.DTO;
using DataAccess.Models.Requests.Admin.Users;
using DataAccess.Models.Responses.Admin.Users;
using DataAccess.Repository.Interfaces;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;

namespace Tin_Backend.Controllers.Admin;

[ApiController]
[Route("admin/users")]
public class AdminUsersController :ControllerBase
{
    private readonly IUnitOfWork _unitOfWork;
    private const int Offset = 10;


    public AdminUsersController(IUnitOfWork unitOfWork)
    {
        _unitOfWork = unitOfWork;
    }

    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var users = await _unitOfWork.UserRepository.GetAllAsync();
        var response = users.Select(user => new UsersGetAllResponse()
        {
            Name = user.Name,
            Role = user.Role,
            Email = user.Email,
            Phone = user.Phone
        });
        return Ok(response);
    }
    
    [HttpGet]
    [Route("paginated")]
    public async Task<IActionResult> GetPaginatedBooksAsync([FromQuery] int pageNum)
    {
        var response = await _unitOfWork.UserRepository.GetPaginatedAdminUsersAsync(pageNum, Offset);
        return Ok(response);
    }

    [HttpGet]
    [Route("{id}/details")]
    public async Task<IActionResult> GetByIdDetails(int id)
    {
        //check if exists user with provided Id
        var user = await _unitOfWork.UserRepository.GetByIdAsync(id);
        if (user == null)
        {
            return NotFound("user not found");
        }
        var usersWithIncludes = await _unitOfWork.UserRepository.GetByIdWithIncludesAsync(id, user => user.Orders);
        var orders = usersWithIncludes!.Orders;
        var ordersDto = orders.Select(order => new OrderDTO()
        {
            Id = order.Id,
            Date = order.Date,
            Status = order.Status,
            TotalPrice = order.TotalPrice
        }).ToList();

        var response = new UserDetailsResponse()
        {
            Name = usersWithIncludes.Name,
            Email = usersWithIncludes.Email,
            Phone = usersWithIncludes.Phone,
            Role = usersWithIncludes.Role,
            City = usersWithIncludes.City,
            Street = usersWithIncludes.Street,
            Unit = usersWithIncludes.Unit,
            PostalCode = usersWithIncludes.PostalCode,
            Orders = ordersDto
        };
        return Ok(response);
    }

    [HttpGet]
    [Route("{id}/edit")]
    public async Task<IActionResult> GetByIdEdit(int id)
    {
        await _unitOfWork.BeginTransactionAsync();
        
        var user = await _unitOfWork.UserRepository.GetByIdAsync(id);
        if (user == null)
        {
            return NotFound("user not found");
        }

        var response = new UserUpsertResponse()
        {
            Name = user.Name,
            Email = user.Email,
            Phone = user.Phone,
            Role = user.Role,
            City = user.City,
            Street = user.Street,
            Unit = user.Unit,
            PostalCode = user.PostalCode
        };
        await _unitOfWork.CommitTransactionAsync();
        return Ok(response);
    }

    [HttpPost]
    [Route("new")]
    public async Task<IActionResult> Create([FromBody] UserUpsertRequest request)
    {
        await _unitOfWork.BeginTransactionAsync();
        //check is email unique
        var checkEmail = await _unitOfWork.UserRepository.GetByEmailAsync(request.Email);
        if (checkEmail != null )
        {
            return BadRequest("Email must be unique");
        }

        var createdUser = new User()
        {
            City = request.City,
            Phone = request.Phone,
            Email = request.Email,
            Name = request.Name,
            PostalCode = request.Postalcode,
            Role = request.Role,
            Street = request.Street,
            Unit = request.Unit,
            //TODO:Hash password
            Password = request.Password!
        };
        
        await _unitOfWork.UserRepository.AddAsync(createdUser);
        await _unitOfWork.SaveChangesAsync();
        await _unitOfWork.CommitTransactionAsync();
        
        var response = new UserUpsertResponse()
        {
            Name = createdUser.Name,
            Email = createdUser.Email,
            Phone = createdUser.Phone,
            Role = createdUser.Role,
            City = createdUser.City,
            Street = createdUser.Street,
            Unit = createdUser.Unit,
            PostalCode = createdUser.PostalCode
        };
        return Ok(response);
    }

    [HttpPut]
    [Route("{id}/info/edit")]
    public async Task<IActionResult> UpdateInfoById(int id, [FromBody] UserUpdateInfoRequest request)
    {
        await _unitOfWork.BeginTransactionAsync();
        //check if exists
        var userUpdating = await _unitOfWork.UserRepository.GetByIdAsync(id);
        if (userUpdating == null)
        {
            return NotFound("user not found");
        }
        
        userUpdating.City = request.City;
        userUpdating.Phone = request.Phone;
        userUpdating.Name = request.Name;
        userUpdating.PostalCode = request.Postalcode;
        userUpdating.Role = request.Role;
        userUpdating.Street = request.Street;
        userUpdating.Unit = request.Unit;
        await _unitOfWork.UserRepository.UpdateAsync(userUpdating);
        await _unitOfWork.SaveChangesAsync();
        
        var response = new UserUpsertResponse()
        {
            Name = userUpdating.Name,
            Phone = userUpdating.Phone,
            Role = userUpdating.Role,
            City = userUpdating.City,
            Street = userUpdating.Street,
            Unit = userUpdating.Unit,
            PostalCode = userUpdating.PostalCode
        };
        await _unitOfWork.CommitTransactionAsync();
        return Ok(response);
    }
    
    [HttpPut]
    [Route("{id}/credentials/edit")]
    public async Task<IActionResult> UpdateCredentialsById(int id, [FromBody] UserUpdateCredentialsRequest request)
    {
        await _unitOfWork.BeginTransactionAsync();
        //check if exists
        var userUpdating = await _unitOfWork.UserRepository.GetByIdAsync(id);
        if (userUpdating == null)
        {
            return NotFound("user not found");
        }
        
        //check is email unique
        var checkEmail = await _unitOfWork.UserRepository.GetByEmailAsync(request.Email);
        if (checkEmail != null && checkEmail.Id != userUpdating.Id)
        {
            return BadRequest("Email must be unique");
        }
        
        userUpdating.Email = request.Email;
        //TODO:Hash password
        if (!request.Password.Equals(""))
            userUpdating.Password = request.Password;
        await _unitOfWork.UserRepository.UpdateAsync(userUpdating);
        await _unitOfWork.SaveChangesAsync();
        await _unitOfWork.CommitTransactionAsync();
        return Ok();
    }

    [HttpDelete]
    [Route("{id}")]
    public async Task<IActionResult> DeleteById(int id)
    {
        await _unitOfWork.BeginTransactionAsync();
        var isExisting = await _unitOfWork.UserRepository.GetByIdAsync(id);
        if (isExisting == null)
        {
            return NotFound("user not found");
        }

        var userWithIncludes = await _unitOfWork.UserRepository.GetByIdWithOrderItemsAsync(id);
        foreach (var order in userWithIncludes!.Orders)
        {
            _unitOfWork.OrderItemRepository.RemoveRange(order.OrderItems);
        }
        _unitOfWork.OrderRepository.RemoveRange(userWithIncludes.Orders);
        await _unitOfWork.UserRepository.DeleteAsync(id);
        await _unitOfWork.SaveChangesAsync();
        await _unitOfWork.CommitTransactionAsync();
        return NoContent();
    }
}