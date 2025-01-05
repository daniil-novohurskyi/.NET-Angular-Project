namespace DataAccess.Models.Responses.Guest;

public class ShowcaseBookResponse
{
    public string Isbn { get; set; }

    public string CoverUrl { get; set; }
    public string Title { get; set; }
    public string Author { get; set; }
    public string Genre { get; set; }
    
    public string Description { get; set; }
    public int PublishingYear { get; set; }
    public decimal Price { get; set; }
}