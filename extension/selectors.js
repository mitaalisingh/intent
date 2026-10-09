// Every YouTube element Intent hides, in one place.
// YouTube changes its page structure often. When something stops being
// hidden, inspect the element in Chrome DevTools and update this list.
// Last checked: 2026-10-09.

const HIDE_SELECTORS = {
  shorts: [
    // Shorts shelf on the home page
    "ytd-rich-section-renderer:has(ytd-rich-shelf-renderer[is-shorts])",
    // Shorts shelf in search results and elsewhere
    "ytd-reel-shelf-renderer",
    "grid-shelf-view-model",
    // Single Shorts inside search results
    "ytd-video-renderer:has(a[href^='/shorts/'])",
    // Shorts link in the left menu (full and collapsed). Matches the English label only.
    "ytd-guide-entry-renderer:has(a[title='Shorts'])",
    "ytd-mini-guide-entry-renderer[aria-label='Shorts']",
    // Shorts tab on channel pages
    "yt-tab-shape[tab-title='Shorts']",
  ],

  homeFeed: [
    // The whole home page grid, including the topic chips above it
    "ytd-browse[page-subtype='home'] #primary",
  ],

  sidebar: [
    // "Up next" recommendations beside the video
    "ytd-watch-flexy #related",
  ],
};
