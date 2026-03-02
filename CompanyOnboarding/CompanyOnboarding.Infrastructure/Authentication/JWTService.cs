using System.Security.Claims;
using CompanyOnboarding.Domain.Entities;
using Microsoft.Extensions.Configuration;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using System.IdentityModel.Tokens.Jwt;

public class JwtService
{
    private readonly IConfiguration _config;

    public JwtService(IConfiguration config)
    {
        _config = config;
    }

    public JWTPayload GenerateToken(BusinessUnitStaff staff)
    {
        var claims = new[]
        {
            new Claim("userId", staff.Id.ToString()),
            new Claim("companyId", staff.BusinessUnitId.ToString()),
            new Claim("businessUnitId", staff.StaffGlobalId.ToString()),
            new Claim("role", staff.RoleId.ToString())
        };

        var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["Jwt:Key"]));

        var token = new JwtSecurityToken(
            claims: claims,
            expires: DateTime.UtcNow.AddHours(2),
            signingCredentials:
                new SigningCredentials(key, SecurityAlgorithms.HmacSha256)
        );
        
        return new JWTPayload
        {
            Token = new JwtSecurityTokenHandler().WriteToken(token),
            Expire = token.ValidTo.ToString()
        };
    }
    
    public ClaimsPrincipal VerifyToken(string token)
    {
        var tokenHandler = new JwtSecurityTokenHandler();
    var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["Jwt:Key"]));

    var validationParameters = new TokenValidationParameters
    {
        ValidateIssuerSigningKey = true,
        IssuerSigningKey = key,
        ValidateIssuer = false,
        ValidateAudience = false,
        ValidateLifetime = true
    };

    try
    {
        var principal = tokenHandler.ValidateToken(token, validationParameters, out SecurityToken validatedToken);

        // Ensure the token uses the expected algorithm
        if (validatedToken is not JwtSecurityToken jwtToken ||
            !jwtToken.Header.Alg.Equals(SecurityAlgorithms.HmacSha256, StringComparison.OrdinalIgnoreCase))
        {
            throw new SecurityTokenException("Invalid token algorithm.");
        }

            return principal;
    }
    catch (SecurityTokenExpiredException)
    {
        throw new SecurityTokenExpiredException("Token has expired.");
    }
    catch (SecurityTokenException ex)
    {
        throw new SecurityTokenException($"Token validation failed: {ex.Message}");
    }
    }
}