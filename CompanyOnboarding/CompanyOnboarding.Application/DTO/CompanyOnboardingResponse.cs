using System.Text.Json.Serialization;

namespace CompanyOnboarding.Application.DTO;
public class CompanyOnboardingResponse
{
    [JsonPropertyName("success")]
    public Boolean Success { get; set; }
    [JsonPropertyName("message")]
    public string Message { get; set; }
    [JsonPropertyName("credential")]
    public Credential Credential { get; set; }
}
public class Credential
{
    [JsonPropertyName("username")]
    public string Username { get; set; }
    [JsonPropertyName("password")]
    public string Password { get; set; }
}