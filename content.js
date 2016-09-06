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

var putSpanTagAround = function (str) {
  return '<span class=\'replaced-with-cat\'>' + str + '</span>';
}

var replaceWord = function (words, newWord) {
  for (var i = 0; i < words.length; i++) {
    var word = words[i];
    var re = new RegExp(word, 'g');
    var taggedNewWord = putSpanTagAround(newWord);
    document.body.innerHTML = document.body.innerHTML.replace(re, taggedNewWord);
  }
}

var replaceWordsWithCats = function () {
  replaceWord(['новости',   'комментарии'],   'котики');
  replaceWord(['новостей',  'комментариев'],  'котиков');
  replaceWord(['новостям',  'комметариям'],   'котикам');
  replaceWord(['новостями', 'комментариями'], 'котиками');
  replaceWord(['новостях',  'комментариях'],  'котиках');
}

chrome.runtime.sendMessage({ type: 'catsStatus' }, function (response) {
  console.log('Got response ' + JSON.stringify(response));
  if (response.catsStatus == 1) {
    replaceWordsWithCats();
    replaceImagesWithCats();
  }
  return;
});