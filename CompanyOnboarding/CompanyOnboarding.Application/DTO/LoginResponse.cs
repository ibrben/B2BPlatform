using System.Text.Json;
using System.Text.Json.Serialization;

public class LoginResponse
{
    [JsonPropertyName("token")]
    public string Token { get; set; }
    [JsonPropertyName("exp")]
    public string Expire { get; set; }
}