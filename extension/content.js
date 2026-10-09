// Runs on every YouTube page. Hides the hooks listed in selectors.js.

// 1. Hide elements with CSS.
// A stylesheet keeps working when YouTube adds new videos to the page,
// so we don't need to search the page again and again.
function addHidingStyles() {
  const allSelectors = Object.values(HIDE_SELECTORS).flat();
  const style = document.createElement("style");
  style.id = "intent-hide";
  style.textContent = `${allSelectors.join(",\n")} { display: none !important; }`;
  document.documentElement.appendChild(style);
}

// 2. Open Shorts as normal videos.
// If a Shorts link is opened from anywhere, show it on the normal video
// page instead of the endless swipe player.
function redirectShorts() {
  const match = location.pathname.match(/^\/shorts\/([^/?]+)/);
  if (match) {
    location.replace(`/watch?v=${match[1]}`);
  }
}

addHidingStyles();
redirectShorts();

// YouTube changes pages without a full reload, so check again after each move.
document.addEventListener("yt-navigate-finish", redirectShorts);
