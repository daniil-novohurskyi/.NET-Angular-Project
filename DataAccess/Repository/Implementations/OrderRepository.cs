using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DataAccess.Models;
using DataAccess.Models.Domain;
using DataAccess.Repository.Interfaces;
using Npgsql;
using Utilities;

namespace DataAccess.Repository.Implementations
{
    public class OrderRepository : BaseRepository<Order,string>, IOrderRepository
    {
        public OrderRepository(DbContext context) : base(context)
        {

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
