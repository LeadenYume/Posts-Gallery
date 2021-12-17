using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using PostsGallery.Models;
using PostsGallery.Services;
using System.Collections.Generic;

namespace PostsGallery.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/[controller]")]
    public class PostsController : ControllerBase
    {
        IUserService Users { get; }
        IPosts Posts { get; }

        public PostsController(IPosts posts, IUserService users)
        {
            Users = users;
            Posts = posts;
        }

        [AllowAnonymous]
        [HttpGet]
        public List<Post> All()
        {
            return Posts.All();
        }

        [HttpPost("create")]
        public void AddPost(AddPostRequest post)
        {
            var user = Users.UserInfo(HttpContext);
            var newPost = new Post()
            {
                Content = post.Content
            };
            Posts.AddPost(newPost, user);
        }
    }
}
