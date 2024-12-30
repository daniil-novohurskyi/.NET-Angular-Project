using System;
using System.Collections.Generic;

namespace DataAccess.Models.Domain;

public partial class RefreshToken
{
    public int Id { get; set; }

    public int UserId { get; set; }

    public string Token { get; set; } = null!;

    public DateTime Expiration { get; set; }

    public virtual User User { get; set; } = null!;
}
