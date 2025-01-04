using DataAccess.Models.Responses.Guest;

namespace DataAccess.Models.Responses.Admin.Users;

public class PaginatedAdminUsersResponse
{
    public List<AdminItemUsersResponse> Users { get; set; }
    public int TotalCount { get; set; }
    public int TotalPages { get; set; }
    public int PageNumber { get; set; }
    public int PageSize { get; set; }
}
