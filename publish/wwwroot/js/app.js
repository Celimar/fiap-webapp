//var blogService = require('./blogService.js');
var entryService = require('./entryService.js');
var serviceWorker = require('./swRegister.js'); 

window.pageEvents = {

    loadEntry: function (link) {
        entryService.loadEntry(link);
    },
    loadMoreEntries: function () {
        entryService.loadMoreEntries();
    }
    // ,
    // loadBlogPost: function (link) {
    //     blogService.loadBlogPost(link);
    // },
    // loadMoreBlogPosts: function () {
    //     blogService.loadMoreBlogPosts();
    // }
};
   
// blogService.loadLatestBlogPosts();
entryService.loadLatestEntries();
