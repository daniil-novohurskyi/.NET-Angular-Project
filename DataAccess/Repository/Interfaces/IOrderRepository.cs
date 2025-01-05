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
    public interface IOrderRepository : IBaseRepository<Order, string>
    {
        public Task<Order?> GetByIdDetailsAsync(string id);
        public Task<string> GenerateIdASync();
        public Task<PaginatedAdminOrdersResponse> GetPaginatedAdminOrdersAsync(int pageNum, int offset);
    }
}
