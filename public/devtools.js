
// Create DevTools panel
chrome.devtools.panels.create(
  "DevTools Enhancer",
  null,
  "devtools-panel.html",
  (panel) => {
    console.log("DevTools panel created");
  }
);

// Create a panel for the Performance Analyzer
chrome.devtools.panels.create(
  "Performance History",
  null,
  "performance-panel.html",
  (panel) => {
    console.log("Performance panel created");
  }
);
