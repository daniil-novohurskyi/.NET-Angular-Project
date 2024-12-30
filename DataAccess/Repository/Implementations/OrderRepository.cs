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
    public class OrderRepository : BaseRepository<Order,string>, IOrderRepository
    {
        public OrderRepository(DbContext context) : base(context)
        {
            this.Context.Database.BeginTransactionAsync();
        }
    }
}
