function xbmc_play(file) {
  var ver = localStorage['version'];
  var url = localStorage['xbmc_url'];
  if (!url || !ver) {
    alert("Please, configure extension first");
    chrome.tabs.create({url: chrome.extension.getURL('options.html')}, function(){});
    return;
  }
  var method = 'Player.Open';
  var params = {item: {file: file}};
  if (ver == 2) {
    method = 'XBMC.Play';
    params = {file: file};
  }
  json_rpc(url, method, params, function(data) {
    console.log('xbmc_play: ' + data);
  });
}

function getItem(url) {
  var m;
  if (m=url.match(/youtube\.com\/watch\?(?:v=([^&]*)|.*&v=([^&]*))/)) {
    return 'plugin://plugin.video.youtube/?action=play_video&videoid=' + (m[1]||m[2]);
  } else if (m=url.match(/vimeo\.com\/(\d+)$/)) {
    return 'plugin://plugin.video.vimeo/?action=play_video&videoid=' + m[1];
  } else if (m=url.match(/soundcloud\.com\/[^\/]+\/(.+)$/)) {
    return 'plugin://plugin.audio.soundcloud/?mode=15&url=track&permalink=' + m[1];
  }
}

function onClick(tab) {
  var item = getItem(tab.url);
  if (item) {
    xbmc_play(item);
  }
}
chrome.pageAction.onClicked.addListener(onClick);
chrome.webNavigation.onCommitted.addListener(function(e) {
  if (getItem(e.url)) {
    chrome.pageAction.show(e.tabId);
  }
}, {url: [{hostSuffix: 'youtube.com'},
          {hostSuffix: 'vimeo.com'},
          {hostSuffix: 'soundcloud.com'}]});