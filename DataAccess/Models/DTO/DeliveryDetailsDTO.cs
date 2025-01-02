namespace DataAccess.Models.DTO;

public class DeliveryDetailsDTO
{
    public string Name { get; set; } = null!;

    public string Phone { get; set; } = null!;
    
    public string City { get; set; } = null!;

    public string Street { get; set; } = null!;

    public int Unit { get; set; }

    public string PostalCode { get; set; } = null!;
}