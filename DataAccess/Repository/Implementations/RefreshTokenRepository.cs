﻿using DataAccess.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DataAccess.Models.Domain;
using DataAccess.Repository.Interfaces;

namespace DataAccess.Repository.Implementations
{
    public class RefreshTokenRepository : BaseRepository<RefreshToken,int>,IRefreshTokenRepository
    {
        public RefreshTokenRepository(DbContext context) : base(context)
        {
        }
    }
}
