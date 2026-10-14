// Clicking the Intent icon in the toolbar opens the intent pop-up
// on the YouTube tab you are looking at (see prompt.js).
chrome.action.onClicked.addListener((tab) => {
  // On a page that is not YouTube there is nobody listening, so ignore the error.
  chrome.tabs.sendMessage(tab.id, { type: "intent-open" }).catch(() => {});
});
