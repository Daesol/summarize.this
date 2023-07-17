// background.js

function getVideoId(tabUrl) {
  const url = new URL(tabUrl);
  return url.searchParams.get('v');
} 

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {

  if (request.action === 'getTranscript') {

    const videoId = getVideoId(sender.tab.url);

    fetchTranscript(videoId)
      .then(transcript => {
        sendResponse({transcript});
      })
      .catch(error => {
        // Handle error
      });

    return true; 
  }

});

function getVideoIdFromUrl(tabUrl) {
  // Parse video ID from URL  
}

async function fetchTranscript(videoId) {

  const response = await fetch('http://localhost:5000/transcript', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({videoId}) 
  });
  
  const data = await response.json();

  return data.transcript;

}