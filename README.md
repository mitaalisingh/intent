# Intent

**A calmer YouTube that helps you do what you came to do.**

> **Status: early stage.** The first working version hides Shorts, autoplay and the endless feed, with a Soft / Medium / Hard dial. Ranking, the intent check and the rest are still to come. See "What works today" below.

## Why I'm building this

I use YouTube for tutorials. I also lose time to it: "I might not see this again" turns one video into ten. Reddit and Pinterest do the same, and I need all three for work. Total blockers don't help, because they block the useful part too.

I also remember when I didn't use social media much. Life felt slower and I noticed more. Then everyone around me seemed to know everything quickly, and I felt I had to keep up. Intent is my attempt to keep what's useful and remove the hook.

## What Intent will do

A browser extension for YouTube, built around one idea: **say what you're here for, and let the tool help you stay with it.**

- **State your intent.** Start a focus session with "placement prep", or a goal like "improve my attention span".
- **Friendly reminders, not blocks.** If you search something that doesn't match, you get a casual nudge like "just a reminder, u decided to placement prep btw". It reminds you and trusts your answer.
- **One dial: Soft, Medium, Hard.** Soft gives you a small feed of ranked picks that ends. Hard gives you an empty home page and search only.
- **No Shorts, ever.**
- **Ranking for attention.** Videos are scored on things like pacing, depth, and hook tactics, not just what keeps people watching.
- **Learns from you.** One tap after a video: "worth it" or "wasted".
- **Attention training.** Slowly shifts what you're offered toward longer, better videos.

## What works today

- **No Shorts:** hidden from the home page, search, the left menu and channel pages. Shorts links open as normal videos.
- **No clips under 1 minute** in the home feed or the sidebar. They still show in search, because then you asked for them.
- **Autoplay is always off.**
- **The dial:** click the Intent icon to pick a level.
  - **Soft:** 12 home videos, then "That's all for now". 5 sidebar videos.
  - **Medium:** 6 home videos, 3 sidebar videos.
  - **Hard (default):** empty home page, search only, no sidebar.
  - At Soft and Medium the videos are still YouTube's own picks, just fewer of them and with no endless scroll. Ranking comes later.

### Try it
1. Download or clone this repo.
2. Open `chrome://extensions` and turn on **Developer mode**.
3. Click **Load unpacked** and choose the `extension` folder.
4. Open YouTube.

## Why these choices (the research)

Intent's rules come from research, not only from my own experience:

- **Short videos in a row hurt attention.** A 2025 meta-analysis of 71 studies (about 98,000 people) linked more short-form video use with weaker attention and self-control. Most of those studies show a link, not proof of cause. ([Psychological Bulletin, 2025](https://pubmed.ncbi.nlm.nih.gov/41231585/))
- **Fast switching makes you forget what you meant to do.** In an experiment, a TikTok-style feed made people worse at remembering an intention; normal YouTube videos did not. This is the problem the name "Intent" is about. ([Chiossi et al., CHI 2023](https://www.mmi.ifi.lmu.de/pubdb/publications/pub/chiossi2023short/chiossi2023short.pdf))
- **Recommendations and autoplay take away control.** YouTube users felt less in control of their time because of them. ([Lukoff et al., CHI 2021](https://arxiv.org/pdf/2101.11778))
- **Clickbait is real, and YouTube doesn't filter it.** Misleading titles and thumbnails are common, and YouTube's recommendations did not take them into account. ([Zannettou et al., 2018](https://www.researchgate.net/publication/323960601_The_Good_the_Bad_and_the_Bait_Detecting_and_Characterizing_Clickbait_on_YouTube))

So Intent hides the things with the strongest evidence (Shorts, short clips in a chain, autoplay, endless feeds) and will use weaker signals (clickbait, fast pacing) only for ranking, not for hiding. Details in [`DECISIONS.md`](DECISIONS.md).

## How it's different

Existing extensions (Unhook, FocusTube, and others) mostly **hide things**, usually by toggle. Intent aims to do three things differently:

1. **Ask what you came for,** and check your searches against it.
2. **Rank, not just hide,** with scores based on attention, not engagement.
3. **Help rebuild focus over time,** with soft and hard levels so people can choose how strict to be.

I tested Unhook and FocusTube myself to see what they do and what they don't.

## Planned design

- **Extension (JavaScript):** hides elements, shows the popup and reminders.
- **Backend (Python):** ranking and AI model calls. API keys stay there, never in the extension.
- **Privacy:** send the minimum (search words, titles). Keep ratings on the user's device. No tracking.

## Milestones

| | |
|---|---|
| M0 | Research (competitors, feasibility checks) — mostly done |
| M1 | Hide Shorts, autoplay and the engagement feed, plus the level dial — working, being tested |
| M2 | Replacement feed |
| M3–M4 | Scoring and AI judge |
| M5 | Feedback loop |
| M6–M8 | Attention ladder, weekly report, polish |

Details: [`ROADMAP.md`](ROADMAP.md), [`DECISIONS.md`](DECISIONS.md).

## What I don't claim

- It cannot reliably detect AI-generated videos. It can hide ones YouTube labels as AI and limit YouTube to approved channels.
- "Attention span" isn't precisely measurable, so Intent measures behavior (uninterrupted watching, completion, ratings), not medical outcomes.
