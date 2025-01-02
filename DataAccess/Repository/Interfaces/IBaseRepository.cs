using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;
using DataAccess.Models.Domain;

namespace DataAccess.Repository.Interfaces
{
    public interface IBaseRepository<T,K> where T : class where K : IConvertible
    {
        Task<IEnumerable<T?>> GetAllAsync();
        Task<IEnumerable<T?>> GetAllWhereAsync(Func<T,bool> predicate);

        Task<T?> GetByIdAsync(K id);
        public void RemoveRange (IEnumerable<T> entities);

        void AddRange(ICollection<T> entities);

        Task AddAsync(T entity);
        Task UpdateAsync(T entity);
        Task DeleteAsync(K id);
        Task<IEnumerable<T?>> GetAllWithIncludesAsync(params Expression<Func<T, object>>[] includeProperties);
        Task<T?> GetByIdWithIncludesAsync(K id, params Expression<Func<T, object>>[] includeProperties);
    }

}
