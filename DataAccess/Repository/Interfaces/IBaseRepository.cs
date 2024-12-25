using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace DataAccess.Repository.Interfaces
{
    public interface IBaseRepository<T> where T : class
    {
        Task<IEnumerable<T?>> GetAllAsync();
        Task<T?> GetByIdAsync(int id);
        Task AddAsync(T entity);
        Task UpdateAsync(T entity);
        Task DeleteAsync(int id);
        Task<IEnumerable<T?>> GetAllWithIncludesAsync(params Expression<Func<T, object>>[] includeProperties);
        Task<T?> GetByIdWithIncludesAsync(int id, params Expression<Func<T, object>>[] includeProperties);
    }

}
