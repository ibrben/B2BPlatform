using System.ComponentModel.DataAnnotations.Schema;

public class StaffGlobalProfile
{
    [Column("id")]
    public Guid Id { get; private set; }
    [Column("company_id")]
    public Guid CompanyId { get; private set; }
    [Column("first_name")]
    public string FirstName { get; private set; }
    [Column("last_name")]
    public string LastName { get; private set; }
    public StaffGlobalProfile(Guid companyId, string firstName, string lastName)
    {
        Id = new Guid();
        CompanyId = companyId;
        FirstName = firstName;
        LastName = lastName;
    }
}