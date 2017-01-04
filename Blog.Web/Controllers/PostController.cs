using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Blog.Web.Entities;
using Blog.Web.Helper;

namespace Blog.Web.Controllers
{
    public class PostController : BaseController
    {
        private int _numberOfPostToFetch = 2;
        // GET: Post
        public ActionResult Index(int id, string title = null)
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

        public ActionResult Preview(Post post)
        {

            return View("Index", post);
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
            post.TitleSlug = SlugGenerator.GenerateSlug(post.Title);
            using (var db = new BlogContext())
            {
                db.Posts.Add(post);
                db.SaveChanges();
            }

            return RedirectToAction("Index",new {id =  post.PostId});
        }

        [HttpGet]
        public PartialViewResult PostList(int id = 0)
        {
            var posts = new List<Post>();

            using (var db = new BlogContext())
            {
                posts = db.Posts.Where(a => a.PostId > id && a.Published).Take(_numberOfPostToFetch).ToList();
            }

            return PartialView("_postListPartial", posts);
        }
    }
}