using DataAccess.Models.Responses.Guest;
using DataAccess.Repository.Interfaces;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;

namespace Tin_Backend.Controllers.Guest;

[ApiController]
[Route("/showcase")]
public class ShowcaseController:ControllerBase
{
    private readonly IUnitOfWork _unitOfWork;
    private const int Offset = 9;

    public ShowcaseController(IUnitOfWork unitOfWork)
    {
        _unitOfWork = unitOfWork;
    }

    [HttpGet]
    public async Task<IActionResult> GetPaginatedBooksAsync([FromQuery] int pageNum)
    {
        var response = await _unitOfWork.BookRepository.GetPaginatedShowcaseBooksAsync(pageNum, Offset);
        return Ok(response);
    }

    [HttpGet]
    [Route("{id}")]
    public async Task<IActionResult> GetBookInfoById(string id)
    {
        //check if book exists
        var book = await _unitOfWork.BookRepository.GetByIdAsync(id);
        if (book == null)
        {
            return NotFound("book not found");
        }

        book = await _unitOfWork.BookRepository
            .GetByIdWithIncludesAsync(id, book => book.Author, book => book.Genre);

        var response = new ShowcaseBookResponse()
        {
            Isbn = book.Isbn,
            Author = book.Author.Name,
            Genre = book.Genre.Name,
            Price = book.Price,
            PublishingYear = book.PublishingYear,
            Title = book.Title,
            CoverUrl = book.Cover
        };
        return Ok(response);
    }
    
}