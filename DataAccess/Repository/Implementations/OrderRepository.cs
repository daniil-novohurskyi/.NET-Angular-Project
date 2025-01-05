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
using Microsoft.AspNetCore.Http.HttpResults;
using Npgsql;
using Utilities;

namespace DataAccess.Repository.Implementations
{
    public class OrderRepository : BaseRepository<Order,string>, IOrderRepository
    {
        public OrderRepository(DbContext context) : base(context)
        {

        }
        
        public async Task<PaginatedAdminOrdersResponse> GetPaginatedAdminOrdersAsync(int pageNum, int offset)
        {
            // Calculate the total number of books
            var totalCount = await DbSet.CountAsync();

            // Calculate the total number of pages
            var totalPages = (int)Math.Ceiling(totalCount / (double)offset);
            if (totalPages == 0)
                return new PaginatedAdminOrdersResponse()
                {
                    Orders = new List<AdminItemOrdersResponse>(),
                    TotalCount = totalCount,
                    TotalPages = totalPages,
                    PageNumber =  pageNum > totalPages? totalPages: pageNum,
                    PageSize = offset
                };
            pageNum = pageNum > totalPages ? totalPages : pageNum;

            // Get the books for the current page
            var orders = await DbSet
                .Skip((pageNum - 1) * offset)
                .Take(offset)
                .Include(order => order.User)
                .ToListAsync();
            var adminItemOrders = orders.Select(order => new AdminItemOrdersResponse()
            {
                Id = order.Id,
                ClientName = order.User.Name,
                Date = order.Date,
                Status = order.Status,
                TotalPrice = order.TotalPrice
            }).ToList();

            // Return the paginated response
            return new PaginatedAdminOrdersResponse()
            {
                Orders = adminItemOrders,
                TotalCount = totalCount,
                TotalPages = totalPages,
                PageNumber =  pageNum > totalPages? totalPages: pageNum,
                PageSize = offset
            };
        }

        public async Task<Order?> GetByIdDetailsAsync(string id)
        {
            IQueryable<Order> query = DbSet;
            return await query
                .Include(order => order.User)
                .Include(order => order.OrderItems)
                .ThenInclude(item => item.BookIsbnNavigation)
                .FirstOrDefaultAsync(order => order.Id.Equals((id)));
        }

        public async Task<string> GenerateIdASync()
        {
            using var connection = new NpgsqlConnection(Context.Database.GetConnectionString());
            await connection.OpenAsync();
            using var command = new NpgsqlCommand("SELECT generate_order_id()", connection);

            var result = await command.ExecuteScalarAsync();

            return result?.ToString();
        }

    }
}
