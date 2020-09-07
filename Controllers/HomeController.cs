using System.Diagnostics;
using System.Threading.Tasks;
using Lib.Net.Http.WebPush;
using Microsoft.AspNetCore.Mvc;
using wealthy.Models;
using wealthy.Services;

namespace wealthy.Controllers
{
    public class HomeController : Controller
    {
        private IEntryService _entryService;
    
        private readonly IPushService _pushService;
        public HomeController(IPushService pushService , IEntryService entryService)
        {
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

        [HttpGet("publickey")]
        public ContentResult GetPublicKey()
        {
            return Content(_pushService.GetKey(), "text/plain");
        }

        //armazena subscricoes
        [HttpPost("subscriptions")]
        public async Task<IActionResult> StoreSubscription([FromBody]PushSubscription subscription)
        {
            int res = await _pushService.StoreSubscriptionAsync(subscription);

            if (res > 0)
                return CreatedAtAction(nameof(StoreSubscription), subscription);

            return NoContent();
        }

        [HttpDelete("subscriptions")]
        public async Task<IActionResult> DiscardSubscription(string endpoint)
        {
            await _pushService.DiscardSubscriptionAsync(endpoint);

            return NoContent();
        }

        [HttpPost("notifications")]
        public async Task<IActionResult> SendNotification([FromBody]PushMessageViewModel messageVM)
        {
            var message = new PushMessage(messageVM.Notification)
            {
                Topic = messageVM.Topic,
                Urgency = messageVM.Urgency                
            };

            _pushService.SendNotificationAsync(message);

            return NoContent();
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }
}
