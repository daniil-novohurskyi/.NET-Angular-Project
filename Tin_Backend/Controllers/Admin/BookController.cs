using DataAccess.Models.Response;
using DataAccess.Repository.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace Tin_Backend.Controllers.Admin;

[ApiController]
[Route("books")]
public class BooksController : ControllerBase
{
    private readonly IUnitOfWork _unitOfWork;


    public BooksController(IUnitOfWork unitOfWork)
    {
        _unitOfWork = unitOfWork;
    }

    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var booksWithIncludes = await _unitOfWork.BookRepository.GetAllWithIncludesAsync(book => book.Author, book => book.Genre);
        var books = booksWithIncludes.Select( book =>
            new BookDTO()
            {
                Author = book!.Author.Name,
                Cover = book.Cover,
                Genre = book.Genre.Name,
                Isbn = book.Isbn,
                Price = book.Price,
                Publishingyear = book.PublishingYear,
                Title = book.Title
            });
        return Ok(books);
    }
}