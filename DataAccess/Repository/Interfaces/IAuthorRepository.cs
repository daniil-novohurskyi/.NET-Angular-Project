using DataAccess.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DataAccess.Models.Domain;

namespace DataAccess.Repository.Interfaces
{
    public interface IAuthorRepository:IBaseRepository<Author,int>
    {
        Task<Author?> GetByNameAsync(string name);
    }
}
