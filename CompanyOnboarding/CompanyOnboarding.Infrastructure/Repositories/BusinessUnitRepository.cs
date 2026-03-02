using CompanyOnboarding.Domain.Entities;
using CompanyOnboarding.Domain.Interfaces;
using Microsoft.EntityFrameworkCore;

public class BusinessUnitRepository : IBusinessUnitRepository
{
    private readonly PostgresDBContext _context;

    public BusinessUnitRepository(PostgresDBContext context)
    {
        _context = context;
    }

    public async Task<List<BusinessUnit>> GetBusinessUnitsAsync()
    {
        return await _context.business_units.ToListAsync();
    }

    public async Task<BusinessUnit> GetBusinessUnitByIdAsync(Guid id)
    {
        return await _context.business_units
            .Where(x => x.Id == id)
            .FirstOrDefaultAsync()?? throw new Exception("Business unit not found");
    }

    public async Task<BusinessUnit> AddBusinessUnitAsync(BusinessUnit businessUnit)
    {
        _context.business_units.Add(businessUnit);
        await _context.SaveChangesAsync();
        return businessUnit;
    }

    public async Task<BusinessUnit> UpdateBusinessUnitAsync(BusinessUnit businessUnit)
    {
        _context.business_units.Update(businessUnit);
        await _context.SaveChangesAsync();
        return businessUnit;
    }

    public async Task<bool> RemoveBusinessUnitAsync(Guid id)
    {
        var businessUnit = await _context.business_units
            .Where(x => x.Id == id)
            .FirstOrDefaultAsync();
        if (businessUnit == null) return false;

        _context.business_units.Remove(businessUnit);
        await _context.SaveChangesAsync();
        return true;
    }

    public async Task<BusinessUnit> CreateBusinessUnitAsync(BusinessUnit businessUnit)
    {
        _context.business_units.Add(businessUnit);
        await _context.SaveChangesAsync();
        return businessUnit;
    }

    public Task DeleteBusinessUnitAsync(Guid id)
    {
        throw new NotImplementedException();
    }
}
