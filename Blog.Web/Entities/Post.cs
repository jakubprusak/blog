using System;
using System.Web.Mvc;

namespace Blog.Web.Entities
{
    public class Post
    {
        public int PostId { get; set; }

        public string MainImageUri { get; set; }

        public string Title { get; set; }

        public string TitleSlug { get; set; }

        public string SubTitle { get; set; }

        public string Writter { get; set; }

        public DateTime Date { get; set; }

        public DateTime DateAdded { get; set; }

        [AllowHtml]
        public string Content { get; set; }

        public bool Published { get; set; }
    }
}