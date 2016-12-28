using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Data.Entity.ModelConfiguration.Conventions;
using System.Linq;
using System.Web;

namespace Blog.Web.Entities
{
    public class BlogContext : DbContext
    {
        public BlogContext() : base("DefaultConnectionString")
        {
            Database.SetInitializer<BlogContext>(null);//disable any modifications of database schema by entity framework
        }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Conventions.Remove<PluralizingTableNameConvention>();
        }

        public DbSet<Post> Posts { get; set; }
    }
}