using System.ComponentModel.DataAnnotations.Schema;

namespace Utilities;

[NotMapped]
public class GenerateOrderId
{
    public string Id { get; set; }
}