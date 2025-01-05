using DataAccess.Models.DTO;

namespace DataAccess.Models.Requests.Admin.Orders;

public class OrderUpsertRequest
{
    public int UserId { get; set; }
    
    public DeliveryDetailsDTO DeliveryDetails { get; set; } = null!;

    public string Status { get; set; } = null!;
    
    public DateOnly Date { get; set; }

    public ICollection<OrderItemUpsertDTO> OrderItems { get; set; } = null!;
    public decimal TotalPrice { get; set; }
}