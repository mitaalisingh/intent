// Runs on every YouTube page. Hides the hooks listed in selectors.js,
// as much as the chosen level (levels.js) asks for.
// While an intent session is running (see prompt.js), YouTube follows it:
// the home page opens the search for your intent, and the results stay short.

let currentLevel = DEFAULT_LEVEL;
let session = { intent: "", active: false };

// Is a session running with an intent?
function sessionOn() {
  return session.active && session.intent !== "";
}

// 1. Build the CSS for a level.
// A stylesheet keeps working when YouTube adds new things to the page.
function buildCss(level) {
  const { homeVideos, sidebarVideos } = LEVELS[level];
  const hide = [...SELECTORS.shorts];

  if (homeVideos === 0) {
    hide.push(SELECTORS.homeFeed);
  } else {
    hide.push(...SELECTORS.homeExtras);
  }

  if (sidebarVideos === 0) {
    hide.push(SELECTORS.sidebar);
  } else {
    hide.push(...SELECTORS.sidebarExtras);
  }

  // Ads, carousels and "load more" in the search results, during a session
  if (sessionOn()) hide.push(...SELECTORS.searchExtras);

  // Videos marked by trimFeeds() below
  hide.push("[data-intent-hidden]");

  let css = `${hide.join(",\n")} { display: none !important; }`;

  // A clear end to the home page, so it doesn't feel broken
  if (homeVideos > 0) {
    css += `
      ${SELECTORS.homeGrid}::after {
        content: "That's all for now. Search for what you came for.";
        grid-column: 1 / -1;
        text-align: center;
        padding: 48px 0;
        font-size: 18px;
        color: var(--yt-spec-text-secondary, #606060);
      }`;
  }

  // The same clear end under the search results
  if (sessionOn()) {
    css += `
      ${SELECTORS.searchList}::after {
        content: "That's all for now. Search for what you came for.";
        display: block;
        text-align: center;
        padding: 48px 0;
        font-size: 18px;
        color: var(--yt-spec-text-secondary, #606060);
      }`;
  }
  return css;
}

// 2. Put the CSS on the page, replacing the old one when the level changes.
function applyLevel(level) {
  currentLevel = LEVELS[level] ? level : DEFAULT_LEVEL;
  let style = document.getElementById("intent-hide");
  if (!style) {
    style = document.createElement("style");
    style.id = "intent-hide";
    document.documentElement.appendChild(style);
  }
  style.textContent = buildCss(currentLevel);
  trimFeeds();
}

// 3. Very short clips (under 1 minute) are Shorts in spirit.
// Read the time badge on the thumbnail, like "0:32" or "12:05".
function isShortClip(video) {
  for (const badge of video.querySelectorAll(SELECTORS.duration.join(","))) {
    const parts = badge.textContent.trim().split(":");
    if (parts.length === 2 && parts[0] === "0") return true;
  }
  return false;
}

// 4. Keep the first few videos, skipping short clips; hide everything else.
function trimList(selector, keep) {
  let shown = 0;
  for (const video of document.querySelectorAll(selector)) {
    // Skip a match that sits inside another match, so nothing is counted twice
    if (video.parentElement.closest(selector)) continue;
    const hide = isShortClip(video) || shown >= keep;
    if (hide) {
      video.setAttribute("data-intent-hidden", "");
    } else {
      video.removeAttribute("data-intent-hidden");
      shown++;
    }
  }
}

function trimFeeds() {
  const { homeVideos, sidebarVideos, resultVideos } = LEVELS[currentLevel];
  if (homeVideos > 0) trimList(SELECTORS.homeVideo, homeVideos);
  if (sidebarVideos > 0) trimList(SELECTORS.sidebarVideo.join(","), sidebarVideos);
  // Each selector only matches on its own page, so this only trims search results
  if (sessionOn()) trimList(SELECTORS.searchVideo, resultVideos);
}

// 5. Autoplay off, always. If the switch is on, click it off.
// YouTube listens for clicks on the button around the switch, not the switch itself.
function turnOffAutoplay() {
  document.querySelector(SELECTORS.autoplayOn)?.closest("button")?.click();
}

// 6. Open Shorts as normal videos.
// If a Shorts link is opened from anywhere, show it on the normal video
// page instead of the endless swipe player.
function redirectShorts() {
  const match = location.pathname.match(/^\/shorts\/([^/?]+)/);
  if (match) {
    location.replace(`/watch?v=${match[1]}`);
  }
}

// 7. With a session running, the home page becomes the search for your intent.
function openIntentFeed() {
  if (!sessionOn() || location.pathname !== "/") return;
  location.replace(`/results?search_query=${encodeURIComponent(session.intent)}`);
}

// Start strict straight away, so the feed never flashes on screen,
// then switch to the saved level and session once storage answers.
applyLevel(DEFAULT_LEVEL);
chrome.storage.local
  .get({ level: DEFAULT_LEVEL, intent: "", active: false })
  .then((saved) => {
    session = { intent: saved.intent, active: saved.active };
    applyLevel(saved.level);
    openIntentFeed();
  });

// When the level or the intent changes (see prompt.js), update open YouTube tabs at once.
chrome.storage.onChanged.addListener((changes, area) => {
  if (area !== "local") return;
  if (changes.intent) session.intent = changes.intent.newValue ?? "";
  if (changes.active) session.active = changes.active.newValue ?? false;
  applyLevel(changes.level ? changes.level.newValue : currentLevel);
  openIntentFeed();
});

redirectShorts();

// YouTube changes pages without a full reload, so check again after each move.
document.addEventListener("yt-navigate-finish", () => {
  redirectShorts();
  openIntentFeed();
  trimFeeds();
});

// YouTube keeps adding videos and the player after the page loads.
// Watch for new elements, and re-check at most every 200 ms.
let pending = null;
new MutationObserver(() => {
  if (pending) return;
  pending = setTimeout(() => {
    pending = null;
    trimFeeds();
    turnOffAutoplay();
  }, 200);
}).observe(document.documentElement, { childList: true, subtree: true });
