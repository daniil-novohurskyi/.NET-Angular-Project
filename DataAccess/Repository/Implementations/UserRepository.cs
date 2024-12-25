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
    public class UserRepository : BaseRepository<User>,IUserRepository
    {
        public UserRepository(DbContext context) : base(context)
        {
        }
    }
}
