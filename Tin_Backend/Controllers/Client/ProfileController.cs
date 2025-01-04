using DataAccess.Models.DTO;
using DataAccess.Models.Requests.Admin.Users;
using DataAccess.Models.Requests.Client;
using DataAccess.Models.Responses.Admin.Users;
using DataAccess.Repository.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace Tin_Backend.Controllers.Client;

[ApiController]
[Route("profile")]
public class ProfileController:ControllerBase
{
    private readonly IUnitOfWork _unitOfWork;

    public ProfileController(IUnitOfWork unitOfWork)
    {
        _unitOfWork = unitOfWork;
    }

    [HttpPost]
    public async Task<IActionResult> GetProfile([FromBody] GetProfileInfoRequest request)
    {
        //check if exists user with provided Id
        var user = await _unitOfWork.UserRepository.GetByIdAsync(request.UserId);
        if (user == null)
        {
            return NotFound("user not found");
        }
        var usersWithIncludes = await _unitOfWork.UserRepository.GetByIdWithIncludesAsync(request.UserId, user => user.Orders);
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
            Postalcode = usersWithIncludes.Postalcode,
            Orders = ordersDto
        };
        return Ok(response);
    }
    
    [HttpPut]
    public async Task<IActionResult> EditProfile([FromBody] UpdateProfileRequest request)
    {
        await _unitOfWork.BeginTransactionAsync();
        //check if exists
        var userUpdating = await _unitOfWork.UserRepository.GetByIdAsync(request.Id);
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
        
        userUpdating.City = request.City;
        userUpdating.Phone = request.Phone;
        userUpdating.Email = request.Email;
        userUpdating.Name = request.Name;
        userUpdating.Postalcode = request.Postalcode;
        userUpdating.Street = request.Street;
        userUpdating.Unit = request.Unit;
        //TODO:Hash password
        if (request.Password != null)
            userUpdating.Password = request.Password;
        await _unitOfWork.UserRepository.UpdateAsync(userUpdating);
        await _unitOfWork.SaveChangesAsync();
        
        var response = new UserUpsertResponse()
        {
            Name = userUpdating.Name,
            Email = userUpdating.Email,
            Phone = userUpdating.Phone,
            Role = userUpdating.Role,
            City = userUpdating.City,
            Street = userUpdating.Street,
            Unit = userUpdating.Unit,
            Postalcode = userUpdating.Postalcode
        };
        await _unitOfWork.CommitTransactionAsync();
        return Ok(response);
    }
    
}