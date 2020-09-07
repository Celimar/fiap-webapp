var entryService = require('./entryService.js');
var testPushService = require('./testPushService.js');
var serviceWorker = require('./swRegister.js');
var localization = require('./localization.js');
var gyroscope = require('./gyroscope.js');

//window events
let defferedPrompt;
window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    defferedPrompt = e;
    //atualizar a tela para notificar o usuario
    // que ele pode adicionar à tela de home
    $('#install-container').show();
});

window.addEventListener('appinstalled', (evt) => {
    console.log('app foi adicionada na home screen! Yuhuu!');
});

if ('BackgroundFetchManager' in self) {
    console.log('this browser supports Background Fetch!');
}

window.pageEvents = {
    loadEntries: function (link) {
        entryService.loadEntry(link);
    },
    loadMoreEntries: function () {
        entryService.loadMoreEntries();
    },
    tryAddHomeScreen: function () {
        defferedPrompt.prompt();
        defferedPrompt.userChoice.then((choiceResult) => {
            if (choiceResult.outcome == 'accepted') {
                console.log('Usuário aceitou o A2HS prompt');
                $('#install-container').hide();
            }
            defferedPrompt = null;
        });
    },
    setBackgroundFetch: function (link) {
        navigator.serviceWorker.ready.then(async (swReg) => {

            //receive confirmation message 
            navigator.serviceWorker.addEventListener('message', event => {
                $('.download-response').html('msg : ' + event.data.msg + ' url: ' + event.data.url);
                console.log(event.data.msg, event.data.url);
            });

            var date = new Date();
            var timestamp = date.getTime();            
            const bgFetch = await swReg.backgroundFetch.fetch(link,
                ['/Home/Entry/?link=' + link]
                , {
                    downloadTotal: 2 * 1024 * 1024,
                    title: 'download entry',
                    icons: [{
                        sizes: '192x192',
                        src: 'images/icons/wealthy-icon-192.png',
                        type: 'image/png',
                    }]
                });

            bgFetch.addEventListener('progress', () => {
                if (!bgFetch.downloadTotal) return;

                const percent = Math.round(bgFetch.downloaded / bgFetch.downloadTotal * 100);
                console.log('Download progress: ' + percent + '%');
                console.log('Download status: ' + bgFetch.result);

                $('.download-start').hide();
                $('#status-download').show();
                $('#status-download > .progress > .progress-bar').css('width', percent + '%');

                if (bgFetch.result === 'success') {

                    $('#status-download > .text-success').show();
                }
            });
        });
    },
    requestPushPermission: function () {
        serviceWorker.requestPushPermission();
    },
    getGeolocation: function(){
        localization.getGeolocation();
    },
    vibrate: function(){
        function vibrate() {
            if ("vibrate" in navigator) {
                // vibration API supported
                navigator.vibrate = navigator.vibrate || navigator.webkitVibrate || navigator.mozVibrate || navigator.msVibrate;
                navigator.vibrate([1000]);
            }
        }        
    }
};

entryService.loadLatestEntries();
testPushService.bindSendNotification();
gyroscope.init();
gyroscope.animate();
