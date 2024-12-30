using DataAccess.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DataAccess.Models.Domain;
using DataAccess.Repository.Interfaces;

namespace DataAccess.Repository.Implementations
{
    public class AuthorRepository : BaseRepository<Author,int>, IAuthorRepository
    {
        public AuthorRepository(DbContext context) : base(context)
        {
        }

        public async Task<Author?> GetByNameAsync(string name)
        {
            var author = await this.DbSet.FirstOrDefaultAsync(author =>  author.Name.Equals(name));
            return author;
        }
    }
}
