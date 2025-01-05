using DataAccess.Models.Responses.Guest;

namespace DataAccess.Models.Responses.Admin.Users;

public class PaginatedAdminOrdersResponse
{
    public List<AdminItemOrdersResponse> Orders { get; set; }
    public int TotalCount { get; set; }
    public int TotalPages { get; set; }
    public int PageNumber { get; set; }
    public int PageSize { get; set; }
}
