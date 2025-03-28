// Initialize extension when installed
chrome.runtime.onInstalled.addListener(() => {
  console.log('DevTools Enhancer extension installed');
  
  // Initialize default settings
  chrome.storage.sync.set({
    autoAnalyze: false
  });
});

// Listen for messages from content scripts
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === 'performanceResults') {
    // Store performance results in history
    savePerformanceHistory(message.data);
  }
  return true;
});

// Track when tabs are updated to trigger auto-analyze if enabled
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === 'complete') {
    chrome.storage.sync.get(['autoAnalyze'], (result) => {
      if (result.autoAnalyze) {
        chrome.tabs.sendMessage(tabId, { action: 'analyzePerformance' });
      }
    });
  }
});

// Helper function to save performance history
function savePerformanceHistory(data) {
  chrome.storage.local.get(['performanceHistory'], (result) => {
    const history = result.performanceHistory || [];
    
    // Add new result with timestamp
    history.push({
      ...data,
      timestamp: new Date().toISOString()
    });
    
    // Keep only the most recent 20 results
    const trimmedHistory = history.slice(-20);
    
    chrome.storage.local.set({ performanceHistory: trimmedHistory });
  });
}
