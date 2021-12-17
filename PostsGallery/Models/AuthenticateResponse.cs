using CstsHelpers;
using PostsGallery.Models;
using System.Text.Json.Serialization;

namespace WebApi.Models
{
    [TypeScriptModel]
    public class AuthenticateResponse
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Login { get; set; }
        public string JwtToken { get; set; }

        [JsonIgnore] // refresh token is returned in http only cookie
        public string RefreshToken { get; set; }

        public AuthenticateResponse(User user, string jwtToken, string refreshToken)
        {
            Id = user.Id;
            Login = user.Login;
            Name = user.Name;
            JwtToken = jwtToken;
            RefreshToken = refreshToken;
        }
    }
}