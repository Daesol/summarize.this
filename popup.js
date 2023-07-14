(function() {
    console.log('Injected script running.');
  
    chrome.runtime.sendMessage({message: 'fetchUrl'}, function(response) {
      console.log('URL of current tab:', response.url);
  
      // Ensure the URL is a YouTube video URL
      if (response.url.includes('youtube.com/watch?v=')) {
        fetchTranscript(response.url);
      } else {
        displayError('Current tab is not a YouTube video.');
      }
    });
  
    const fetchTranscript = (videoLink) => {
      console.log('Fetching transcript for video link:', videoLink);
  
      const payload = JSON.stringify({ videoLink });
      console.log('Payload for server:', payload);
  
      fetch('http://127.0.0.1:5000/transcript', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: payload
      })
      .then((response) => {
          console.log('Response from server received:', response);
          console.log('Response status:', response.status);
          if (response.ok) {
              return response.json();
          } else {
              throw new Error('Failed to fetch transcript.');
          }
      })
      .then((data) => {
          console.log('Transcript data received:', data);
          if (data && data.transcript) {
              updateTranscript(data.transcript);
          } else if (data && data.error) {
              displayError(data.error);
          } else {
              checkAutoGeneratedCaption(videoLink);
          }
      })
      .catch((error) => {
          console.log('Fetch error:', error);
          displayError(error.message);
      });
    };
  
    const updateTranscript = (transcript) => {
      console.log('Updating transcript:', transcript);
      const transcriptElement = document.querySelector('#transcript');
      transcriptElement.value = transcript;
    };
  
    const displayError = (message) => {
      console.log('Displaying error:', message);
      const transcriptElement = document.querySelector('#transcript');
      transcriptElement.value = message;
    };
  
    const copyTranscript = () => {
      console.log('Copying transcript.');
      const transcriptElement = document.querySelector('#transcript');
      const copyBtn = document.querySelector('#copyBtn');
  
      // New Clipboard API
      navigator.clipboard.writeText(transcriptElement.value)
      .then(() => {
          console.log('Transcript copied to clipboard.');
          copyBtn.innerText = "Copied!";
      })
      .catch(err => {
          console.error('Could not copy text: ', err);
      });
    };
  
    document.querySelector('#copyBtn').addEventListener('click', copyTranscript);
  }());
  