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
    public class GenreRepository : BaseRepository<Genre,int>, IGenreRepository
    {
        public GenreRepository(DbContext context) : base(context)
        {
        }

        public async Task<Genre?> GetByNameAsync(string name)
        {
            var genre = await this.DbSet.FirstOrDefaultAsync(genre =>  genre.Name.Equals(name));
            return genre;
        }
    }
}
