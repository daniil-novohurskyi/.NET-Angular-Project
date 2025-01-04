namespace DataAccess.Models.Requests.Admin.Users;

public class UserUpdateInfoRequest
{
    public string Name { get; set; } = null!;
    
    public string Role { get; set; } = null!;

    public string? Phone { get; set; }

    public string? City { get; set; }

    public string? Street { get; set; }

    public int? Unit { get; set; }

    public string? Postalcode { get; set; }
}