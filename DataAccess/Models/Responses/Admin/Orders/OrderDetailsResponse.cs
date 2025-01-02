using DataAccess.Models.DTO;

namespace DataAccess.Models.Responses.Admin.Orders;

public class OrderDetailsResponse
{
    public ClientDTO Client { get; set; } =null!;

    public DeliveryDetailsDTO DeliveryDetails { get; set; } = null!;

    public OrderDetailsDTO OrderDetails { get; set; } = null!;

    public ICollection<OrderItemDTO> OrderItems { get; set; } = new List<OrderItemDTO>();
}