using CompanyOnboarding.Application.DTO;

namespace CompanyOnboarding.Application.Interfaces
{
    public interface IOnboardCompanyService
    {
        Task<CompanyOnboardingResponse> Onboard(CompanyOnboardingRequest request);
    }
}
