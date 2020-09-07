define(['./template.js', '../lib/showdown/showdown.js', './clientStorage.js'], 
function (template, showdown, clientStorage) {

    var latestEntriesUrl = '/Home/LatestEntries/';
    var entryUrl = '/Home/Entry/?link=';
    var moreEntriesUrl = '/Home/MoreEntries/?oldestEntryId=';

    function fetchPromise(url, link, text) {

        link = link || '';

        return new Promise(function (resolve, reject) {
            fetch(url + link)
                .then(function (data) {

                    var resolveSuccess = function () {
                        resolve('The connection is OK, showing latest results');
                    };

                    if (text) {
                        data.text().then(function (text) {
                            clientStorage.addEntryText(link, text).then(resolveSuccess);
                        });
                    }
                    else {
                        data.json().then(function (jsonData) {
                            clientStorage.addEntries(jsonData).then(resolveSuccess);
                        });
                    }

                }).catch(function (e) {
                    resolve('No connection, showing offline results');
                });

            setTimeout(function () { resolve('The connection is hanging, showing offline results'); }, 800);
        });
    }

    function loadData(url) {
        fetchPromise(url)
            .then(function (status) {
                $('#connection-status').html(status);

                clientStorage.getEntries()
                    .then(function (entries) {
                        template.appendEntryList(entries);
                    });
            });
    }

    function loadLatestEntries() {
        loadData(latestEntriesUrl);
    }

    function loadEntry(link) {

        fetchPromise(entryUrl, link, true)
            .then(function (status) {
                $('#connection-status').html(status);

                clientStorage.getEntryText(link)
                    .then(function (data) {
                        if (!data) {

                            var contentNotFound = $('#entry-content-not-found')
                                .html().replace(/{{Link}}/g, link);
                            template.showEntryItem(contentNotFound, link);
                        } else {
                            var converter = new showdown.Converter();
                            html = converter.makeHtml(data);
                            template.showEntryItem(html, link);
                        }
                        window.location = '#' + link;
                    });
            });
    }

    function loadMoreEntries() {
        loadData(moreEntriesUrl + clientStorage.getOldestEntryId());
    }

    return {
        loadLatestEntries: loadLatestEntries,
        loadEntry: loadEntry,
        loadMoreEntries: loadMoreEntries
    };
});