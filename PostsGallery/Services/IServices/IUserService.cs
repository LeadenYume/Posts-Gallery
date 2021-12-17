using Microsoft.AspNetCore.Http;
using PostsGallery.Models;
using System.Collections.Generic;
using WebApi.Models;

namespace PostsGallery.Services
{
    public interface IUserService
    {
        AuthenticateResponse Authenticate(AuthenticateRequest model, string ipAddress);
        AuthenticateResponse RefreshToken(string token, string ipAddress);
        bool RevokeToken(string token, string ipAddress);
        User GetById(int id);
        User UserInfo(HttpContext context);
        bool NewUser(NewUserRequest user);
        bool CheckName(string login);
    }
}