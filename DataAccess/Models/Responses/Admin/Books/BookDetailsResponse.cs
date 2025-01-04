using DataAccess.Models.Domain;
using DataAccess.Models.DTO;

namespace DataAccess.Models.Responses.Admin;

public class BookDetailsResponse
{
    public string Isbn { get; set; }

    public string Author { get; set; }

    public string Genre { get; set; }

    public string Title { get; set; } = null!;
    public int PublishingYear { get; set; }
    public decimal Price { get; set; }
    public string Description { get; set; } = null!;
    public string CoverUrl { get; set; } = null!;
   
    public ICollection<OrderDTO> Orders { get; set; } = new List<OrderDTO>();


}