using System;
using System.Collections.Generic;

namespace DataAccess.Models.Domain;

public partial class Book
{
    public string? Isbn { get; set; } = null!;

    public int AuthorId { get; set; }

    public int GenreId { get; set; }

    public string Title { get; set; } = null!;

    public int Publishingyear { get; set; }

    public decimal Price { get; set; }

    public string Cover { get; set; } = null!;

    public string? Description { get; set; }

    public virtual Author Author { get; set; } = null!;

    public virtual Genre Genre { get; set; } = null!;

    public virtual ICollection<OrderItem> OrderItems { get; set; } = new List<OrderItem>();
}
