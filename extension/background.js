chrome.runtime.onInstalled.addListener(function() {
    chrome.contextMenus.create({
      "id": "autocase",
      "title": "Auto Generate Case",
      "contexts": ["all"]
    });
  });

  chrome.contextMenus.onClicked.addListener(function(info, tab) {
      chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.sendMessage(tab.id, {greeting: "hello"}, function(response) {
        });
      });


  });
