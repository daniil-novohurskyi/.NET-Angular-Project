namespace DataAccess.Models.Requests.Admin.Users;

public class UserUpdateCredentialsRequest
{
    public string Email { get; set; } = null!;
    
    public string? Password { get; set; }
}