using CompanyOnboarding.Domain.Entities;
using CompanyOnboarding.Domain.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace CompanyOnboarding.Infrastructure.Repositories
{
    public class StaffRepository : IStaffRepository
    {
        private readonly PostgresDBContext _context;

        public StaffRepository(PostgresDBContext context)
        {
            _context = context;
        }

        public async Task AddBusinessUnitStaffAsync(BusinessUnitStaff businessUnitStaff)
        {
            _context.bu_staff.Add(businessUnitStaff);
            await _context.SaveChangesAsync();
        }

        public async Task AddGlobalStaffAsync(StaffGlobalProfile staff)
        {
            _context.global_staff.Add(staff);
            await _context.SaveChangesAsync();
            
        }

        public async Task<BusinessUnitStaff> GetStaffByEmailAsync(string email)
        {
            return await _context.bu_staff
                .Where(s => s.Email == email)
                .FirstOrDefaultAsync()?? throw new Exception("Staff not found");
        }
    }
}
