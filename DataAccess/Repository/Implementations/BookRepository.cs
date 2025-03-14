﻿using DataAccess.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;
using DataAccess.Models.Domain;
using DataAccess.Models.Responses.Admin.Books;
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
        
        public async Task<PaginatedAdminBooksResponse> GetPaginatedAdminBooksAsync(int pageNumber, int pageSize)
        {
            // Calculate the total number of books
            var totalCount = await DbSet.CountAsync();

            // Calculate the total number of pages
            var totalPages = (int)Math.Ceiling(totalCount / (double)pageSize);
            if (totalPages == 0)
                return new PaginatedAdminBooksResponse()
                {
                    Books = new List<AdminItemBooksResponse>(),
                    TotalCount = totalCount,
                    TotalPages = totalPages,
                    PageNumber =  pageNumber > totalPages? totalPages: pageNumber,
                    PageSize = pageSize
                };
            
            pageNumber = pageNumber > totalPages ? totalPages : pageNumber;

            // Get the books for the current page
            var books = await DbSet
                .Skip((pageNumber - 1) * pageSize)
                .Take(pageSize)
                .Include(book=>book.Genre)
                .Include(book => book.Author)
                .ToListAsync();
            var adminItemBooks = books.Select(book => new AdminItemBooksResponse()
            {
                Isbn = book.Isbn,
                Genre = book.Genre.Name,
                Author = book.Author.Name,
                Title = book.Title
            }).ToList();

            // Return the paginated response
            return new PaginatedAdminBooksResponse()
            {
                Books = adminItemBooks,
                TotalCount = totalCount,
                TotalPages = totalPages,
                PageNumber =  pageNumber > totalPages? totalPages: pageNumber,
                PageSize = pageSize
            };
        }
        
        public async Task<PaginatedShowcaseResponse> GetPaginatedShowcaseBooksAsync(int pageNumber, int pageSize)
        {
            // Calculate the total number of books
            var totalCount = await DbSet.CountAsync();

            // Calculate the total number of pages
            var totalPages = (int)Math.Ceiling(totalCount / (double)pageSize);

            pageNumber = pageNumber > totalPages ? totalPages : pageNumber;
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
            return new PaginatedShowcaseResponse
            {
                Books = showcaseBooks,
                TotalCount = totalCount,
                TotalPages = totalPages,
                PageNumber =  pageNumber > totalPages? totalPages: pageNumber,
                PageSize = pageSize
            };
        }

        public async Task<ICollection<Book>?> GetAllFromIdList(ICollection<string> booksIsbn)
        {
            return await DbSet.Where(book => booksIsbn.Contains(book.Isbn)).ToListAsync();
        }

        public async Task<PaginatedFilterdCartItemsResponse> GetFilteredPaginatedBooksAsync(int pageNum, int offset,List<string> isbnList)
        {
            
            // Calculate the total number of books
            var totalCount = await DbSet.Where(book => !isbnList.Any(isbn=>isbn.Equals(book.Isbn))).CountAsync();

            // Calculate the total number of pages
            var totalPages = (int)Math.Ceiling(totalCount / (double)offset);
            if (totalPages == 0)
                return new PaginatedFilterdCartItemsResponse()
                {
                    OrderItems = new List<CartItemResponse>(),
                    TotalCount = totalCount,
                    TotalPages = totalPages,
                    PageNumber =  pageNum > totalPages? totalPages: pageNum,
                    PageSize = offset
                };
            
            pageNum = pageNum > totalPages ? totalPages : pageNum;

            // Get the books for the current page
            var books = await DbSet
                .Where(book => !isbnList.Any(isbn=>isbn.Equals(book.Isbn)))
                .Skip((pageNum - 1) * offset)
                .Take(offset)
                .Include(book=>book.Genre)
                .Include(book => book.Author)
                .ToListAsync();
            var orderItems = books.Select(book => new CartItemResponse()
            {
                Isbn = book.Isbn,
                CoverUrl = book.Cover,
                PricePerUnit = book.Price,
                Title = book.Title,
                Quantity = 0,
                Price = 0
            }).ToList();

            // Return the paginated response
            return new PaginatedFilterdCartItemsResponse()
            {
                OrderItems = orderItems,
                TotalCount = totalCount,
                TotalPages = totalPages,
                PageNumber =  pageNum > totalPages? totalPages: pageNum,
                PageSize = offset
            };
        }
    }
}
