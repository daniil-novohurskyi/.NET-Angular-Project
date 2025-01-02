using DataAccess.Models.DTO;

namespace DataAccess.Models.Requests.Client;

public class CreateOrderRequest
{
    public int UserId { get; set; }
    
    public DeliveryDetailsDTO DeliveryDetails { get; set; } = null!;

    public string Status { get; set; } = null!;
    
    public DateOnly Date { get; set; }

    public ICollection<OrderItemUpsertDTO> OrderItems { get; set; } = null!;
}