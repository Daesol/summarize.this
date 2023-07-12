chrome.action.onClicked.addListener((tab) => {
  chrome.tabs.executeScript(tab.id, { file: 'content.js' }, () => {
    chrome.tabs.sendMessage(tab.id, { action: 'fetchTranscript' }).then((response) => {
      console.log('Response received:', response);
      if (chrome.runtime.lastError) {
        displayError('Failed to fetch transcript. Please try again.');
        return;
      }
      if (response && response.videoLink) {
        fetchTranscript(response.videoLink);
      } else {
        displayError('Failed to fetch transcript. Please try again.');
      }
    });
  });
});
