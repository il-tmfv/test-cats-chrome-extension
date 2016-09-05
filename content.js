var replaceImagesWithCats = function () {
  var images = document.getElementsByTagName('img');
  for (var i = 0; i < images.length; i++) {
    var width = images[i].width;
    var height = images[i].height;

    if (width > 100 || height > 100) {
      if (width / height < 2 && height / width < 2) {
        images[i].src = 'http://placekitten.com/' + images[i].width + '/' + images[i].height;
      }
    }

  }
};

chrome.runtime.sendMessage({ type: 'catsStatus' }, function (response) {
  console.log('Got response ' + JSON.stringify(response));
  if (response.catsStatus == 1) replaceImagesWithCats();
  return;
});