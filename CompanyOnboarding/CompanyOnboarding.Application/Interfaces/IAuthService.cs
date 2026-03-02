using CompanyOnboarding.Domain.Entities;

namespace CompanyOnboarding.Application.Interfaces
{
    public interface IAuthService
    {
        Task<BusinessUnitStaff> Authenticate(string email, string password);
    }
}