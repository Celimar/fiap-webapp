define(['./template.js', '../lib/showdown/showdown.js', './clientStorage.js'],
    function (template, showdown, clientStorage) {

        var entryUrl = '/Home/Entry/?link=';
        var latestEntryUrl = '/Home/LatestEntries/';
        var blogMoreEntriesUrl = '/Home/MoreEntries/?oldestEntryId=';

        function fetchPromise(url) {
            return new Promise(function (resolve, reject) {
                fetch(url)
                    .then(function (response) {
                        return response.json();
                    }).then(function (data) {
                        clientStorage.addEntries(data)
                            .then(function () {
console.log("clientStorage.addEntries(data): " + JSON.stringify(data));
                                resolve('The connection is OK, showing latest results');
                            });
                    }).catch(function (e) {
                        resolve('No connection, showing offline results');
                    });
                setTimeout(function () { resolve('The connection is hanging, showing offline results'); }, 1000);
            });
        }

        function loadData(url) {
            fetchPromise(url)
                .then(function (status) {
                    $('#connection-status').html(status);
                    clientStorage.getEntries()
                        .then(function (entries) {
console.log("clientStorage.getEntries(): " + JSON.stringify(entries));
                            template.appendEntryList(entries);
                        });
                });
        }

        function getOldestEntryId() {
            return oldestEntryId;
        }

        function setOldestEntryId(data) {
            var ids = data.map(item => item.id);
            oldestEntryId = Math.min(...ids);
        }

        function loadLatestEntries() {
            loadData(latestEntryUrl);
        }

        function loadMoreEntries() {
            loadData(blogMoreEntriesUrl + clientStorage.getOldestEntryId());
        }

        function loadEntry(link) {
            fetch(entryUrl + link)
                .then(function (response) {
                    return response.text();
                }).then(function (data) {
                    var converter = new showdown.Converter();
                    html = converter.makeHtml(data);
                    template.showEntryItem(html, link);
                    window.location = '#' + link;
                });
        }

        return {
            loadLatestEntries: loadLatestEntries,
            loadEntry: loadEntry,
            loadMoreEntries: loadMoreEntries
        };

    });