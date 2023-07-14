// background.js

let contentScriptPort = null;

chrome.runtime.onConnect.addListener(function(port) {
  console.assert(port.name === "chatGPT");
  contentScriptPort = port;

  // Listening for disconnection
  contentScriptPort.onDisconnect.addListener(function() {
    contentScriptPort = null;
  });
});

// This will be fired when the extension icon is clicked
chrome.action.onClicked.addListener(function(tab) {
  if(contentScriptPort) {
    contentScriptPort.postMessage({action: "toggleSidebar"});
  }
});
