namespace DataAccess.Models.Responses.Admin.Users;

public class AdminItemOrdersResponse
{
    public string Id { get; set; }
    
    public string ClientName { get; set; } = null!;

    public DateOnly Date { get; set; }

    public decimal TotalPrice { get; set; }
    public string Status { get; set; }
    
}