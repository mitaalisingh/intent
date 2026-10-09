# Decisions

One entry per real choice, with the reason. Newest at the bottom.

## 2026-10-09 — Name: "Intent"
Mitaali chose the name **Intent**: the point is that people can do what they intended to do.
Note: the name hints at an "state your intent" feature. That idea is parked in `ROADMAP.md` (Later). The name still fits the philosophy without it.
To check later: name conflicts on the Chrome Web Store.

## 2026-10-09 — Shorts are always removed, in every mode
Reason: the project is about attention span, and Shorts are the clearest example of content built to hook. Not a setting the user can turn back on.

## 2026-10-09 — An empty home feed is a feature, not a gap
Observed while testing Unhook (M0): with the home feed hidden, nothing pulled the user in, and they searched for what they actually needed.
Consequence: the strict mode keeps the home page empty (search-first). The replacement homepage is for the gentler mode.

## 2026-10-09 — Strictness is the user's choice (a dial, not all-or-nothing)
Reason (Mitaali's view): some people want to go extreme, others only want to rebuild attention gradually and still discover good, underrated videos. Some of the best ideas come from YouTube, so cutting it off completely is not the goal.
Starting design (to refine):
- **Strict:** empty home, search only, no sidebar recommendations.
- **Gentle:** a small, finite home page of ranked picks (including underrated videos) with a clear end, and a short ranked sidebar instead of an endless one.
- Shorts are off in both.
Open question: what "finite" means (for example 5 picks a day) and how the attention-training ladder works with each mode.

## 2026-10-09 — A minimal intent check moves into v1 (from "Later")
Mitaali wants Intent to actually ask: the user states what they are here for (for example "placement prep"). If they later search something that clearly does not match (for example "kdrama"), a soft pop-up asks: "That doesn't sound like placement prep. Are you on a break?"
Rules:
- It asks, it never blocks. If the user says "Yes, break," the tool accepts it and may start a break timer (length to decide), then asks if they are back.
- It checks the **search query only** (and the intent text). No page contents are read or sent. This answers the earlier security concern.
- It asks at most once per search and only when the mismatch is clear. Too many pop-ups would make the user switch it off.
- Record each break and each "No, oops" click. This gives an "intent adherence" number for the report.
Scope note: this adds work to v1. If time gets tight, the attention ladder (M6) moves later before this does, because this feature is what the name promises.
Open questions: break timer length; how the match is judged (a small LLM call versus local similarity); wording of the pop-up.

## 2026-10-09 — Intent can be a goal, not only a topic
Examples: "placement prep" (a topic) or "improve my attention span" (a goal).
- With a goal like "improve my attention span," the feed gradually shifts toward long-form, good-quality videos, a step at a time (this is the attention-training ladder). Mitaali's framing: it is still the user's own feed, they just could not see the good videos under all the clickbait.
- Caveat: long does not mean good. Long-form can also be filler or clickbait, so ranking by quality still applies.
- Caveat: finding those videos needs a source of candidates (subscriptions, the user's interests, search through the YouTube API). We cannot read YouTube's own feed. This is the hardest technical part; prototype it before promising it.

## 2026-10-09 — Intent is used in focus sessions, not all day
Mitaali uses it only when she needs focus. The user starts a session by stating an intent, and can stop it. After a break is accepted, do not keep asking. One break question, then trust the user.

## 2026-10-09 — The user picks a level: Soft, Medium, or Hard (confirmed: one dial for everything)
Reason: ambiguous searches will happen, and people differ in how much they want to be challenged.
Proposed meaning, one dial controlling both the feed and the intent check:
- **Soft:** asks only when a search is clearly unrelated. Finite home page of ranked picks, short ranked sidebar.
- **Medium:** asks when a search is probably unrelated. Smaller home page, very short sidebar.
- **Hard:** asks about anything not clearly on-topic. Empty home, no sidebar recommendations, search only.
Shorts are off at every level. This replaces the earlier two-mode (Strict/Gentle) idea if confirmed; Hard is the old Strict and Soft is the old Gentle.

## 2026-10-09 — Voice of the pop-up: a friend, as if the user is talking to themselves
Not a teacher, no scolding. Written in first person, like a thought the user would have.
The first examples were too formal and read like a question or a quiz. Better: a casual reminder, in the way a friend would text it. Example from Mitaali: "just a reminder, u decided to placement prep btw". It reminds; it does not interrogate.
Buttons should be casual and equal in weight, with no guilt on the "break" option.

## 2026-10-09 — No nagging, except at Hard
- **Soft and Medium:** at most one light reminder per off-topic search, easy to dismiss. After the user says it is a break, leave them alone for the session.
- **Hard:** may remind every time the user goes off-intent. The user chose Hard, so this is expected.
Open: how to tell good long-form from filler (see "Long does not mean good" above). To be worked out in M3 and M4 and tested against the hand-labeled set.

## 2026-10-09 — Remove AI-generated videos, as a goal with honest limits
Mitaali wants AI-generated videos gone like Shorts, so the tool is safe even for older or less technical people.
What we can and cannot do:
- YouTube asks creators to label realistic AI content as "altered or synthetic." We can hide videos with that label **where the label is visible**. Unlabeled AI videos will get through. There is no reliable way to detect AI video on our own.
- **Spike (M0/M1):** check whether the label can be read in the feed and search listings, or only on the video page.
- A safer layer for Hard level and for less technical users: an **allowlist**, so only videos from approved channels show. This does not depend on detecting anything.
- Wording: never claim "blocks all AI videos." Say "hides videos YouTube labels as AI-generated, and can limit YouTube to trusted channels."
- Because older users are a target, the product must be simple: large text, plain words, safe defaults, and no setup that needs technical knowledge.

## 2026-10-09 — Principle: discovery, not only blocking
From early testing of existing tools: if the goal is a slower life and a better attention span, hard blocking is not always what people want. They should get a chance to choose, including underrated videos for what they typed.
- At Soft (and in the Next list), the tool should offer real discovery of what the user searched for, not only hide things.
- New ideas (Discover, De-influence, 2005 theme, soft-on-the-eyes theme, Work vs Unwind sessions) are recorded in `ROADMAP.md` under Next. Not in v1.
- Possible way to organize them later: a shared core with switchable "lenses" (Focus, Discover, De-influence, 2005). Proposed only; decide after v1.

## 2026-10-09 — Tech split: JavaScript extension + Python backend
Mitaali's main language is Python. A Chrome extension must be JavaScript or TypeScript, so:
- **Extension (JavaScript):** hiding elements, popup UI, level dial, reminders. Keep it small and simple.
- **Backend (Python, likely FastAPI):** ranking, AI model calls, evaluation against the hand-labeled set. API keys live only here.
- M1 (hide Shorts and the feed) needs no backend.
- Open: where the backend runs for people other than Mitaali (hosting). Decide after v1.

## 2026-10-09 — M1 hides with CSS, and Shorts links open as normal videos
- Hiding uses one injected stylesheet built from `extension/selectors.js`, not code that deletes elements. YouTube keeps adding videos as you scroll; a stylesheet covers new ones automatically and is simpler to fix when YouTube changes.
- A Shorts link (for example one shared by a friend) opens on the normal video page instead of the swipe player. The video itself may be useful; the endless swipe is the hook.
- Known weak spot: the left-menu Shorts link is matched by its English label, so it may stay visible if YouTube is set to another language.
