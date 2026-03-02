using CompanyOnboarding.Application.Interfaces;
using CompanyOnboarding.Application.Services;
using CompanyOnboarding.Domain.Interfaces;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;


namespace CompanyOnboarding.Infrastructure
{
    public static class IServiceCollectionConfiguration
    {
        public static void AddApplicationServices(this IServiceCollection services)
        {
            services.AddScoped<IOnboardCompanyService, OnboardCompanyService>();
            services.AddScoped<IAuthService, AuthService>();
            
        }
    }
}
