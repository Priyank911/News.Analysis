
document.getElementById('check-news').addEventListener('click', () => {
    console.log('Check News Now button clicked');
    
    chrome.runtime.sendMessage({ action: "fetchCredibilityScore" }, (response) => {
      console.log('Received response from background.js:', response);
      if (response) {
        document.getElementById('result').innerText = `Credibility Score: ${response.score}`;
      } else {
        document.getElementById('result').innerText = 'Error: No response received';
      }
    });
  });
  