using CompanyOnboarding.Domain.Entities;
namespace CompanyOnboarding.Domain.Interfaces
{
    public interface IStaffRepository
    {
        Task AddBusinessUnitStaffAsync(BusinessUnitStaff businessUnitStaff);
        Task AddGlobalStaffAsync(StaffGlobalProfile staff);
        Task<BusinessUnitStaff> GetStaffByEmailAsync(string email);
    }
}
