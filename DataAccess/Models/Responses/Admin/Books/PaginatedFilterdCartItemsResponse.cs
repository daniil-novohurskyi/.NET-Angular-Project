namespace DataAccess.Models.Responses.Admin.Books;

public class PaginatedFilterdCartItemsResponse
{
    public List<CartItemResponse> OrderItems { get; set; }
    public int TotalCount { get; set; }
    public int TotalPages { get; set; }
    public int PageNumber { get; set; }
    public int PageSize { get; set; }
}