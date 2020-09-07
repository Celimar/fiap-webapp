// define(['./template.js', './clientStorage.js', '../lib/showdown/showdown.js'],
//     function (template, clientStorage, showdown) {

//         var blogPostUrl = '/Home/Post/?link=';
//         var latestBlogPostUrl = '/Home/LatestBlogPosts/';
//         var blogMorePostsUrl = '/Home/MoreBlogPosts/?oldestBlogPostId=';

//         function fetchPromise(url) {
//             return new Promise(function (resolve, reject) {
//                 fetch(url)
//                     .then(function (response) {
//                         return response.json();
//                     }).then(function (data) {
//                         clientStorage.addPosts(data)
//                             .then(function () {
//                                 resolve('The connection is OK, showing latest results');
//                             });
//                     }).catch(function (e) {
//                         resolve('No connection, showing offline results');
//                     });
//                 setTimeout(function () { resolve('The connection is hanging, showing offline results'); }, 1000);
//             });
//         }

//         function loadData(url) {
//             fetchPromise(url)
//                 .then(function (status) {
//                     $('#connection-status').html(status);
//                     clientStorage.getPosts()
//                         .then(function (posts) {
//                             template.appendBlogList(posts);
//                         });
//                 });
//         }

//         function getOldestBlogPostId() {
//             return oldestBlogPostId;
//         }

//         function setOldestBlogPostId(data) {
//             var ids = data.map(item => item.postId);
//             oldestBlogPostId = Math.min(...ids);
//         }

//         function loadLatestBlogPosts() {
//             loadData(latestBlogPostUrl);
//         }

//         function loadMoreBlogPosts() {
//             loadData( blogMorePostsUrl + clientStorage.getOldestBlogPostId() );
//         }

//         function loadBlogPost(link) {
//             fetch(blogPostUrl + link)
//                 .then(function (response) {
//                     return response.text();
//                 }).then(function (data) {
//                     var converter = new showdown.Converter();
//                     html = converter.makeHtml(data);
//                     template.showBlogItem(html, link);
//                     window.location = '#' + link;
//                 });
//         }

//         return {
//             loadLatestBlogPosts: loadLatestBlogPosts,
//             loadBlogPost: loadBlogPost,
//             loadMoreBlogPosts: loadMoreBlogPosts
//         };

//     });