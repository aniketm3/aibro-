// background.js - Chrome Extension Background Service Worker

chrome.runtime.onInstalled.addListener(() => {
    console.log("Extension Installed: Side Panel is ready.");
});

// Enable side panel when the extension is clicked
chrome.sidePanel.setPanelBehavior({ openPanelOnActionClick: true }).catch(console.error);
