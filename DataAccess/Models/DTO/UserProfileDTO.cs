namespace DataAccess.Models.DTO;

public class UserProfileDTO
{
    public string Name { get; set; } = null!;

    public string Email { get; set; } = null!;
    
    public string Role { get; set; } = null!;

    public string? Phone { get; set; }

    public string? City { get; set; }

    public string? Street { get; set; }

    public int? Unit { get; set; }

    public string? PostalCode { get; set; }
}