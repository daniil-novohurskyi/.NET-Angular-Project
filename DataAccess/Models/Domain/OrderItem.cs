namespace DataAccess.Models.Domain;

public partial class OrderItem
{
    public int Id { get; set; }

    public int BookIsbn { get; set; }

    public int OrderId { get; set; }

    public decimal Priceperunit { get; set; }

    public int Quantity { get; set; }

    public virtual Book BookIsbnNavigation { get; set; } = null!;

    public virtual Order Order { get; set; } = null!;
}
