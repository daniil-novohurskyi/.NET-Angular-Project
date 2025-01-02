namespace DataAccess.Models.Responses.Admin.Orders;

public class OrdersGetAllResponse
{
    public string Id { get; set; } = null!;
    
    public string UserName { get; set; } = null!;

    public DateOnly Date { get; set; }

    public decimal? Totalprice { get; set; }
    
    public string Status { get; set; } = null!;
    
}