// Every YouTube element Intent hides, in one place.
// YouTube changes its page structure often. When something stops being
// hidden, inspect the element in Chrome DevTools and update this list.
// Last checked: 2026-10-09.

const SELECTORS = {
  // Hidden at every level
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
    "ytd-guide-entry-renderer:has(a[href^='/shorts'])",
    "ytd-mini-guide-entry-renderer[aria-label='Shorts']",
    "ytd-mini-guide-entry-renderer:has([title='Shorts'])",
    "ytd-mini-guide-entry-renderer:has(a[href^='/shorts'])",
    // Shorts tab on channel pages
    "yt-tab-shape[tab-title='Shorts']",
  ],

  // Home page
  homeFeed: "ytd-browse[page-subtype='home'] #primary",
  homeGrid: "ytd-browse[page-subtype='home'] ytd-rich-grid-renderer #contents",
  homeVideo: "ytd-browse[page-subtype='home'] ytd-rich-item-renderer",
  homeExtras: [
    // Topic chips ("All", "Music", ...) each open another endless feed
    "ytd-browse[page-subtype='home'] ytd-feed-filter-chip-bar-renderer",
    // Shelves like "Breaking news" or "Trending"
    "ytd-browse[page-subtype='home'] ytd-rich-section-renderer",
    // The spinner that loads more videos when you scroll to the bottom
    "ytd-browse[page-subtype='home'] ytd-continuation-item-renderer",
  ],

  // "Up next" sidebar on the video page
  sidebar: "ytd-watch-flexy #related",
  sidebarVideo: [
    "ytd-watch-flexy #related ytd-compact-video-renderer",
    "ytd-watch-flexy #related yt-lockup-view-model",
  ],
  sidebarExtras: [
    // Topic chips above the sidebar
    "ytd-watch-flexy #related yt-related-chip-cloud-renderer",
    // The spinner that loads more
    "ytd-watch-flexy #related ytd-continuation-item-renderer",
  ],

  // The time badge on a thumbnail ("12:34"), used to find very short clips
  duration: ["badge-shape", "ytd-thumbnail-overlay-time-status-renderer"],

  // The autoplay switch in the video player, when it is on
  autoplayOn: ".ytp-autonav-toggle-button[aria-checked='true']",
};
