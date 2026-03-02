using System.ComponentModel.DataAnnotations.Schema;
using CompanyOnboarding.Domain.Enum;

namespace CompanyOnboarding.Domain.Entities;
public class BusinessUnitStaff
{
    [Column("id")]
    public Guid Id { get; private set; }

    [Column("staff_global_id")]
    public Guid StaffGlobalId { get; private set; }

    [Column("business_unit_id")]
    public Guid BusinessUnitId { get; private set; }

    [Column("email")]
    public string Email { get; private set; }

    [Column("role_id")]
    public RoleId RoleId { get; private set; }

    [Column("password_hash")]
    public string HashedPassword { get; private set; }

    public BusinessUnitStaff(Guid staffGlobalId, Guid businessUnitId, string email, RoleId roleId, string hashedPassword)
    {
        Id = Guid.NewGuid();
        StaffGlobalId = staffGlobalId;
        BusinessUnitId = businessUnitId;
        Email = email;
        RoleId = roleId;
        HashedPassword = hashedPassword;
    }
}