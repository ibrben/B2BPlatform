using System.ComponentModel.DataAnnotations.Schema;

namespace CompanyOnboarding.Domain.Entities
{
    public class Company
    {
        [Column("id")]
        public Guid Id { get; private set; }

        [Column("name")]
        public string Name { get; private set; }

        [Column("phone")]
        public string Phone { get; private set; }

        [Column("address")]
        public string Address { get; private set; }

        public Company(string name, string phone, string address)
        {
            Id = new Guid();
            Name = name;
            Phone = phone;
            Address = address;
        }
    }


}
