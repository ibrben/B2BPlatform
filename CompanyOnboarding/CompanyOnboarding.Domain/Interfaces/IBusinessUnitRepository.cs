using CompanyOnboarding.Domain.Entities;
namespace CompanyOnboarding.Domain.Interfaces
{
    public interface IBusinessUnitRepository
    {
        Task<List<BusinessUnit>> GetBusinessUnitsAsync();
        Task<BusinessUnit> GetBusinessUnitByIdAsync(Guid id);
        Task<BusinessUnit> CreateBusinessUnitAsync(BusinessUnit businessUnit);
        Task<BusinessUnit> UpdateBusinessUnitAsync(BusinessUnit businessUnit);
        Task DeleteBusinessUnitAsync(Guid id);
    }
}
