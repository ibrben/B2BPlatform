using System.Net.Mail;
using BCrypt.Net;
using CompanyOnboarding.Domain.Entities;
using CompanyOnboarding.Domain.Interfaces;

namespace CompanyOnboarding.Application.Interfaces;

public class AuthService : IAuthService
{
    private readonly IStaffRepository _staffRepository;
    public AuthService(IStaffRepository staffRepository)
    {
        _staffRepository = staffRepository;
    }
        /// <summary>
        /// Authenticates a user using their email and password.
        /// </summary>
        /// <param name="email">The user's email.</param>
        /// <param name="password">The user's password.</param>
        /// <returns>A task returning the user's token if authentication is successful, otherwise null.</returns>
/// 
/// 
/// 
/// 
    public async Task<BusinessUnitStaff> Authenticate(string email, string password)
    {
        var staff = await _staffRepository.GetStaffByEmailAsync(email);
        if (staff == null) return null;
        var encrypted = BCrypt.Net.BCrypt.HashPassword(password);
        var passwordMatch = BCrypt.Net.BCrypt.Verify(password, staff.HashedPassword);
        if (!passwordMatch) return null;
        return staff;
    }    
}
