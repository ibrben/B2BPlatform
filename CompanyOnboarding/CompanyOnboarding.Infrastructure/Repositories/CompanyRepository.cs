using CompanyOnboarding.Domain.Entities;
using CompanyOnboarding.Domain.Interfaces;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;

namespace CompanyOnboarding.Infrastructure.Repositories
{
    /// <summary>
    /// Repository for Company
    /// </summary>
    public class CompanyRepository : ICompanyRepository
    {
        private readonly PostgresDBContext _context;
        public CompanyRepository(PostgresDBContext context)
        {
            _context = context;
        }
        /// <summary>
        /// Add a company
        /// </summary>
        /// <param name="company">The company to add</param>
        /// <returns>The added company</returns>
        public async Task<Company> AddCompanyAsync(Company company)
        {
            _context.companies.Add(company);
            try
            {
                await _context.SaveChangesAsync();
            return company;    
            } catch (DbUpdateException ex)
            {
                throw new Exception("Failed to save company to database", ex);
            }
            
        }
        
        /// <summary>
        /// Get a company by id
        /// </summary>
        /// <param name="id">The id of the company</param>
        /// <returns>The company</returns>
        public Task<Company> GetCompanyByIdAsync(int id)
        {
            throw new NotImplementedException();
        }

        /// <summary>
        /// Remove a company
        /// </summary>
        /// <param name="id">The id of the company</param>
        /// <returns>True if the company was removed, false otherwise</returns>
        public Task<bool> RemoveCompanyAsync(int id)
        {
            throw new NotImplementedException();
        }

        /// <summary>
        /// Update a company
        /// </summary>
        /// <param name="company">The company to update</param>
        /// <returns>The updated company</returns>
        public Task<Company> UpdateCompanyAsync(Company company)
        {
            throw new NotImplementedException();
        }

        

        /// <summary>
        /// Get all companies
        /// </summary>
        /// <returns>A list of all companies</returns>
        public Task<IEnumerable<Company>> GetCompaniesAsync()
        {
            throw new NotImplementedException();
        }
    }
}
