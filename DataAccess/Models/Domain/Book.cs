using System.ComponentModel.DataAnnotations.Schema;

namespace DataAccess.Models.Domain;

public partial class Book
{
    public int Isbn { get; set; }

    public int AuthorId { get; set; }

    public int GenreId { get; set; }

    public string Title { get; set; } = null!;
    [Column("PublishingYear")]
    public int PublishingYear { get; set; }

    public decimal Price { get; set; }

    public string Cover { get; set; } = null!;

    public virtual Author Author { get; set; } = null!;

    public virtual Genre Genre { get; set; } = null!;

    public virtual ICollection<OrderItem> OrderItems { get; set; } = new List<OrderItem>();
}
