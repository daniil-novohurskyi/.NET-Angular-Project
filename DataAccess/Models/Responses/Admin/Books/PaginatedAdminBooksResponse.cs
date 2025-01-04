namespace DataAccess.Models.Responses.Guest;

public class PaginatedAdminBooksResponse
{
    public List<AdminItemBooksResponse> Books { get; set; }
    public int TotalCount { get; set; }
    public int TotalPages { get; set; }
    public int PageNumber { get; set; }
    public int PageSize { get; set; }
}
