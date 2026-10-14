// The one dial. Each level says how much of YouTube's feed to show.
// Shorts are hidden at every level. The intent check will read the
// level too, to decide how often to remind.
// resultVideos is how many videos to keep in the search results while an
// intent session is running (see content.js).
// The numbers are a first guess; change them after using it.

const LEVELS = {
  soft: {
    label: "Soft",
    description: "A short list for your intent that ends, and a short sidebar.",
    homeVideos: 12,
    sidebarVideos: 5,
    resultVideos: 12,
  },
  medium: {
    label: "Medium",
    description: "A smaller list, and a very short sidebar.",
    homeVideos: 6,
    sidebarVideos: 3,
    resultVideos: 6,
  },
  hard: {
    label: "Hard",
    description: "Just a few videos for your intent, and no recommendations.",
    homeVideos: 0,
    sidebarVideos: 0,
    resultVideos: 3,
  },
};

const DEFAULT_LEVEL = "hard";
