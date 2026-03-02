using CompanyOnboarding.Application.Interfaces;
using CompanyOnboarding.Application.DTO;
using CompanyOnboarding.Domain.Entities;
using CompanyOnboarding.Domain.Interfaces;
using CompanyOnboarding.Domain.Enum;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using BCrypt.Net;
using CompanyOnboarding.Application.Utils;

namespace CompanyOnboarding.Application.Services;

public class OnboardCompanyService : IOnboardCompanyService
{
    private readonly ICompanyRepository _companyRepository;
    private readonly IBusinessUnitRepository _businessUnitRepository;
    private readonly IStaffRepository _staffRepository;

    public OnboardCompanyService(
        ICompanyRepository companyRepository,
        IBusinessUnitRepository businessUnitRepository,
        IStaffRepository staffRepository
        )
    {
        _companyRepository = companyRepository;
        _businessUnitRepository = businessUnitRepository;
        _staffRepository = staffRepository;
    }
    /// <summary>
    /// To onboard a company and if onboard successfully then create a default business unit
    /// </summary>
    /// <param name="request">The onboard company request</param>
    /// <returns>The result of the onboard company operation</returns>
    public async Task<CompanyOnboardingResponse> Onboard(CompanyOnboardingRequest request)
    {
        var company = new Company(
            request.CompanyName,
            request.Address,
            request.Phone
        );

        await _companyRepository.AddCompanyAsync(company);

        var bu = new BusinessUnit(company.Id, "Default BU");

        var staff = new StaffGlobalProfile(
            company.Id,
            request.OwnerFirstName,
            request.OwnerLastName
        );
        var defaultPwd = PasswordGenerator.GeneratePassword(7);
        var bu_staff = new BusinessUnitStaff(
            staff.Id,
            bu.Id,
            request.OwnerEmail,
            RoleId.Admin,
            BCrypt.Net.BCrypt.HashPassword(defaultPwd)
            );

        await _businessUnitRepository.CreateBusinessUnitAsync(bu);
        await _staffRepository.AddGlobalStaffAsync(staff);
        await _staffRepository.AddBusinessUnitStaffAsync(bu_staff);

        return new CompanyOnboardingResponse
        {
            Credential = new Credential
            {
                Username = request.OwnerEmail,
                Password = defaultPwd
            }
        };
    }
}
