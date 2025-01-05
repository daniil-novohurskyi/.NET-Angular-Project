namespace DataAccess.Models.Responses.Admin.Books;

public class CartItemResponse
{
    public string Isbn { get; set; }
    public string Title { get; set; }
    public string CoverUrl  { get; set; }
    public decimal PricePerUnit { get; set; }
    public int Quantity { get; set; }
    public decimal Price { get; set; }
}