using CompanyOnboarding.Application.DTO;
using CompanyOnboarding.Domain.Entities;

namespace CompanyOnboarding.Application.Interfaces
{
    public interface IOnboardCompanyService
    {
        Task<CompanyOnboardingResponse> Onboard(CompanyOnboardingRequest request);
        Task<List<Company>> GetCompaniesAsync();
    }
}
