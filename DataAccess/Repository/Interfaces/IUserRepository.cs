using DataAccess.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DataAccess.Models.Domain;
using DataAccess.Models.Responses.Admin.Users;

namespace DataAccess.Repository.Interfaces
{
    public interface IUserRepository:IBaseRepository<User,int>
    {
        Task<User?> GetByEmailAsync(string email);
        Task<User?> GetByIdWithOrderItemsAsync(int id);
        Task<PaginatedAdminUsersResponse> GetPaginatedAdminUsersAsync(int pageNum, int offset);
    }
}
