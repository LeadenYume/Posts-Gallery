using CstsHelpers;
using System.Text.Json.Serialization;

namespace PostsGallery.Models
{
    [TypeScriptModel]
    public class Post
    {
        public int Id { get; set; }
        public string Content { get; set; }

        public User User { get; set; }
    }
}
