define(['./template.js', '../lib/showdown/showdown.js'],
    function (template, showdown) {

        var latestEntyUrl = '/Home/LatestEntries/';
        var entryUrl = '/Home/Entry/?link=';
        var blogMoreEntriesUrl = '/Home/MoreEntries/?oldestEntryId=';
        var oldestEntryId = 0;

        function setOldestEntryId(data) {
            var ids = data.map(item => item.id);
            oldestEntryId = Math.min(...ids);
        }

        function loadData(url) {
            fetch(url)
                .then(function (response) {
                    return response.json();
                }).then(function (data) {
                    template.appendEntryList(data);
                    setOldestEntryId(data);
                });
        }

        function loadLatestEntries() {
            loadData(latestEntyUrl);
        }
        
        function loadMoreEntries() {
            loadData(blogMoreEntriesUrl + oldestEntryId);
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