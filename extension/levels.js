// The one dial. Each level says how much of YouTube's feed to show.
// Shorts are hidden at every level. The intent check will read the
// level too, to decide how often to remind.
// The numbers are a first guess; change them after using it.

const LEVELS = {
  soft: {
    label: "Soft",
    description: "A short home page that ends, and a short sidebar.",
    homeVideos: 12,
    sidebarVideos: 5,
  },
  medium: {
    label: "Medium",
    description: "A smaller home page, and a very short sidebar.",
    homeVideos: 6,
    sidebarVideos: 3,
  },
  hard: {
    label: "Hard",
    description: "Empty home, search only, no recommendations.",
    homeVideos: 0,
    sidebarVideos: 0,
  },
};

const DEFAULT_LEVEL = "hard";
