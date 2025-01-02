namespace DataAccess.Models.Responses.Client;

public class CartItemResponse
{
    public string Isbn { get; set; }
    public string Title { get; set; }
    public decimal Price { get; set; }
    public string CoverUrl { get; set; }
}