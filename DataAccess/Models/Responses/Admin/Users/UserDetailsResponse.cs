using DataAccess.Models.DTO;

namespace DataAccess.Models.Responses.Admin.Users;

public class UserDetailsResponse
{

    public string Name { get; set; } = null!;

    public string Email { get; set; } = null!;
    
    public string Role { get; set; } = null!;

    public string? Phone { get; set; }

    public string? City { get; set; }

    public string? Street { get; set; }

    public int? Unit { get; set; }

    public string? Postalcode { get; set; }
    
    public ICollection<OrderDTO> Orders { get; set; } = new List<OrderDTO>();
}