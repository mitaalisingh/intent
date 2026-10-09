# Roadmap

Future ideas are documented here and revisited at the end of each milestone. They are not built in parallel with the core. See `DECISIONS.md` for the reasoning behind the core scope.

## Now (core, v1)
- Hide Shorts everywhere.
- Hide the engagement-driven home feed and sidebar recommendations.
- One level dial: Soft / Medium / Hard.
- Minimal intent check: friendly reminder when a search does not match the session's intent.
- Ranking by attention-friendliness, "worth it / wasted" ratings, attention ladder, weekly report.
- Best-effort removal of videos labeled as AI-generated; optional channel allowlist at Hard.

## Next (after the core works and has been used for two weeks)
Ideas from early research and testing of existing tools. Feasibility notes are first guesses, to be checked.

- **Discover mode (the most important one).** The user types what they are looking for and gets real choices, including underrated videos, not only what the algorithm pushes. A "make YouTube dumb" version: a plain holder for strangers' low-view videos with unglamorous titles.
  - Feasibility: the YouTube API cannot sort by fewest views. Likely approach: run searches, fetch view counts, and keep low-view results. Search calls use a lot of daily quota (check current numbers). Low-view videos are also more likely to be low quality or unsafe, so quality and safety filtering matters, especially for older users.
- **De-influence.** Hide celebrity-driven content so people are not pulled into opinions about a celebrity.
  - Feasibility: hiding comments is easy (a simple toggle). Detecting "celebrity content" is fuzzy: hide very large channels, or detect famous names in titles. Expect imperfect results; define "celebrity" clearly before building.
- **"Take me back to 2005" theme.** A simple, plain YouTube layout, like the original. Mostly styling. Good for a demo.
- **Soft-on-the-eyes theme.** Warm, low-contrast colors. Mostly styling.
- **Two session types:** *Work* (looking for inspiration or a tutorial, intent check on) and *Unwind* (watching, but with guardrails: finite feed, no autoplay, optional time cap). This is separate from the Soft/Medium/Hard level, which is about strictness.
- The short digest so the user can stay informed without living in the feed.

## Later
- Phone. YouTube's phone app often opens on Shorts to pull people in. A browser extension cannot change the app. Chrome on Android does not support extensions; Firefox on Android does. A real fix needs a different approach.
- Reddit and Pinterest support, and per-site time budgets.
- Other ideas from the early brainstorm are tracked privately.

## Maintenance note
YouTube changes its page structure often, so hiding or restyling features can break. Keep selectors in one place and test them every few weeks.
