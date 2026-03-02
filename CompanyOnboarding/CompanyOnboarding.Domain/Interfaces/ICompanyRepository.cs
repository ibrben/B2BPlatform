using CompanyOnboarding.Domain.Entities;
namespace CompanyOnboarding.Domain.Interfaces
{
    public interface ICompanyRepository
    {
        Task<Company> AddCompanyAsync(Company company);
        Task<Company> UpdateCompanyAsync(Company company);
        Task<bool> RemoveCompanyAsync(int id);
        Task<IEnumerable<Company>> GetCompaniesAsync();
        Task<Company> GetCompanyByIdAsync(int id);
    }
}
