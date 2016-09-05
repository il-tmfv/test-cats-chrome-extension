var getCatsStatus = function (callback) {
  var catsStatus = 0;

  chrome.storage.local.get('catsStatus', function (storage) {
    console.log('Got storage ' + JSON.stringify(storage));
    catsStatus = ((typeof storage.catsStatus === 'undefined') ? 0 : storage.catsStatus);
    callback(catsStatus);
  });
}

chrome.runtime.onMessage.addListener(
  function (request, sender, sendResponse) {
    getCatsStatus(function (catsStatus) {
      if (request.type == 'catsStatus') {
        console.log('Going to send catsStatus = ' + JSON.stringify(catsStatus));
        sendResponse({ catsStatus: catsStatus });
      }
    });
    return true;
  }
);

chrome.browserAction.onClicked.addListener(
  function (tab) {
    getCatsStatus(function (catsStatus) {
      if (catsStatus) {
        chrome.browserAction.setIcon({ path: 'off.png' });
        chrome.storage.local.set({ catsStatus: 0 }, function () {
          console.log('catsStatus set to 0');
        });
      }
      else {
        chrome.browserAction.setIcon({ path: 'on.png' });
        chrome.storage.local.set({ catsStatus: 1 }, function () {
          console.log('catsStatus set to 1');
        });
      }
    });
  }
);