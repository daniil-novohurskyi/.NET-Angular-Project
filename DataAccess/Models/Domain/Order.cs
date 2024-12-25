﻿namespace DataAccess.Models.Domain;

public partial class Order
{
    public int Id { get; set; }

    public int UserId { get; set; }

    public DateOnly Date { get; set; }

    public string Status { get; set; } = null!;

    public string Deliveryname { get; set; } = null!;

    public string Deliveryphone { get; set; } = null!;

    public string Deliverycity { get; set; } = null!;

    public string Deliverystreet { get; set; } = null!;

    public int Deliveryunit { get; set; }

    public string Deliverypostalcode { get; set; } = null!;

    public virtual ICollection<OrderItem> OrderItems { get; set; } = new List<OrderItem>();

    public virtual User User { get; set; } = null!;
}
