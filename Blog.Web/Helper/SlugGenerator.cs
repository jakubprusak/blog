using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.RegularExpressions;
using System.Web;

namespace Blog.Web.Helper
{
    public static class SlugGenerator
    {
        public static string GenerateSlug(string phrase)
        {
            string str = phrase.ToLower().RemoveAccent();
            // invalid chars           
            str = Regex.Replace(str, @"[^a-z0-9\s-]", "");
            // convert multiple spaces into one space   
            str = Regex.Replace(str, @"\s+", " ").Trim();
            // cut and trim 
            str = str.Substring(0, str.Length <= 150 ? str.Length : 150).Trim();
            str = Regex.Replace(str, @"\s", "-"); // hyphens   
            return str;
        }

        private static string RemoveAccent(this string str)
        {
            byte[] bytes = System.Text.Encoding.GetEncoding("Cyrillic").GetBytes(str);
            return System.Text.Encoding.ASCII.GetString(bytes);
        }

    }
}