using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using PostsGallery.Models;

namespace PostsGallery.Controllers
{
    [ApiController]
    [Authorize]
    [Route("api/[controller]")]
    public class TestController : ControllerBase
    {
        public TestController(IOptions<Settings> settings)
        {
            AppSettings = settings.Value;
        }

        private Settings AppSettings { get; }

        [HttpGet]
        [AllowAnonymous]
        public IActionResult Get()
        {
            return Ok("Test");
        }
    }
}
