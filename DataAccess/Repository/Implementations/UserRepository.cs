using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DataAccess.Models;
using DataAccess.Models.Domain;
using DataAccess.Repository.Interfaces;

namespace DataAccess.Repository.Implementations
{
    public class UserRepository : BaseRepository<User,int>,IUserRepository
    {
        public UserRepository(DbContext context) : base(context)
        {
        }

        public async Task<User?> GetByEmailAsync(string email)
        {
            IQueryable<User> query = DbSet;
            return await query.FirstOrDefaultAsync(user => user.Email.Equals(email));
        }

        public async Task<User?> GetByIdWithOrderItemsAsync(int id)
        {
            IQueryable<User> query = DbSet;
            return await query
                .Include(user => user.RefreshTokens)
                .Include(user => user.Orders)
                .ThenInclude(order => order.OrderItems)
                .FirstOrDefaultAsync(user => user.Id == id);
        }
    }
}
