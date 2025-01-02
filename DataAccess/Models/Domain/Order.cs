using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace DataAccess.Models.Domain;

public partial class Order
{
    public string Id { get; set; } = null!;

    public int UserId { get; set; }

    public DateOnly Date { get; set; }

    public string Status { get; set; } = null!;
    
    [Column("deliveryname")]
    public string DeliveryName { get; set; } = null!;

    [Column("deliveryphone")]
    public string DeliveryPhone { get; set; } = null!;

    [Column("deliverycity")]

    public string DeliveryCity { get; set; } = null!;

    [Column("deliverystreet")]
    public string DeliveryStreet { get; set; } = null!;

    [Column("deliveryunit")]
    public int DeliveryUnit { get; set; }

    [Column("deliverypostalcode")]
    public string DeliveryPostalCode { get; set; } = null!;

    [Column("totalprice")]
    public decimal? TotalPrice { get; set; }

    public virtual ICollection<OrderItem> OrderItems { get; set; } = new List<OrderItem>();

    public virtual User User { get; set; } = null!;
}
