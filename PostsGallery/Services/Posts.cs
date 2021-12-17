using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using Newtonsoft.Json.Schema;
using PostsGallery.App;
using PostsGallery.Models;
using System.Collections.Generic;
using System.Linq;

namespace PostsGallery.Services
{
    public class Posts : IPosts
    {
        IOptions<Settings> Settings { get; }

        DataContext Context { get; }

        public Posts(IOptions<Settings> settings, DataContext context)
        {
            Settings = settings;
            Context = context;
        }

        public List<Post> All()
        {
            return Context.Posts.AsNoTracking().Include(x => x.User).ToList();
        }

        public void AddPost(Post post, User user)
        {
            var dbUser = Context.Users.FirstOrDefault(x => x.Id == user.Id);
            post.User = dbUser;
            Context.Posts.Add(post);
            Context.SaveChanges();
        }
    }
}
