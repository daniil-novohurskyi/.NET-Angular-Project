namespace DataAccess.Models.Responses.Guest;

public class ShowcaseItemBooksResponse
{
    public string Isbn { get; set; }
    public string CoverUrl { get; set; }
    public string Title { get; set; }
    public decimal Price { get; set; }
}