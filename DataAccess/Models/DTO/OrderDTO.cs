namespace DataAccess.Models.DTO;

public class OrderDTO
{
    public string Id { get; set; } = null!;
    public DateOnly Date { get; set; }
    public string Status { get; set; } = null!;
    public decimal? Totalprice { get; set; }


    
}