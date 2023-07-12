chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === 'fetchTranscript') {
    const videoLink = document.querySelector('link[rel="canonical"]').href;
    
    // Resolve the Promise with the video link
    return Promise.resolve({ videoLink });
  }
});
