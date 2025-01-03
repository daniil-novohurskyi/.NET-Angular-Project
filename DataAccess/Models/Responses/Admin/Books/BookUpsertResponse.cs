namespace DataAccess.Models.Responses.Admin;

public class BookUpsertResponse
{
    public string Isbn { get; set; }

    public string Author { get; set; }

    public string Genre { get; set; }

    public string Title { get; set; } = null!;
    
    public int PublishingYear { get; set; }

    public decimal Price { get; set; }

    public string CoverUrl { get; set; } = null!;
    public string Description { get; set; } = null!;
}