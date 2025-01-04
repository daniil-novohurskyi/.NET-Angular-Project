namespace DataAccess.Models.Responses.Admin.Users;

public class AdminItemUsersResponse
{
    public int Id { get; set; }
    public string Name { get; set; } = null!;
    
    public string Role { get; set; } = null!;

    public string Email { get; set; } = null!;
    
    public string? Phone { get; set; }
}