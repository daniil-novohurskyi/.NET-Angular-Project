namespace DataAccess.Models.Responses.Admin;

public class BookResponse
{
    public string Isbn { get; set; }

    public string Author { get; set; }

    public string Genre { get; set; }

    public string Title { get; set; } = null!;
    
    public int Publishingyear { get; set; }

    public decimal Price { get; set; }

    public string Cover { get; set; } = null!;


}