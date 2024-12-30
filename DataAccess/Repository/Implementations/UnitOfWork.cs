using System.Data;
using DataAccess.Context;
using DataAccess.Repository.Interfaces;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Storage;

namespace DataAccess.Repository.Implementations;

public class UnitOfWork : IUnitOfWork
{
    private readonly AppDbContext _context;
    public UnitOfWork(AppDbContext context)
    {
        _context = context;
        AuthorRepository = new AuthorRepository(_context);
        BookRepository = new BookRepository(_context);
        GenreRepository = new GenreRepository(_context);
        OrderRepository = new OrderRepository(_context);
        OrderItemRepository = new OrderItemRepository(_context);
        RefreshTokenRepository = new RefreshTokenRepository(_context);
        UserRepository = new UserRepository(_context);
    }
    
    
    
    public async Task SaveChangesAsync()
    {
        await this._context.SaveChangesAsync();
        await this._context.Database.CommitTransactionAsync();
    }

    public IAuthorRepository AuthorRepository { get; }
    public IBookRepository BookRepository { get; }
    public IGenreRepository GenreRepository { get; }
    public IOrderItemRepository OrderItemRepository { get; }
    public IOrderRepository OrderRepository { get; } 
    public IRefreshTokenRepository RefreshTokenRepository { get; }
    public IUserRepository UserRepository { get; }

}