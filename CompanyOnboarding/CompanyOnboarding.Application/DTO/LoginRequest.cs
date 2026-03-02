using System.Text.Json.Serialization;

namespace CompanyOnboarding.Application.DTO
{
    public class LoginRequest
    {
        [JsonPropertyName("email")]
        public string Email { get; set; }
        [JsonPropertyName("password")]
        public string Password { get; set; }
    }
}
