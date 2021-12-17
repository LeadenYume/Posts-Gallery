using CstsHelpers;

namespace PostsGallery.Models
{
    [TypeScriptModel]
    public class NewUserRequest
    {
        public string Name { get; set; }
        public string Login { get; set; }
        public string Password { get; set; }

    }
}
