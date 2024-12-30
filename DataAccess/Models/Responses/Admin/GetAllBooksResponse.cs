namespace DataAccess.Models.Responses.Admin;

public class GetAllBooksResponse
{
    public string Isbn { get; set; }= null!;
    public string Title { get; set; } = null!;
    public string Author { get; set; }= null!;
    public string Genre { get; set; }= null!;
}