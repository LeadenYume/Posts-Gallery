using PostsGallery.Models;
using System.Collections.Generic;

namespace PostsGallery.Services
{
    public interface IPosts
    {
        public void AddPost(Post post, User user);
        public List<Post> All();
    }
}