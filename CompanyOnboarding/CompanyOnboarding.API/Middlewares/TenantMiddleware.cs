using CompanyOnboarding.Domain.Enum;

namespace CompanyOnboarding.API.Middlewares
{
    public class TenantMiddleware
    {
        private readonly RequestDelegate _next;
        private readonly JwtService _jwtService;

        public TenantMiddleware(RequestDelegate next, JwtService jwtService)
        {
            _next = next;
            _jwtService = jwtService;
        }

        public async Task InvokeAsync(HttpContext context)
        {
            var bearerToken = context.Request.Headers["Authorization"].FirstOrDefault();
            if (string.IsNullOrWhiteSpace(bearerToken) || !bearerToken.StartsWith("Bearer "))
            {
                context.Response.StatusCode = 401;
                await context.Response.WriteAsync("Unauthorized");
                return;
            }

            var token = bearerToken.Split(" ")[1];
            
            var principal = _jwtService.VerifyToken(token);    
            if (principal == null)
            {
                context.Response.StatusCode = 401;
                await context.Response.WriteAsync("Unauthorized");
                return;
            }
            context.User = principal;
            var roleValue = principal.FindFirst("role");
            // if (!Enum.TryParse<RoleId>(roleValue, out var roleId))
            // {
            //     await context.Response.WriteAsync("Unauthorized");
            //     return;
            // }
            
            await _next(context);
        }
    }
}
