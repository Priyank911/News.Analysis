
chrome.runtime.onInstalled.addListener(() => {
    console.log('News Credibility Checker installed!');
  });
  
  chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "fetchCredibilityScore") {
     
      let score = Math.random() * 100;
      sendResponse({ score: score.toFixed(2) });
    }
  });
  