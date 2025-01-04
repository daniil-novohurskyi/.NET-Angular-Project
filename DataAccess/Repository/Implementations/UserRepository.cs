using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DataAccess.Models;
using DataAccess.Models.Domain;
using DataAccess.Models.Responses.Admin.Users;
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

        public async Task<PaginatedAdminUsersResponse> GetPaginatedAdminUsersAsync(int pageNum, int offset)
        {
            // Calculate the total number of books
            var totalCount = await DbSet.CountAsync();

            // Calculate the total number of pages
            var totalPages = (int)Math.Ceiling(totalCount / (double)offset);
            
            pageNum = pageNum > totalPages ? totalPages : pageNum;

            // Get the books for the current page
            var books = await DbSet
                .Skip((pageNum - 1) * offset)
                .Take(offset)
                .ToListAsync();
            var adminItemUsers = books.Select(user => new AdminItemUsersResponse()
            {
                
                Id = user.Id,
                Name = user.Name,
                Email = user.Email,
                Phone = user.Phone,
                Role = user.Role
            }).ToList();

            // Return the paginated response
            return new PaginatedAdminUsersResponse()
            {
                Users = adminItemUsers,
                TotalCount = totalCount,
                TotalPages = totalPages,
                PageNumber =  pageNum > totalPages? totalPages: pageNum,
                PageSize = offset
            };
        }
    }
}
