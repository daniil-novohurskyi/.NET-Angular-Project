namespace DataAccess.Models.DTO;

public class OrderDetailsDTO
{
    public string Id { get; set; }
    
    public DateOnly Date { get; set; }
    
    public string Status { get; set; } = null!;
    
    public decimal? TotalPrice { get; set; }
}