chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === 'injectExtensionContent') {
    injectExtensionContent();
  }
});

function injectExtensionContent() {
  const videoContainer = document.querySelector('.html5-video-container');
  if (videoContainer) {
    const injectedDiv = document.createElement('div');

    // Create and append your extension components inside the injected div
    const component1 = document.createElement('p');
    component1.textContent = 'Component 1';
    injectedDiv.appendChild(component1);

    const component2 = document.createElement('p');
    component2.textContent = 'Component 2';
    injectedDiv.appendChild(component2);

    // Customize the injected div as desired
    injectedDiv.style.position = 'absolute';
    injectedDiv.style.top = '0';
    injectedDiv.style.right = '0';
    injectedDiv.style.width = '30%'; // Adjust the width of the extension column

    // Adjust the YouTube video position
    const playerContainer = document.querySelector('.html5-video-player');
    if (playerContainer) {
      playerContainer.style.position = 'relative';
      playerContainer.style.float = 'left';
      playerContainer.style.width = '70%'; // Adjust the width of the video container

      // Adjust the remaining YouTube video elements to fit within the new width
      const videoPlayer = playerContainer.querySelector('video');
      const videoAnnotations = playerContainer.querySelector('.annotation');
      const videoControls = playerContainer.querySelector('.ytp-chrome-bottom');

      if (videoPlayer) {
        videoPlayer.style.width = '100%';
        videoPlayer.style.height = '100%';
      }
      if (videoAnnotations) {
        videoAnnotations.style.width = '100%';
      }
      if (videoControls) {
        videoControls.style.width = '100%';
      }
    }

    // Inject the div to the right of the video container
    videoContainer.appendChild(injectedDiv);
  }
}

// Call the injectExtensionContent function immediately
injectExtensionContent();
