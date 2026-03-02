using CompanyOnboarding.Domain.Enum;

namespace CompanyOnboarding.API.Attributes
{
    [AttributeUsage(AttributeTargets.Method | AttributeTargets.Class, AllowMultiple = true)]
    public class RequireRoleAttribute : Attribute
    {
        public RoleId[] Roles { get; }

        public RequireRoleAttribute(params RoleId[] roles)
        {
            Roles = roles;
        }
    }
}