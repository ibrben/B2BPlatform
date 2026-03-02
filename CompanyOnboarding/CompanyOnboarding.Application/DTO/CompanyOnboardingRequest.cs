
using System.Text.Json;
using System.Text.Json.Serialization;
namespace CompanyOnboarding.Application.DTO;

public class CompanyOnboardingRequest
{
    [JsonPropertyName("companyName")]
    public string CompanyName { get; set; }

    [JsonPropertyName("address")]
        public string Address { get; set; }

        [JsonPropertyName("phone")]
        public string Phone { get; set; }

        [JsonPropertyName("ownerFirstName")]
        public string OwnerFirstName { get; set; }

        [JsonPropertyName("ownerLastName")]
        public string OwnerLastName { get; set; }

        [JsonPropertyName("ownerEmail")]
        public string OwnerEmail { get; set; }
}

