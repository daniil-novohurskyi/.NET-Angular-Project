using DataAccess.Models.Domain;
using DataAccess.Models.DTO;
using DataAccess.Models.Requests;
using DataAccess.Models.Responses.Admin;
using DataAccess.Repository.Interfaces;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;

namespace Tin_Backend.Controllers.Admin;

[ApiController]
[Route("admin/books")]
public class AdminBooksController : ControllerBase
{
    private readonly IWebHostEnvironment _env;
    private readonly IUnitOfWork _unitOfWork;


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
            new GetAllBooksResponse()
            {
                Isbn = book!.Isbn,
                Title = book.Title,
                Genre = book.Genre.Name,
                Author = book!.Author.Name
            });
        return Ok(books);
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
            Totalprice = orderItem.Order.Totalprice
        }).ToList();
        var response = new BookDetailsResponse()
        {
            Isbn = bookWithIncludes.Isbn,
            Title = bookWithIncludes.Title,
            Author = bookWithIncludes.Author.Name,
            Genre = bookWithIncludes.Genre.Name,
            Orders = orders
        };
        return Ok(response);
    }

    [HttpGet]
    [Route("{id}/edit")]
    public async Task<IActionResult> GetByIdEdit(string id)
    {
        var book = await _unitOfWork.BookRepository.GetByIdWithIncludesAsync(id, book => book.Author, book => book.Genre );
        if (book == null)
            return NotFound("book not found");
        var response = new BookResponse()
        {
            Isbn = book.Isbn,
            Title = book.Title,
            Author = book.Author.Name,
            Genre = book.Genre.Name,
            Cover = book.Cover,
            Price = book.Price,
            Publishingyear = book.Publishingyear
        };
        return Ok(response);
    }

    [HttpPost]
    [Route("new")]
    public async Task<IActionResult> Create([FromForm] CreateBookRequest createBookRequest)
    {
        var checkUniqueTitleBook = await _unitOfWork.BookRepository.GetByTitleAsync(createBookRequest.Title);
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
        var bookAuthor = await _unitOfWork.AuthorRepository.GetByNameAsync(createBookRequest.Author);
        if (bookAuthor == null)
        {
            bookAuthor = new Author()
            {
                Name = createBookRequest.Author
            };
            await _unitOfWork.AuthorRepository.AddAsync(bookAuthor);
        }
        
        //check that new value of genre is in database, if no so we need to add it
        var bookGenre = await _unitOfWork.GenreRepository.GetByNameAsync(createBookRequest.Genre);
        if (bookGenre == null)
        {
            bookGenre = new Genre()
            {
                Name = createBookRequest.Genre
            };
            await _unitOfWork.GenreRepository.AddAsync(bookGenre);
        }
        var filePath = Path.Combine(_env.WebRootPath, "images", createBookRequest.Cover.FileName);
        using (var stream = new FileStream(filePath, FileMode.Create))
        {
            await createBookRequest.Cover.CopyToAsync(stream);
        }

        var createdBook = new Book()
        {
            Isbn = isbn,
            Title = createBookRequest.Title,
            Description = createBookRequest.Description,
            AuthorId = bookAuthor.Id,
            GenreId = bookGenre.Id,
            Price = createBookRequest.Price,
            Publishingyear = createBookRequest.Publishingyear,
            Cover = $"{createBookRequest.Cover.FileName}"
        };
        await _unitOfWork.BookRepository.AddAsync(createdBook);
        await _unitOfWork.SaveChangesAsync();
        var response = new BookResponse()
        {
            Author = bookAuthor.Name,
            Cover = createdBook.Cover,
            Genre = bookGenre.Name,
            Isbn = createdBook.Isbn,
            Price = createdBook.Price,
            Publishingyear = createdBook.Publishingyear,
            Title = createdBook.Title
        };
        return Ok(response);
    }
    
    [HttpPut]
    [Route("{id}/edit")]
    public async Task<IActionResult> UpdateById(string id,[FromForm] UpdateBookRequest updateBookRequest )
    {
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
            //check that title is unique
            var checkUniqueTitleBook = await _unitOfWork.BookRepository.GetByTitleAsync(updateBookRequest.Title);
            if (checkUniqueTitleBook != null)
            {
                return BadRequest("Title of book must be unique");
            }
            
            //check that new value of author is in database, if no so we need to add it
            var updatedAuthor = await _unitOfWork.AuthorRepository.GetByNameAsync(updateBookRequest.Author);

            if (updatedAuthor == null)
            {
                updatedAuthor = new Author()
                {
                    Name = updateBookRequest.Author
                };
                await _unitOfWork.AuthorRepository.AddAsync(updatedAuthor);
            }
            //check if old Author has assigned books after changes, if not add flag to delete record after book update
            var oldAuthorsBooks = await _unitOfWork.BookRepository.GetAllWhereAsync(book => book.AuthorId == updatingBook.AuthorId);
            if (oldAuthorsBooks.Count() == 1)
            {
                deleteOldAuthor = true;
                oldAuthorId = updatingBook.AuthorId;
            }
            
            //check that new value of genre is in database, if no so we need to add it
            var updatedGenre = await _unitOfWork.GenreRepository.GetByNameAsync(updateBookRequest.Genre);

            if (updatedGenre == null)
            {
                updatedGenre = new Genre()
                {
                    Name = updateBookRequest.Genre
                };
                await _unitOfWork.GenreRepository.AddAsync(updatedGenre);
            }
            //check if old Author has assigned books after changes, if not add flag to delete record after book update
            var oldGenreBooks = await _unitOfWork.BookRepository.GetAllWhereAsync(book => book.GenreId == updatingBook.GenreId);
            if (oldGenreBooks.Count() == 1)
            {
                deleteOldGenre = true;
                oldGenreId = updatingBook.GenreId;
            }
        
            if (updateBookRequest.Cover != null)
            {
                var filePath = Path.Combine(_env.WebRootPath, "images", updateBookRequest.Cover.FileName);
                using (var stream = new FileStream(filePath, FileMode.Create))
                {
                    await updateBookRequest.Cover.CopyToAsync(stream);
                }
            }

            updatingBook.Title = updateBookRequest.Title;
            updatingBook.Description = updateBookRequest.Description;
            updatingBook.AuthorId = updatedAuthor.Id;
            updatingBook.GenreId = updatedGenre.Id;
            updatingBook.Price = updateBookRequest.Price;
            updatingBook.Publishingyear = updatingBook.Publishingyear;
            updatingBook.Cover = updateBookRequest.Cover != null
                ? $"{updateBookRequest.Cover.FileName}"
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
            return Ok(updatingBook.Title);
        }
        catch (Exception e)
        {
            Console.WriteLine(e);
            return StatusCode(500, $"Transaction failed: {e.Message}");
        }
       
    }

    [HttpDelete]
    [Route("{id}/delete")]
    public async Task<IActionResult> DeleteById(string id)
    {
        bool deleteOldAuthor = false;
        int oldAuthorId = -1,oldGenreId = -1;
        bool deleteOldGenre = false;
        
        //check that deleting book is existing
        var deletingBook = await _unitOfWork.BookRepository.GetByIdWithIncludesAsync(id, book => book.OrderItems);
        if (deletingBook == null)
        {
            return NotFound("book not found");
        }

        await _unitOfWork.OrderItemRepository.DeleteRange(deletingBook.OrderItems);
        
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
        return NoContent();
    }
    
}