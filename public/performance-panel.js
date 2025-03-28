
// Initialize panel
document.addEventListener('DOMContentLoaded', () => {
  // Load performance history
  loadPerformanceHistory();
  
  // Set up button handlers
  document.getElementById('clearHistory').addEventListener('click', clearHistory);
  document.getElementById('exportData').addEventListener('click', exportData);
});

function loadPerformanceHistory() {
  chrome.storage.local.get(['performanceHistory'], (result) => {
    const historyContainer = document.getElementById('historyContainer');
    const history = result.performanceHistory || [];
    
    if (history.length === 0) {
      historyContainer.innerHTML = `
        <div class="no-data">No performance data available yet. Analyze some pages first.</div>
      `;
      return;
    }
    
    // Clear the container
    historyContainer.innerHTML = '';
    
    // Sort history by timestamp (newest first)
    history.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
    
    // Add each history item
    history.forEach(item => {
      const date = new Date(item.timestamp);
      const formattedDate = date.toLocaleString();
      
      const historyItem = document.createElement('div');
      historyItem.className = 'history-item';
      
      historyItem.innerHTML = `
        <h2>${new URL(item.url).hostname}</h2>
        <div class="history-item-date">${formattedDate}</div>
        <div class="metric">
          <span>Total Load Time:</span>
          <span>${(item.loadTime / 1000).toFixed(2)}s</span>
        </div>
        <div class="resources">
          <h3>Slowest Resources:</h3>
          ${item.slowestResources.map(res => `
            <div class="resource">
              <div>${res.name.split('/').pop()}</div>
              <div>${(res.duration / 1000).toFixed(2)}s</div>
            </div>
          `).join('')}
        </div>
      `;
      
      historyContainer.appendChild(historyItem);
    });
  });
}

function clearHistory() {
  if (confirm('Are you sure you want to clear all performance history?')) {
    chrome.storage.local.remove(['performanceHistory'], () => {
      loadPerformanceHistory();
    });
  }
}

function exportData() {
  chrome.storage.local.get(['performanceHistory'], (result) => {
    const history = result.performanceHistory || [];
    
    if (history.length === 0) {
      alert('No performance data available to export.');
      return;
    }
    
    // Create a JSON blob
    const blob = new Blob([JSON.stringify(history, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    
    // Create a download link
    const a = document.createElement('a');
    a.href = url;
    a.download = `performance-history-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    
    // Clean up
    URL.revokeObjectURL(url);
  });
}
