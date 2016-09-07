function replaceImageWithCat(image) {
  var width = image.width;
  var height = image.height;
  if (image.className.indexOf('replaced-with-cat') === -1) {
    if (width > 100 || height > 100) {
      if (width / height < 2 && height / width < 2) {
        image.src = 'http://placekitten.com/' + width + '/' + height;
        image.className += ' replaced-with-cat';
      }
    }
  }
}

function replaceImagesWithCats() {
  var images = document.getElementsByTagName('img');
  for (var i = 0; i < images.length; i++) {
    replaceImageWithCat(images[i]);
  }
}

function putSpanTagAround(str) {
  return '<span class=\'replaced-with-cat\'>' + str + '</span>';
}

function replaceWord(words, newWord) {
  for (var i = 0; i < words.length; i++) {
    var word = words[i];
    var re = new RegExp(word, 'g');
    var taggedNewWord = putSpanTagAround(newWord);
    document.body.innerHTML = document.body.innerHTML.replace(re, taggedNewWord);
  }
}

function replaceWordsWithCats() {
  replaceWord(['новости', 'комментарии'], 'котики');
  replaceWord(['новостей', 'комментариев'], 'котиков');
  replaceWord(['новостям', 'комметариям'], 'котикам');
  replaceWord(['новостями', 'комментариями'], 'котиками');
  replaceWord(['новостях', 'комментариях'], 'котиках');
}

var observer = new MutationObserver(function (mutations, observer) {
  mutations.forEach(function (mutation) {
    if (mutation.target.tagName.toUpperCase() === 'IMG') {
      console.dir(mutation);
      doIfExtensionIsOn(function () {
        replaceImageWithCat(mutation.target);
        //replaceWordsWithCats();
      });
    }
  });
});

observer.observe(document, {
  subtree: true,
  attributes: true
});

function doIfExtensionIsOn(callback) {
  chrome.runtime.sendMessage({ type: 'catsStatus' }, function (response) {
    console.log('Got response ' + JSON.stringify(response));
    if (response.catsStatus == 1) {
      callback();
    }
    return;
  });
}

doIfExtensionIsOn(function () {
  replaceWordsWithCats();
  replaceImagesWithCats();
});