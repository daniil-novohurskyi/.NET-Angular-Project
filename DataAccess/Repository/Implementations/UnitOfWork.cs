using System.Data;
using DataAccess.Context;
using DataAccess.Repository.Interfaces;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Storage;

namespace DataAccess.Repository.Implementations;

public class UnitOfWork : IUnitOfWork
{

    private IDbContextTransaction _transaction;
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
    
    
    
    public async Task BeginTransactionAsync()
    {
        if (_transaction == null)
        {
            _transaction = await _context.Database.BeginTransactionAsync();
        }
    }

    public async Task CommitTransactionAsync()
    {
        if (_transaction == null)
            throw new InvalidOperationException("Transaction has not been started.");

        try
        {
            await _transaction.CommitAsync();
        }
        catch
        {
            await RollbackTransactionAsync();
            throw;
        }
        finally
        {
            await DisposeTransactionAsync();
        }
    }

    public async Task RollbackTransactionAsync()
    {
        if (_transaction != null)
        {
            await _transaction.RollbackAsync();
            await DisposeTransactionAsync();
        }
    }

    public async Task DisposeTransactionAsync()
    {
        if (_transaction != null)
        {
            await _transaction.DisposeAsync();
            _transaction = null;
        }
    }

    public async Task SaveChangesAsync()
    {
        await _context.SaveChangesAsync();
    }
    
    public IAuthorRepository AuthorRepository { get; }
    public IBookRepository BookRepository { get; }
    public IGenreRepository GenreRepository { get; }
    public IOrderItemRepository OrderItemRepository { get; }
    public IOrderRepository OrderRepository { get; } 
    public IRefreshTokenRepository RefreshTokenRepository { get; }
    public IUserRepository UserRepository { get; }

}