var getCatsStatus = function (callback) {
  var catsStatus = 0;

  chrome.storage.local.get('catsStatus', function (storage) {
    console.log('Got storage ' + JSON.stringify(storage));
    catsStatus = ((typeof storage.catsStatus === 'undefined') ? 0 : storage.catsStatus);
    callback(catsStatus);
  });
}

/*
chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
  chrome.runtime.sendMessage({ type: 'catsStatus' }, function (response) {
    console.log('Got response ' + JSON.stringify(response));
    if (response.catsStatus == 1) replaceImagesWithCats();
    return;
  });
});
*/

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