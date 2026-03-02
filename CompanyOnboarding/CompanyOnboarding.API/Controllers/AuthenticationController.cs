using CompanyOnboarding.Application.DTO;
using CompanyOnboarding.Application.Interfaces;
using CompanyOnboarding.Domain.Entities;
using Microsoft.AspNetCore.Mvc;
namespace CompanyOnboarding.API.Controllers
{
    [ApiController]
    [Route("auth")]
    public class AuthenticationController : ControllerBase
    {
        private readonly IAuthService _authService;
        private readonly JwtService _jwtService;

        public AuthenticationController(IAuthService authService, JwtService jwtService)
        {
            _authService = authService;
            _jwtService = jwtService;
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginRequest request)
        {
            var result = await _authService.Authenticate(request.Email, request.Password);
            if (result == null)
                return Unauthorized();
            var payload = _jwtService.GenerateToken(result);
            return Ok(payload);
        }
    }
}
