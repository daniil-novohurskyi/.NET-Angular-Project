using System;
using System.Collections.Generic;

namespace DataAccess.Models.Domain;

public partial class OrderItem
{
    public int Id { get; set; }

    public string BookIsbn { get; set; } = null!;

    public string OrderId { get; set; } = null!;

    public decimal Priceperunit { get; set; }

    public int Quantity { get; set; }

    public virtual Book BookIsbnNavigation { get; set; } = null!;

    public virtual Order Order { get; set; } = null!;
}
