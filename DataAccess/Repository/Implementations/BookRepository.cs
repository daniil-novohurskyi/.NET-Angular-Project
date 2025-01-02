using DataAccess.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;
using DataAccess.Models.Domain;
using DataAccess.Models.Responses.Guest;
using DataAccess.Repository.Interfaces;

namespace DataAccess.Repository.Implementations
{
    public class BookRepository : BaseRepository<Book,string>, IBookRepository
    {
        public BookRepository(DbContext context) : base(context)
        {
        }
        
        
        
        public  override async Task<Book?> GetByIdWithIncludesAsync(string id, params Expression<Func<Book, object>>[] includeProperties)
        {
            IQueryable<Book> query = DbSet;

            // Apply includes if any are provided
            foreach (var includeProperty in includeProperties)
            {
                query = query.Include(includeProperty);
            }

            return await query.SingleOrDefaultAsync(e => EF.Property<string>(e, "Isbn").Equals(id));
        }

        public async Task<Book?> GetByIdWithOrdersAsync(string isbn)
        {
            IQueryable<Book> query = DbSet;
             return await query.Include(book => book.Genre)
                .Include(book => book.Author)
                .Include(book => book.OrderItems)
                .ThenInclude(item => item.Order).FirstAsync(book => book.Isbn.Equals(isbn));
        }

        public async Task<Book?> GetByIdAsNoTrackingAsync(string isbn)
        {
            var book = await DbSet.AsNoTracking().FirstOrDefaultAsync(book => book.Isbn.Equals(isbn));
            return book;
        }

        public async Task<Book?> GetByTitleAsync(string title)
        {
            var book = await this.DbSet.FirstOrDefaultAsync(book =>  book.Title.Equals(title));
            return book;
        }
        
        public async Task<PaginatedResponse> GetPaginatedBooksAsync(int pageNumber, int pageSize)
        {
            // Calculate the total number of books
            var totalCount = await DbSet.CountAsync();

            // Calculate the total number of pages
            var totalPages = (int)Math.Ceiling(totalCount / (double)pageSize);

            // Get the books for the current page
            var books = await DbSet
                .Skip((pageNumber - 1) * pageSize)
                .Take(pageSize)
                .ToListAsync();
            var showcaseBooks = books.Select(book => new ShowcaseItemBooksResponse()
            {
                Isbn = book.Isbn,
                CoverUrl = book.Cover,
                Price = book.Price,
                Title = book.Title
            }).ToList();

            // Return the paginated response
            return new PaginatedResponse
            {
                Books = showcaseBooks,
                TotalCount = totalCount,
                TotalPages = totalPages,
                PageNumber = pageNumber,
                PageSize = pageSize
            };
        }

        public async Task<ICollection<Book>?> GetAllFromIdList(ICollection<string> booksIsbn)
        {
            return await DbSet.Where(book => booksIsbn.Contains(book.Isbn)).ToListAsync();
        }
    }
}
