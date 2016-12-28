using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Blog.Web.Entities;

namespace Blog.Web.Controllers
{
    public class PostController : Controller
    {
        private int _numberOfPostToFetch = 5;
        // GET: Post
        public ActionResult Index(int id)
        {
            Post post = null;
            using (var db = new BlogContext())
            {
                post = db.Posts.FirstOrDefault(p=> p.PostId == id);
                if(post == null)
                    return HttpNotFound();
            }

            return View(post);
        }

        [HttpGet]
        public ActionResult Create(int? id)
        {
            Post post = null;

            if (id.HasValue)
            {
                using (var db = new BlogContext())
                {
                   post = db.Posts.Find(id.Value);
                }
            }

            if (post == null)
            {
                post = new Post();
                post.Date = DateTime.Now;
            }

            return View(post);
        }

        [HttpPost]
        public ActionResult Create(Post post)
        {
            post.DateAdded = DateTime.Now;
            using (var db = new BlogContext())
            {
                db.Posts.Add(post);
                db.SaveChanges();
            }

            return RedirectToAction("Index",post.Title);
        }

        [HttpGet]
        public PartialViewResult PostList(int lastId = 0)
        {
            var posts = new List<Post>();

            using (var db = new BlogContext())
            {
                posts = db.Posts.Where(a => a.PostId > lastId).Take(_numberOfPostToFetch).ToList();
            }

            return PartialView("_postListPartial", posts);
        }
    }
}