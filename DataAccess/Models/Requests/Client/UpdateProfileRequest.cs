namespace DataAccess.Models.Requests.Client;

public class UpdateProfileRequest
{
    public int Id { get; set; }
    public string Name { get; set; } = null!;

    public string Email { get; set; } = null!;
    
    public string? Password { get; set; }
    
    public string? Phone { get; set; }

    public string? City { get; set; }

    public string? Street { get; set; }

    public int? Unit { get; set; }

    public string? Postalcode { get; set; }
}