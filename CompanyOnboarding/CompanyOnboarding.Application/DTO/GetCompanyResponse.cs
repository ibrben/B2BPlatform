using System.Text.Json.Serialization;

namespace CompanyOnboarding.Application.DTO;
public class GetCompanyResponse
{
    [JsonPropertyName("companyName")]
    public string CompanyName { get; set; }
    [JsonPropertyName("address")]
    public string Address { get; set; }
    [JsonPropertyName("phone")]
    public string Phone { get; set; }
    public GetCompanyResponse(string companyName, string address, string phone)
    {
        CompanyName = companyName;
        Address = address;
        Phone = phone;
    }
}