chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === 'showExtensionContent') {
    showExtensionContent();
  }
});

function showExtensionContent() {
  const extensionContainer = document.createElement('div');
  extensionContainer.id = 'extensionContainer';
  extensionContainer.style.position = 'fixed';
  extensionContainer.style.top = '0';
  extensionContainer.style.right = '-20%'; // Start hidden outside the screen
  extensionContainer.style.width = '20%';
  extensionContainer.style.height = '100%';
  extensionContainer.style.backgroundColor = '#f2f2f2';
  extensionContainer.style.transition = 'right 0.5s ease'; // Add smooth sliding animation

  // Create and append your extension components inside the container
  const component1 = document.createElement('p');
  component1.textContent = 'Component 1';
  extensionContainer.appendChild(component1);

  const component2 = document.createElement('p');
  component2.textContent = 'Component 2';
  extensionContainer.appendChild(component2);

  document.body.appendChild(extensionContainer);

  // Slide in the extension content after a slight delay
  setTimeout(() => {
    extensionContainer.style.right = '0';
  }, 500);
}
