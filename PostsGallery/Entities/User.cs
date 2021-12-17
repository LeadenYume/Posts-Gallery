using System.Text.Json.Serialization;
using System.Collections.Generic;
using CstsHelpers;

namespace PostsGallery.Models
{
    [TypeScriptModel]
    public class User
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Login { get; set; }

        [JsonIgnore]
        public string Password { get; set; }

        [JsonIgnore]
        public List<RefreshToken> RefreshTokens { get; set; }
    }
}