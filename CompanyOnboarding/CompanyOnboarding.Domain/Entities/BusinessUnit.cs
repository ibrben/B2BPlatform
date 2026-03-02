using System.ComponentModel.DataAnnotations.Schema;

namespace CompanyOnboarding.Domain.Entities;
public class BusinessUnit
{
    [Column("id")]
    public Guid Id { get; private set; }
    [Column("company_id")]
    public Guid CompanyId { get; private set; }
    [Column("name")]
    public string BusinessUnitName { get; private set; }

    public BusinessUnit(Guid companyId, string businessUnitName)
    {
        Id = new Guid();
        CompanyId = companyId;
        BusinessUnitName = businessUnitName;
    }
}