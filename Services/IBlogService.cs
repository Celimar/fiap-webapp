using System.Collections.Generic;
using wealthy.Models;

namespace wealthy.Services
{
    public interface IBlogService
    {
        List<BlogPost> GetLatestPosts();
        string GetPostText(string link);

        List<BlogPost> GetOlderPosts(int oldestPostId);
    }
}