using Microsoft.EntityFrameworkCore;
using PostsGallery.Models;

namespace PostsGallery.App
{
    public class DataContext : DbContext
    {
        public DbSet<Post> Posts { get; set; }

        public DbSet<User> Users { get; set; }


        public DataContext(DbContextOptions<DataContext> options) : base(options) {
            Database.EnsureCreated();
        }

    }
}
