using CstsHelpers;

namespace WebApi.Models
{
    [TypeScriptModel]
    public class RevokeTokenRequest
    {
        public string Token { get; set; }
    }
}