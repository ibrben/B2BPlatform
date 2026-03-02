using CompanyOnboarding.Domain.Interfaces;
using CompanyOnboarding.Infrastructure.Repositories;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace CompanyOnboarding.Infrastructure
{
    public static class IServiceCollectionConfiguration
    {
        public static void AddInfrastructureServices(this IServiceCollection services, IConfiguration config)
        {
            services.AddDbContext<PostgresDBContext>(option => {
                option.UseNpgsql(config.GetConnectionString("DefaultConnection"));
            });
            services.AddScoped<PostgresDBContext>();

            // Register CompanyRepository as a scoped service which implements ICompanyRepository
            services.AddScoped<ICompanyRepository, CompanyRepository>();
            services.AddScoped<IBusinessUnitRepository, BusinessUnitRepository>();
            services.AddScoped<IStaffRepository, StaffRepository>();
            services.AddSingleton<JwtService>();
        }
    }
}
