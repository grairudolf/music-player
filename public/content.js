
// Initialize variables
let isColorPickerActive = false;
let originalCursor = null;

// Listen for messages from popup or background script
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === 'activateColorPicker') {
    toggleColorPicker();
  } else if (message.action === 'analyzePerformance') {
    analyzePagePerformance();
  } else if (message.action === 'activateDebugHelper') {
    activateDebugHelper();
  }
  return true;
});

// Color Picker Tool Functionality
function toggleColorPicker() {
  if (isColorPickerActive) {
    deactivateColorPicker();
  } else {
    activateColorPicker();
  }
}

function activateColorPicker() {
  isColorPickerActive = true;
  originalCursor = document.body.style.cursor;
  document.body.style.cursor = 'crosshair';
  
  document.addEventListener('click', handleColorPickerClick);
  document.addEventListener('keydown', handleColorPickerEscape);
  
  // Show a notification to the user
  const notification = document.createElement('div');
  notification.id = 'devtools-enhancer-notification';
  notification.textContent = 'Color picker active. Click on any element to copy its color. Press ESC to cancel.';
  notification.style.cssText = `
    position: fixed;
    top: 10px;
    right: 10px;
    background-color: #3498db;
    color: white;
    padding: 10px;
    border-radius: 5px;
    z-index: 10000;
    font-family: sans-serif;
    font-size: 14px;
    box-shadow: 0 2px 10px rgba(0,0,0,0.2);
  `;
  document.body.appendChild(notification);
}

function deactivateColorPicker() {
  isColorPickerActive = false;
  document.body.style.cursor = originalCursor;
  
  document.removeEventListener('click', handleColorPickerClick);
  document.removeEventListener('keydown', handleColorPickerEscape);
  
  const notification = document.getElementById('devtools-enhancer-notification');
  if (notification) {
    notification.remove();
  }
}

function handleColorPickerClick(event) {
  if (!isColorPickerActive) return;
  
  event.preventDefault();
  event.stopPropagation();
  
  const elementStyle = window.getComputedStyle(event.target);
  const backgroundColor = elementStyle.backgroundColor;
  const color = elementStyle.color;
  
  // Copy to clipboard
  navigator.clipboard.writeText(backgroundColor)
    .then(() => {
      showCopiedNotification(backgroundColor);
    })
    .catch(err => {
      console.error('Failed to copy: ', err);
    });
  
  deactivateColorPicker();
}

function handleColorPickerEscape(event) {
  if (event.key === 'Escape' && isColorPickerActive) {
    deactivateColorPicker();
  }
}

function showCopiedNotification(color) {
  const notification = document.createElement('div');
  notification.textContent = `Copied: ${color}`;
  notification.style.cssText = `
    position: fixed;
    bottom: 10px;
    right: 10px;
    background-color: #2ecc71;
    color: white;
    padding: 10px;
    border-radius: 5px;
    z-index: 10000;
    font-family: sans-serif;
    font-size: 14px;
    box-shadow: 0 2px 10px rgba(0,0,0,0.2);
  `;
  document.body.appendChild(notification);
  
  setTimeout(() => {
    notification.remove();
  }, 3000);
}

// Performance Analyzer Tool Functionality
function analyzePagePerformance() {
  console.log('Analyzing page performance...');
  
  // Get performance metrics
  const performanceEntries = performance.getEntriesByType('navigation')[0];
  const resources = performance.getEntriesByType('resource');
  
  // Calculate total page load time
  const loadTime = performanceEntries.loadEventEnd - performanceEntries.startTime;
  
  // Find slowest resources
  const sortedResources = [...resources].sort((a, b) => b.duration - a.duration);
  const slowestResources = sortedResources.slice(0, 5);
  
  // Display results in an overlay
  const resultsHTML = `
    <div id="performance-results">
      <h2>Performance Analysis</h2>
      <div class="metric">
        <span>Total Load Time:</span>
        <span>${(loadTime / 1000).toFixed(2)}s</span>
      </div>
      <h3>Slowest Resources:</h3>
      <ul>
        ${slowestResources.map(res => `
          <li>
            <div>${res.name.split('/').pop()}</div>
            <div>${(res.duration / 1000).toFixed(2)}s</div>
          </li>
        `).join('')}
      </ul>
      <button id="close-performance">Close</button>
    </div>
  `;
  
  const overlayStyles = `
    #performance-overlay {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.7);
      z-index: 10000;
      display: flex;
      justify-content: center;
      align-items: center;
      font-family: sans-serif;
    }
    
    #performance-results {
      background-color: white;
      padding: 20px;
      border-radius: 8px;
      max-width: 600px;
      width: 80%;
    }
    
    #performance-results h2 {
      margin-top: 0;
      color: #2c3e50;
    }
    
    #performance-results h3 {
      color: #34495e;
    }
    
    .metric {
      display: flex;
      justify-content: space-between;
      padding: 8px 0;
      border-bottom: 1px solid #ecf0f1;
    }
    
    #performance-results ul {
      list-style: none;
      padding: 0;
    }
    
    #performance-results li {
      display: flex;
      justify-content: space-between;
      padding: 8px 0;
      border-bottom: 1px solid #ecf0f1;
    }
    
    #close-performance {
      background-color: #3498db;
      color: white;
      border: none;
      padding: 8px 16px;
      border-radius: 4px;
      margin-top: 16px;
      cursor: pointer;
    }
    
    #close-performance:hover {
      background-color: #2980b9;
    }
  `;
  
  const overlay = document.createElement('div');
  overlay.id = 'performance-overlay';
  
  const style = document.createElement('style');
  style.textContent = overlayStyles;
  
  overlay.innerHTML = resultsHTML;
  document.body.appendChild(style);
  document.body.appendChild(overlay);
  
  // Add event listener to close button
  document.getElementById('close-performance').addEventListener('click', () => {
    overlay.remove();
    style.remove();
  });
  
  // Send results to extension for potential storage
  chrome.runtime.sendMessage({
    action: 'performanceResults',
    data: {
      url: window.location.href,
      loadTime,
      slowestResources: slowestResources.map(res => ({
        name: res.name,
        duration: res.duration
      }))
    }
  });
}

