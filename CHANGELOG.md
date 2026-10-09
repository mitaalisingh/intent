# Changelog

## 0.2.0 — The level dial
- Popup with one dial: Soft / Medium / Hard. Click the Intent icon to choose.
- Soft: first 12 home videos, then a clear end ("That's all for now"); 5 sidebar videos.
- Medium: 6 home videos; 3 sidebar videos.
- Hard: empty home, no sidebar (same as 0.1.0). This is the default.
- Topic chips, home shelves and endless scrolling are off at Soft and Medium.
- Changing the level updates open YouTube tabs at once.
- Shorts stay hidden at every level.
- Clips under 1 minute are hidden in the home feed and sidebar (not in search).
- Autoplay is switched off on every video.
- Fix: Shorts link in the collapsed left menu is now hidden.

## 0.1.0 — M1: Hide the hooks (in progress)
- Chrome extension (Manifest V3) in `extension/`.
- Hides Shorts: home shelf, search results, left menu, channel tab.
- Opens Shorts links as normal videos instead of the swipe player.
- Hides the home feed (empty home page, search only).
- Hides sidebar recommendations on the video page.
- All hidden elements are listed in `extension/selectors.js`.
