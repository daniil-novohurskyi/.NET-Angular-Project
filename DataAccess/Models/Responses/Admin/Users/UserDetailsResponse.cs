using DataAccess.Models.DTO;

namespace DataAccess.Models.Responses.Admin.Users;

public class UserDetailsResponse
{

    public UserProfileDTO UserInfo { get; set; }
    
    public ICollection<OrderDTO> Orders { get; set; } = new List<OrderDTO>();
}