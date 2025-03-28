
// Initialize popup functionality
document.addEventListener('DOMContentLoaded', () => {
  // Get references to buttons
  const colorPickerBtn = document.getElementById('colorPickerBtn');
  const performanceBtn = document.getElementById('performanceBtn');
  const debugBtn = document.getElementById('debugBtn');
  const autoAnalyzeCheckbox = document.getElementById('autoAnalyze');
  
  // Restore saved settings
  chrome.storage.sync.get(['autoAnalyze'], (result) => {
    autoAnalyzeCheckbox.checked = result.autoAnalyze || false;
  });
  
  // Save settings when changed
  autoAnalyzeCheckbox.addEventListener('change', () => {
    chrome.storage.sync.set({ autoAnalyze: autoAnalyzeCheckbox.checked });
  });
  
  // Color Picker Tool
  colorPickerBtn.addEventListener('click', () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.tabs.sendMessage(tabs[0].id, { action: 'activateColorPicker' });
    });
    window.close(); // Close popup after activating
  });
  
  // Performance Analyzer Tool
  performanceBtn.addEventListener('click', () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.tabs.sendMessage(tabs[0].id, { action: 'analyzePerformance' });
    });
  });
  
  // Debug Helper Tool
  debugBtn.addEventListener('click', () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.tabs.sendMessage(tabs[0].id, { action: 'activateDebugHelper' });
    });
  });
});
