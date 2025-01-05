using DataAccess.Models.Domain;
using DataAccess.Models.DTO;
using DataAccess.Models.Requests;
using DataAccess.Models.Responses.Admin;
using DataAccess.Repository.Interfaces;
using Microsoft.AspNetCore.Mvc;
using CartItemResponse = DataAccess.Models.Responses.Admin.Books.CartItemResponse;

namespace Tin_Backend.Controllers.Admin;

[ApiController]
[Route("admin/books")]
public class AdminBooksController : ControllerBase
{
    private readonly IWebHostEnvironment _env;
    private readonly IUnitOfWork _unitOfWork;
    private const int Offset = 10;



    public AdminBooksController(IUnitOfWork unitOfWork, IWebHostEnvironment env)
    {
        _unitOfWork = unitOfWork;
        _env = env;
    }

    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var booksWithIncludes = await _unitOfWork.BookRepository.GetAllWithIncludesAsync(book => book.Author, book => book.Genre);
        var books = booksWithIncludes.Select( book =>
            new BooksGetAllResponse()
            {
                Isbn = book!.Isbn,
                Title = book.Title,
                Genre = book.Genre.Name,
                Author = book.Author.Name
            });
        return Ok(books);
    }
    
    [HttpGet]
    [Route("paginated")]
    public async Task<IActionResult> GetPaginatedBooksAsync([FromQuery] int pageNum)
    {
        var response = await _unitOfWork.BookRepository.GetPaginatedAdminBooksAsync(pageNum, Offset);
        return Ok(response);
    }
    [HttpPost]
    [Route("paginated")]
    public async Task<IActionResult> GetFilteredPaginatedBooksAsync([FromQuery] int pageNum,[FromBody] List<string> isbnsList)
    {
        var response = await _unitOfWork.BookRepository.GetFilteredPaginatedBooksAsync(pageNum, Offset,isbnsList);
        foreach (CartItemResponse cartItemResponse in response.OrderItems)
        {
            cartItemResponse.CoverUrl = GenerateImageUrl(cartItemResponse.CoverUrl);
        }
        return Ok(response);
    }

    [HttpGet]
    [Route("{id}/details")]
    public async Task<IActionResult> GetByIdDetails(string id)
    {
        var checkBookExists = await _unitOfWork.BookRepository.GetByIdAsync(id);
        if (checkBookExists == null)
            return NotFound("book not found.");
        var  bookWithIncludes = await  _unitOfWork.BookRepository.GetByIdWithOrdersAsync(id);
        var orders =  bookWithIncludes!.OrderItems.Select(orderItem =>  new OrderDTO
        {
            Id = orderItem.OrderId,
            Date = orderItem.Order.Date,
            Status = orderItem.Order.Status,
            TotalPrice = orderItem.Order.TotalPrice
        }).ToList();
        
        var coverUrl = GenerateImageUrl(bookWithIncludes.Cover);

        var response = new BookDetailsResponse()
        {
            Isbn = bookWithIncludes.Isbn,
            Title = bookWithIncludes.Title,
            Author = bookWithIncludes.Author.Name,
            Genre = bookWithIncludes.Genre.Name,
            Price = bookWithIncludes.Price,
            Description = bookWithIncludes.Description!,
            CoverUrl = coverUrl,
            PublishingYear = bookWithIncludes.PublishingYear,
            Orders = orders
        };
        return Ok(response);
    }

    [HttpGet]
    [Route("{id}/edit")]
    public async Task<IActionResult> GetByIdEdit(string id)
    {
        await _unitOfWork.BeginTransactionAsync();
        var book = await _unitOfWork.BookRepository.GetByIdAsync(id);
        if (book == null)
            return NotFound("book not found");
        book = await _unitOfWork.BookRepository.GetByIdWithIncludesAsync(id, book => book.Author, book => book.Genre );
        
        var coverUrl = GenerateImageUrl(book.Cover);

        var response = new BookUpsertResponse()
        {
            Isbn = book.Isbn,
            Title = book.Title,
            Author = book.Author.Name,
            Genre = book.Genre.Name,
            Description = book.Description,
            CoverUrl =  coverUrl,
            Price = book.Price,
            PublishingYear = book.PublishingYear
        };
        await _unitOfWork.SaveChangesAsync();
        await _unitOfWork.BeginTransactionAsync();
        return Ok(response);
    }

    [HttpPost]
    [Route("new")]
    public async Task<IActionResult> Create([FromForm] BookCreateRequest bookCreateRequest)
    {
        await _unitOfWork.BeginTransactionAsync();
        var checkUniqueTitleBook = await _unitOfWork.BookRepository.GetByTitleAsync(bookCreateRequest.Title);
        if (checkUniqueTitleBook != null)
        {
            return BadRequest("Title of book must be unique");
        }
        
        //generate ISBN and check is it unique
        bool isUniqueISBN = false;
        string isbn = null;
        while (!isUniqueISBN)
        {
            isbn = Utilities.IsbnGenerator.GenerateIsbn13();
            var checkUniqueIsbn = await _unitOfWork.BookRepository.GetByIdAsync(isbn);
            if (checkUniqueIsbn == null)
                isUniqueISBN = true;
        }
        
        //check that new value of author is in database, if no so we need to add it
        var bookAuthor = await _unitOfWork.AuthorRepository.GetByNameAsync(bookCreateRequest.Author);
        if (bookAuthor == null)
        {
            bookAuthor = new Author()
            {
                Name = bookCreateRequest.Author
            };
            await _unitOfWork.AuthorRepository.AddAsync(bookAuthor);
            await _unitOfWork.SaveChangesAsync();
        }
        
        //check that new value of genre is in database, if no so we need to add it
        var bookGenre = await _unitOfWork.GenreRepository.GetByNameAsync(bookCreateRequest.Genre);
        if (bookGenre == null)
        {
            bookGenre = new Genre()
            {
                Name = bookCreateRequest.Genre
            };
            await _unitOfWork.GenreRepository.AddAsync(bookGenre);
            await _unitOfWork.SaveChangesAsync();
        }
        var filePath = Path.Combine(_env.WebRootPath, "images", bookCreateRequest.Cover.FileName);
        using (var stream = new FileStream(filePath, FileMode.Create))
        {
            await bookCreateRequest.Cover.CopyToAsync(stream);
        }

        var createdBook = new Book()
        {
            Isbn = isbn,
            Title = bookCreateRequest.Title,
            Description = bookCreateRequest.Description,
            AuthorId = bookAuthor.Id,
            GenreId = bookGenre.Id,
            Price = bookCreateRequest.Price,
            PublishingYear = bookCreateRequest.Publishingyear,
            Cover = $"{bookCreateRequest.Cover.FileName}"
        };
        await _unitOfWork.BookRepository.AddAsync(createdBook);
        await _unitOfWork.SaveChangesAsync();
        await _unitOfWork.CommitTransactionAsync();
        var response = new BookUpsertResponse()
        {
            Author = bookAuthor.Name,
            CoverUrl = createdBook.Cover,
            Genre = bookGenre.Name,
            Isbn = createdBook.Isbn,
            Price = createdBook.Price,
            PublishingYear = createdBook.PublishingYear,
            Title = createdBook.Title
        };
        return Ok(response);
    }
    
    [HttpPut]
    [Route("{id}/edit")]
    public async Task<IActionResult> UpdateById(string id,[FromForm] BookUpdateRequest request )
    {
        await _unitOfWork.BeginTransactionAsync();
        bool deleteOldAuthor = false;
        int oldAuthorId = -1,oldGenreId = -1;
        bool deleteOldGenre = false;
        try
        {
            //check that updated book is existing
            var updatingBook = await _unitOfWork.BookRepository.GetByIdAsync(id);
            if (updatingBook == null)
            {
                return NotFound("book not found");
            }

            updatingBook =
                await _unitOfWork.BookRepository.GetByIdWithIncludesAsync(id, book => book.Author, book => book.Genre);
            //check that title is unique
            var checkUniqueTitleBook = await _unitOfWork.BookRepository.GetByTitleAsync(request.Title);
            if (checkUniqueTitleBook != null && !updatingBook.Title.Equals(request.Title))
            {
                return BadRequest("Title of book must be unique");
            }
            
            //check that new value of author is in database, if no so we need to add it
            var updatedAuthor = await _unitOfWork.AuthorRepository.GetByNameAsync(request.Author);

            if (updatedAuthor == null)
            {
                updatedAuthor = new Author()
                {
                    Name = request.Author
                };
                await _unitOfWork.AuthorRepository.AddAsync(updatedAuthor);
                await _unitOfWork.SaveChangesAsync();
            }
            //check if old Author has assigned books after changes, if not add flag to delete record after book update
            if (!request.Author.Equals(updatingBook.Author.Name))
            {
                var oldAuthorsBooks = await _unitOfWork.BookRepository.GetAllWhereAsync(book => book.AuthorId == updatingBook.AuthorId);
                if (oldAuthorsBooks.Count() == 1)
                {
                    deleteOldAuthor = true;
                    oldAuthorId = updatingBook.AuthorId;
                }
            }
            //check that new value of genre is in database, if no so we need to add it
            var updatedGenre = await _unitOfWork.GenreRepository.GetByNameAsync(request.Genre);

            if (updatedGenre == null)
            {
                updatedGenre = new Genre()
                {
                    Name = request.Genre
                };
                await _unitOfWork.GenreRepository.AddAsync(updatedGenre);
                await _unitOfWork.SaveChangesAsync();
            }
            //check if old Author has assigned books after changes, if not add flag to delete record after book update

            if (!request.Genre.Equals(updatingBook.Genre.Name))
            {
                var oldGenreBooks = await _unitOfWork.BookRepository.GetAllWhereAsync(book => book.GenreId == updatingBook.GenreId);
                if (oldGenreBooks.Count() == 1)
                {
                    deleteOldGenre = true;
                    oldGenreId = updatingBook.GenreId;
                }
            }
            if (request.Cover != null)
            {
                var filePath = Path.Combine(_env.WebRootPath, "images", request.Cover.FileName);
                using (var stream = new FileStream(filePath, FileMode.Create))
                {
                    await request.Cover.CopyToAsync(stream);
                }
            }

            updatingBook.Title = request.Title;
            updatingBook.Description = request.Description;
            updatingBook.AuthorId = updatedAuthor.Id;
            updatingBook.GenreId = updatedGenre.Id;
            updatingBook.Price = request.Price;
            updatingBook.PublishingYear = request.PublishingYear;
            updatingBook.Cover = request.Cover != null
                ? $"{request.Cover.FileName}"
                : updatingBook.Cover;
            
            await _unitOfWork.BookRepository.UpdateAsync(updatingBook);
            if (deleteOldAuthor)
            {
                await _unitOfWork.AuthorRepository.DeleteAsync(oldAuthorId);
            }

            if (deleteOldGenre)
            {
                await _unitOfWork.GenreRepository.DeleteAsync(oldGenreId);
            }
            await _unitOfWork.SaveChangesAsync();
            await _unitOfWork.CommitTransactionAsync();
            return Ok();
        }
        catch (Exception e)
        {
            Console.WriteLine(e);
            return StatusCode(500, $"Transaction failed: {e.Message}");
        }
       
    }

    [HttpDelete]
    [Route("{id}")]
    public async Task<IActionResult> DeleteById(string id)
    {
        await _unitOfWork.BeginTransactionAsync();
        bool deleteOldAuthor = false;
        int oldAuthorId = -1,oldGenreId = -1;
        bool deleteOldGenre = false;
        
        //check that deleting book is existing
        var deletingBook = await _unitOfWork.BookRepository.GetByIdWithIncludesAsync(id, book => book.OrderItems);
        if (deletingBook == null)
        {
            return NotFound("book not found");
        }

        _unitOfWork.OrderItemRepository.RemoveRange(deletingBook.OrderItems);
        
        var booksAuthorCount = await _unitOfWork.BookRepository.GetAllWhereAsync(book => book.AuthorId == deletingBook.AuthorId);
        if (booksAuthorCount.Count() == 1)
        {
            deleteOldAuthor = true;
            oldAuthorId = deletingBook.AuthorId;
        }
        
        var booksGenreCount = await _unitOfWork.BookRepository.GetAllWhereAsync(book => book.GenreId == deletingBook.GenreId);
        if (booksGenreCount.Count() == 1)
        {
            deleteOldGenre = true;
            oldGenreId = deletingBook.GenreId;
        }

        await _unitOfWork.BookRepository.DeleteAsync(id);
        if (deleteOldAuthor)
        {
            await _unitOfWork.AuthorRepository.DeleteAsync(oldAuthorId);
        }

        if (deleteOldGenre)
        {
            await _unitOfWork.GenreRepository.DeleteAsync(oldGenreId);
        }
        await _unitOfWork.SaveChangesAsync();
        await _unitOfWork.CommitTransactionAsync();
        return NoContent();
    }
    
    private string GenerateImageUrl(string imageFileName)
    {
        var baseUrl = $"{Request.Scheme}://{Request.Host}";
        return $"{baseUrl}/images/{imageFileName}";
    }
    
}