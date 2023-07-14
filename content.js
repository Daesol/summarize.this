// content.js

function injectSidebar() {
  let div = document.createElement('div');
  div.id = 'my-extension-root';
  div.textContent = "This is the injected sidebar by the extension!";
  document.body.appendChild(div);

  // Create new style Element
  let style = document.createElement('style');

  // Fetching our CSS file and adding it to our style element
  fetch(chrome.runtime.getURL('styles.css'))
    .then(response => response.text())
    .then(data => {
        style.innerHTML = data;
        document.head.appendChild(style);
    });
}

function adjustVideoPlayer() {
  const videoPlayer = document.querySelector('.html5-video-player.yt-player-flex');
  const videoContainer = document.querySelector('#player.ytd-watch-flexy'); // Example selector
  if (videoPlayer && videoContainer) {
    videoPlayer.style.flex = '0 1 calc(100% - 400px)'; // adjust video size
    videoContainer.style.maxWidth = 'calc(100% - 400px)'; // adjust video container size
    return true;
  } else {
    return false;
  }
}

// Inject sidebar immediately
injectSidebar();

// Check every 500ms if the video player is loaded
const intervalId = setInterval(() => {
  if (adjustVideoPlayer()) {
    clearInterval(intervalId);
  }
}, 500);
