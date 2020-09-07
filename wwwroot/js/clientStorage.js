define([], function () {

    var entryInstance = localforage.createInstance({
       name: 'entry'
    });

    var oldestEntryId = null;
    var limit = 3;


   function addEntries(entries) {
       return new Promise(function (resolve, reject) {
           var keyValuePair = [];
           entries.map(function (item) {
               keyValuePair.push({
                   key: item.id,
                   value: item
               });
           });
           entryInstance.setItems(keyValuePair)
               .then(function () {
                   resolve();
               });
       });
   }

   function getEntries() {
       return new Promise(function (resolve, reject) {
           entryInstance.keys().then(function (keys) {
               var index = keys.indexOf(oldestEntryId);
               if (index == -1) { index = keys.length; }
               if (index == 0) { resolve([]); return; }
               var start = index - limit;
               var limitAdjusted = start < 0 ? index : limit;
               keys = keys.splice(Math.max(0, start), limitAdjusted);
               entryInstance.getItems(keys)
                   .then(function (results) {
                       var entries = Object.keys(results).map(function (k) {
                           return results[k];
                       }).reverse();
                   oldestEntryId = entries[entries.length - 1].id;
//console.log("get entries : "+ JSON.stringify(entries));
                   resolve(entries);
               });
           });
       });
   }

   function getOldestEntryId() {
       return oldestEntryId;
   }

    return {
        addEntries: addEntries,
        getEntries: getEntries,
        getOldestEntryId: getOldestEntryId
    };

});