// Debug Helper Tool Functionality
function activateDebugHelper() {
  console.log('Activating debug helper...');
  
  // Create styles for element highlighting
  const highlightStyles = document.createElement('style');
  highlightStyles.id = 'debug-helper-styles';
  highlightStyles.textContent = `
    .debug-highlight {
      outline: 2px solid red !important;
      background-color: rgba(255, 0, 0, 0.1) !important;
    }
    
    .debug-helper-inspector {
      position: fixed;
      bottom: 0;
      right: 0;
      background-color: #2c3e50;
      color: white;
      padding: 10px;
      z-index: 10000;
      font-family: monospace;
      font-size: 12px;
      width: 300px;
      max-height: 300px;
      overflow: auto;
      box-shadow: 0 0 10px rgba(0,0,0,0.5);
    }
    
    .debug-helper-close {
      position: absolute;
      top: 5px;
      right: 5px;
      background: none;
      border: none;
      color: white;
      cursor: pointer;
      font-size: 16px;
    }
  `;
  document.head.appendChild(highlightStyles);
  
  // Create inspector panel
  const inspector = document.createElement('div');
  inspector.className = 'debug-helper-inspector';
  inspector.innerHTML = `
    <button class="debug-helper-close">&times;</button>
    <h3>Debug Helper</h3>
    <p>Hover over elements to inspect</p>
    <div id="element-info"></div>
  `;
  document.body.appendChild(inspector);
  
  // Add event listeners
  document.addEventListener('mouseover', handleDebugMouseOver);
  document.addEventListener('mouseout', handleDebugMouseOut);
  
  // Close button handler
  document.querySelector('.debug-helper-close').addEventListener('click', deactivateDebugHelper);
}

function handleDebugMouseOver(event) {
  const target = event.target;
  target.classList.add('debug-highlight');
  
  // Get element info
  const styles = window.getComputedStyle(target);
  const rect = target.getBoundingClientRect();
  
  // Display info in inspector
  const elementInfo = document.getElementById('element-info');
  elementInfo.innerHTML = `
    <div><strong>Tag:</strong> ${target.tagName.toLowerCase()}</div>
    <div><strong>Class:</strong> ${target.className.replace('debug-highlight', '')}</div>
    <div><strong>ID:</strong> ${target.id || 'none'}</div>
    <div><strong>Size:</strong> ${Math.round(rect.width)}px × ${Math.round(rect.height)}px</div>
    <div><strong>Position:</strong> ${Math.round(rect.left)}px, ${Math.round(rect.top)}px</div>
    <div><strong>z-index:</strong> ${styles.zIndex}</div>
    <div><strong>Display:</strong> ${styles.display}</div>
    <div><strong>Position:</strong> ${styles.position}</div>
    <div><strong>Color:</strong> ${styles.color}</div>
    <div><strong>Background:</strong> ${styles.backgroundColor}</div>
  `;
}

function handleDebugMouseOut(event) {
  event.target.classList.remove('debug-highlight');
}

function deactivateDebugHelper() {
  // Remove event listeners
  document.removeEventListener('mouseover', handleDebugMouseOver);
  document.removeEventListener('mouseout', handleDebugMouseOut);
  
  // Remove styles and inspector
  const styles = document.getElementById('debug-helper-styles');
  if (styles) styles.remove();
  
  const inspector = document.querySelector('.debug-helper-inspector');
  if (inspector) inspector.remove();
  
  // Remove highlight from any elements
  document.querySelectorAll('.debug-highlight').forEach(el => {
    el.classList.remove('debug-highlight');
  });
}
