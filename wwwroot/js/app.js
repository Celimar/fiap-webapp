var blogService = require('./blogService.js');
var entryService = require('./entryService.js');


window.pageEvents = {

    loadEntry: function (link) {
        console.log('loadEntry');
        entryService.loadEntry(link);
    },
    loadMoreEntries: function () {
        console.log('loadMoreEntries');
        entryService.loadMoreEntries();
    },

    loadBlogPost: function (link) {
        console.log('loadBlogPost');
        blogService.loadBlogPost(link);
    },
    loadMoreBlogPosts: function () {
        blogService.loadMoreBlogPosts();
    }
};
   
blogService.loadLatestBlogPosts();
entryService.loadLatestEntries();
