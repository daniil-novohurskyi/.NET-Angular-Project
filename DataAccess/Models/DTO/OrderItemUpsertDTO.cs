namespace DataAccess.Models.DTO;

public class OrderItemUpsertDTO
{
    public string Isbn { get; set; } = null!;
    public int Quantity { get; set; }
}