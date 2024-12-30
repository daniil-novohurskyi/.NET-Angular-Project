using DataAccess.Repository.Interfaces;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace DataAccess.Repository.Implementations
{
    public class BaseRepository<T,K> : IBaseRepository<T,K> where T : class
    where K: IConvertible
    {
        protected readonly DbContext Context;
        protected readonly DbSet<T> DbSet;

        public BaseRepository(DbContext context)
        {
            Context = context;
            DbSet = Context.Set<T>();
        }

        public async Task<IEnumerable<T?>> GetAllAsync()
        {
            return await DbSet.ToListAsync();
        }

        public async Task<IEnumerable<T?>> GetAllWhereAsync(Func<T, bool> predicate)
        {
            IEnumerable<T> entities = await DbSet.ToListAsync();
            var filteredEntities = entities.Where(predicate);
            return filteredEntities;
        }

        public async Task<T?> GetByIdAsync(K id)
        {
            return await DbSet.FindAsync(id);
        }

        public async Task DeleteRange(IEnumerable<T> entities)
        {
            this.DbSet.RemoveRange(entities);
            await Context.SaveChangesAsync();

        }

        public async Task AddAsync(T entity)
        {
            await DbSet.AddAsync(entity);
            Context.Entry(entity).State = EntityState.Added;
            await Context.SaveChangesAsync();
        }

        public async Task UpdateAsync(T entity)
        {
            DbSet.Update(entity);
            Context.Entry(entity).State = EntityState.Modified;
            await Context.SaveChangesAsync();
        }

        public async Task DeleteAsync(K id)
        {
            var entity = await DbSet.FindAsync(id);
            if (entity != null)
            {
                DbSet.Remove(entity);
                await Context.SaveChangesAsync();
            }
        }

        public async Task<IEnumerable<T?>> GetAllWithIncludesAsync(params Expression<Func<T, object>>[] includeProperties)
        {
            IQueryable<T> query = DbSet;

            foreach (var includeProperty in includeProperties)
            {
                query = query.Include(includeProperty);
            }

            return await query.ToListAsync();
        }

        virtual public async Task<T?> GetByIdWithIncludesAsync(K id, params Expression<Func<T, object>>[] includeProperties)
        {
            IQueryable<T> query = DbSet;

            // Apply includes if any are provided
            foreach (var includeProperty in includeProperties)
            {
                query = query.Include(includeProperty);
            }

            return await query.SingleOrDefaultAsync(e => EF.Property<K>(e, "Id").Equals(id));
        }
    }
}
