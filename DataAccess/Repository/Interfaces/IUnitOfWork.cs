using System.Data;
using Microsoft.EntityFrameworkCore.Storage;

namespace DataAccess.Repository.Interfaces;

public interface IUnitOfWork
{
    public IAuthorRepository AuthorRepository { get;}
    public IBookRepository BookRepository { get; }
    public IGenreRepository GenreRepository { get; }
    public IOrderItemRepository OrderItemRepository { get; }
    public IOrderRepository OrderRepository { get; }
    public IRefreshTokenRepository RefreshTokenRepository { get; }
    public IUserRepository UserRepository { get; }

    public Task SaveChangesAsync();
    Task BeginTransactionAsync();
    Task CommitTransactionAsync();
    Task RollbackTransactionAsync();
    Task DisposeTransactionAsync();
}
