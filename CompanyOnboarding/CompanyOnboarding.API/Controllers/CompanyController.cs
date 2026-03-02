using Microsoft.AspNetCore.Mvc;
using CompanyOnboarding.Application.Interfaces;
using CompanyOnboarding.Application.DTO;
using System.Threading.Tasks;
using CompanyOnboarding.API.Attributes;
using CompanyOnboarding.Domain.Enum;

namespace CompanyOnboarding.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CompanyController : ControllerBase
    {
        private readonly IOnboardCompanyService _onboardCompanyService;

        public CompanyController(IOnboardCompanyService onboardCompanyService)
        {
            _onboardCompanyService = onboardCompanyService;
        }
        /// <summary>
        /// To onboard a company
        /// </summary>
        /// <param name="request">The onboard company request</param>
        /// <returns>The result of the onboard company operation</returns>
        [HttpPost("Onboard")]
        [RequireRole(RoleId.Admin)]
        public async Task<IActionResult> OnboardCompany([FromBody] CompanyOnboardingRequest request)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);
            // onboard company logic
            var result = await _onboardCompanyService.Onboard(request);
            if (result != null)
            {
                result.Success = true;
            } 
            return Ok(result);
        }

        /// <summary>
        /// To update a company
        /// </summary>
        /// <param name="id">The id of the company to update</param>
        /// <param name="request">The update company request</param>
        /// <returns>The result of the update company operation</returns>
        [HttpPut("{id}")]
        public IActionResult UpdateCompany([FromRoute] int id, [FromBody] CompanyOnboardingRequest request)
        {
            //TODO: update company logic
            return Ok();
        }
        
        /// <summary>
        /// To remove a company
        /// </summary>
        /// <param name="id">The id of the company to remove</param>
        /// <returns>The result of the remove company operation</returns>
        [HttpDelete("{id}")]
        public IActionResult RemoveCompany([FromRoute] int id)
        {
            //TODO: remove company logic
            return Ok();
        }
    }
    
    
}
