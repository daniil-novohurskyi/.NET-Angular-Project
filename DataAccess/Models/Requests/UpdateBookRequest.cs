using Microsoft.AspNetCore.Http;

namespace DataAccess.Models.Requests;

public class UpdateBookRequest
{
    public string Author { get; set; }

    public string Genre { get; set; }
    
    public string? Description { get; set; }

    public string Title { get; set; } = null!;
    
    public int Publishingyear { get; set; }

    public decimal Price { get; set; }

    public IFormFile? Cover { get; set; } = null!;
}