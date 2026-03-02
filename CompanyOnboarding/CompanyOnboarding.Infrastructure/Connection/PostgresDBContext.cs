using Microsoft.EntityFrameworkCore;
using CompanyOnboarding.Domain.Entities;
public class PostgresDBContext : DbContext
{
    public PostgresDBContext(DbContextOptions<PostgresDBContext> options) : base(options) { }

    public DbSet<Company> companies { get; set; }

    public DbSet<BusinessUnit> business_units { get; set; }

    public DbSet<BusinessUnitStaff> bu_staff { get; set; }
    public DbSet<StaffGlobalProfile> global_staff { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {

        modelBuilder.Entity<BusinessUnitStaff>().ToTable("staff_bu_profiles");
        modelBuilder.Entity<StaffGlobalProfile>().ToTable("staff_global_profiles");
    }

}
