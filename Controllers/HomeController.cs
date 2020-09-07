using System.Diagnostics;
using Microsoft.AspNetCore.Mvc;
using wealthy.Models;
using wealthy.Services;

namespace wealthy.Controllers
{
    public class HomeController : Controller
    {
        // private readonly ILogger<HomeController> _logger;

        // public HomeController(ILogger<HomeController> logger)
        // {
        //     _logger = logger;
        // }
        
        private IEntryService _entryService;
    
// =======================================================================================================================================
        private IBlogService _blogService;
// =======================================================================================================================================

        private readonly IPushService _pushService;
            public HomeController(IBlogService blogService, IPushService pushService, IEntryService entryService)
        {
            _blogService = blogService;
            _pushService = pushService;
           _entryService = entryService;
        }
        
        public IActionResult Index()
        {
            return View();
        }

        public IActionResult Privacy()
        {
            return View();
        }
// =======================================================================================================================================

        public JsonResult LatestBlogPosts()
        {
            var posts = _blogService.GetLatestPosts();
            return Json(posts);
        }
        

        public JsonResult MoreBlogPosts(int oldestBlogPostId)
        {
        var posts = _blogService.GetOlderPosts(oldestBlogPostId);
        return Json(posts);
        }

        public ContentResult Post(string link)
        {
            return Content(_blogService.GetPostText(link));
        }


// =======================================================================================================================================
        public JsonResult LatestEntries()
        {
            var entries = _entryService.GetLatestEntries();
            return Json(entries);
        }

        public JsonResult MoreEntries(int oldestEntryId)
        {
            var entries = _entryService.GetOlderEntries(oldestEntryId);
            return Json(entries);
        }
        

        public ContentResult Entry(string link)
        {
            return Content(_entryService.GetEntryText(link));
        }

// =======================================================================================================================================

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }
}
