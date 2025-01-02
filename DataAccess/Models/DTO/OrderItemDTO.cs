namespace DataAccess.Models.DTO;

public class OrderItemDTO
{
    public int? Id { get; set; }
    public string? Isbn { get; set; } = null!;
    
    public string Title { get; set; } = null!;

    public string CoverUrl { get; set; } = null!;

    public int Quantity { get; set; }
    
    public decimal PricePerUnit { get; set; }
    
    public decimal Price { get; set; }
    
}