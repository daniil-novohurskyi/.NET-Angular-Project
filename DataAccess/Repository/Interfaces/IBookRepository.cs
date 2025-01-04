using DataAccess.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DataAccess.Models.Domain;
using DataAccess.Models.Responses.Guest;

namespace DataAccess.Repository.Interfaces
{
    public interface IBookRepository:IBaseRepository<Book,string>
    {
        public Task<Book?> GetByIdWithOrdersAsync(string isbn);
        public Task<Book?> GetByIdAsNoTrackingAsync(string isbn);
        
        Task<Book?> GetByTitleAsync(string title);

        public Task<PaginatedShowcaseResponse> GetPaginatedShowcaseBooksAsync(int pageNumber, int pageSize);
        public Task<PaginatedAdminBooksResponse> GetPaginatedAdminBooksAsync(int pageNumber, int pageSize);

        public Task<ICollection<Book>?> GetAllFromIdList(ICollection<string> booksIsbn);


    }
}
