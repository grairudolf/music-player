
// Initialize panel functionality
document.addEventListener('DOMContentLoaded', () => {
  // DOM Inspector tools
  document.getElementById('inspectDOM').addEventListener('click', () => {
    chrome.devtools.inspectedWindow.eval(`
      (function() {
        const domInfo = {
          elements: document.querySelectorAll('*').length,
          depth: getMaxDOMDepth(),
          heaviestBranch: findHeaviestDOMBranch()
        };
        
        function getMaxDOMDepth() {
          let maxDepth = 0;
          
          function checkDepth(element, depth) {
            if (depth > maxDepth) maxDepth = depth;
            for (let i = 0; i < element.children.length; i++) {
              checkDepth(element.children[i], depth + 1);
            }
          }
          
          checkDepth(document.documentElement, 1);
          return maxDepth;
        }
        
        function findHeaviestDOMBranch() {
          let heaviestElement = null;
          let maxDescendants = 0;
          
          function countDescendants(element) {
            let count = 0;
            for (let i = 0; i < element.children.length; i++) {
              count += 1 + countDescendants(element.children[i]);
            }
            return count;
          }
          
          const allElements = document.querySelectorAll('*');
          for (let i = 0; i < allElements.length; i++) {
            const descendants = countDescendants(allElements[i]);
            if (descendants > maxDescendants) {
              maxDescendants = descendants;
              heaviestElement = allElements[i];
            }
          }
          
          return {
            element: heaviestElement ? heaviestElement.tagName + (heaviestElement.id ? '#' + heaviestElement.id : '') : null,
            descendants: maxDescendants
          };
        }
        
        return domInfo;
      })();
    `, (result, isException) => {
      const resultsElement = document.getElementById('domResults');
      resultsElement.style.display = 'block';
      
      if (isException) {
        resultsElement.textContent = `Error: ${isException}`;
      } else {
        resultsElement.innerHTML = `
          <div><strong>Total Elements:</strong> ${result.elements}</div>
          <div><strong>Maximum DOM Depth:</strong> ${result.depth} levels</div>
          <div><strong>Heaviest DOM Branch:</strong> ${result.heaviestBranch.element} (${result.heaviestBranch.descendants} descendants)</div>
        `;
      }
    });
  });
  
  document.getElementById('findDuplicateIDs').addEventListener('click', () => {
    chrome.devtools.inspectedWindow.eval(`
      (function() {
        const ids = {};
        const duplicates = [];
        
        document.querySelectorAll('[id]').forEach(el => {
          const id = el.id;
          if (!ids[id]) {
            ids[id] = 1;
          } else {
            if (ids[id] === 1) {
              duplicates.push(id);
            }
            ids[id]++;
          }
        });
        
        return {
          duplicateIds: duplicates,
          counts: duplicates.map(id => ({
            id,
            count: ids[id]
          }))
        };
      })();
    `, (result, isException) => {
      const resultsElement = document.getElementById('domResults');
      resultsElement.style.display = 'block';
      
      if (isException) {
        resultsElement.textContent = `Error: ${isException}`;
      } else if (result.duplicateIds.length === 0) {
        resultsElement.innerHTML = `<div>No duplicate IDs found.</div>`;
      } else {
        let html = `<div><strong>Duplicate IDs Found:</strong></div><ul>`;
        result.counts.forEach(item => {
          html += `<li>ID "${item.id}" is used ${item.count} times</li>`;
        });
        html += `</ul>`;
        resultsElement.innerHTML = html;
      }
    });
  });
  
  // CSS Analyzer tools
  document.getElementById('findUnusedCSS').addEventListener('click', () => {
    chrome.devtools.inspectedWindow.eval(`
      (function() {
        const styleSheets = Array.from(document.styleSheets);
        const unusedSelectors = [];
        
        try {
          styleSheets.forEach(sheet => {
            try {
              // Only process same-origin stylesheets
              if (sheet.href && !sheet.href.startsWith(window.location.origin)) return;
              
              const rules = Array.from(sheet.cssRules || []);
              rules.forEach(rule => {
                if (rule.type === 1) { // CSSStyleRule
                  try {
                    const selector = rule.selectorText;
                    if (selector && !selector.includes(':') && !selector.includes('*')) {
                      try {
                        const elements = document.querySelectorAll(selector);
                        if (elements.length === 0) {
                          unusedSelectors.push(selector);
                        }
                      } catch (e) {
                        // Invalid selector, skip
                      }
                    }
                  } catch (e) {
                    // Can't access rule, skip
                  }
                }
              });
            } catch (e) {
              // Can't access sheet, skip
            }
          });
        } catch (e) {
          // General error
        }
        
        return {
          unusedSelectors: unusedSelectors.slice(0, 20), // Limit to first 20
          totalUnused: unusedSelectors.length
        };
      })();
    `, (result, isException) => {
      const resultsElement = document.getElementById('cssResults');
      resultsElement.style.display = 'block';
      
      if (isException) {
        resultsElement.textContent = `Error: ${isException}`;
      } else if (result.unusedSelectors.length === 0) {
        resultsElement.innerHTML = `<div>No unused CSS selectors found (that could be safely detected).</div>`;
      } else {
        let html = `<div><strong>Unused CSS Selectors Found:</strong> ${result.totalUnused} total</div><ul>`;
        result.unusedSelectors.forEach(selector => {
          html += `<li>${selector}</li>`;
        });
        if (result.totalUnused > 20) {
          html += `<li>... and ${result.totalUnused - 20} more</li>`;
        }
        html += `</ul>`;
        resultsElement.innerHTML = html;
      }
    });
  });
  
  // JavaScript Tools
  document.getElementById('findEventListeners').addEventListener('click', () => {
    chrome.devtools.inspectedWindow.eval(`
      (function() {
        const listenerCount = {
          click: 0,
          keydown: 0,
          keyup: 0,
          mouseover: 0,
          scroll: 0,
          resize: 0,
          other: 0
        };
        
        // This is an approximation since we can't access all listeners
        // We'll use the getEventListeners function available in DevTools
        if (typeof getEventListeners === 'function') {
          // Check window listeners
          const windowListeners = getEventListeners(window);
          Object.keys(windowListeners).forEach(eventType => {
            if (listenerCount[eventType] !== undefined) {
              listenerCount[eventType] += windowListeners[eventType].length;
            } else {
              listenerCount.other += windowListeners[eventType].length;
            }
          });
          
          // Check document listeners
          const documentListeners = getEventListeners(document);
          Object.keys(documentListeners).forEach(eventType => {
            if (listenerCount[eventType] !== undefined) {
              listenerCount[eventType] += documentListeners[eventType].length;
            } else {
              listenerCount.other += documentListeners[eventType].length;
            }
          });
          
          // Get body listeners
          const bodyListeners = getEventListeners(document.body);
          Object.keys(bodyListeners).forEach(eventType => {
            if (listenerCount[eventType] !== undefined) {
              listenerCount[eventType] += bodyListeners[eventType].length;
            } else {
              listenerCount.other += bodyListeners[eventType].length;
            }
          });
        }
        
        return {
          listenerCount,
          note: typeof getEventListeners !== 'function' ? 
            "Full listener detection only available in Chrome DevTools console" : ""
        };
      })();
    `, (result, isException) => {
      const resultsElement = document.getElementById('jsResults');
      resultsElement.style.display = 'block';
      
      if (isException) {
        resultsElement.textContent = `Error: ${isException}`;
      } else {
        let html = `<div><strong>Event Listeners Detection:</strong></div>`;
        
        if (result.note) {
          html += `<div><em>${result.note}</em></div>`;
        }
        
        html += `<ul>`;
        Object.entries(result.listenerCount).forEach(([event, count]) => {
          html += `<li>${event}: ${count}</li>`;
        });
        html += `</ul>`;
        
        resultsElement.innerHTML = html;
      }
    });
  });
  
  // Set up other button handlers for remaining tools
  document.getElementById('analyzeCSSSpecificity').addEventListener('click', () => {
    // Implementation for CSS specificity analysis
    const resultsElement = document.getElementById('cssResults');
    resultsElement.style.display = 'block';
    resultsElement.innerHTML = `<div>CSS Specificity Analysis is running...</div>`;
    
    // This would require more complex implementation
  });
  
  document.getElementById('analyzeMemoryUsage').addEventListener('click', () => {
    chrome.devtools.inspectedWindow.eval(`
      (function() {
        if (window.performance && window.performance.memory) {
          return {
            jsHeapSizeLimit: window.performance.memory.jsHeapSizeLimit,
            totalJSHeapSize: window.performance.memory.totalJSHeapSize,
            usedJSHeapSize: window.performance.memory.usedJSHeapSize
          };
        } else {
          return { error: "Memory API not available in this browser" };
        }
      })();
    `, (result, isException) => {
      const resultsElement = document.getElementById('jsResults');
      resultsElement.style.display = 'block';
      
      if (isException) {
        resultsElement.textContent = `Error: ${isException}`;
      } else if (result.error) {
        resultsElement.innerHTML = `<div>${result.error}</div>`;
      } else {
        const usedMB = (result.usedJSHeapSize / (1024 * 1024)).toFixed(2);
        const totalMB = (result.totalJSHeapSize / (1024 * 1024)).toFixed(2);
        const limitMB = (result.jsHeapSizeLimit / (1024 * 1024)).toFixed(2);
        
        resultsElement.innerHTML = `
          <div><strong>Memory Usage:</strong></div>
          <div>Used JS Heap: ${usedMB} MB</div>
          <div>Total JS Heap: ${totalMB} MB</div>
          <div>JS Heap Limit: ${limitMB} MB</div>
          <div>Utilization: ${((result.usedJSHeapSize / result.jsHeapSizeLimit) * 100).toFixed(2)}%</div>
        `;
      }
    });
  });
});
