# Intent

**A calmer YouTube that helps you do what you came to do.**

> **Status: early stage.** Research and design are done and the first milestone is starting. There is no working extension yet. This README describes what Intent is being built to do.

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
| M0 | Research (competitors, feasibility checks) — in progress |
| M1 | Hide Shorts and the engagement feed |
| M2 | Replacement feed |
| M3–M4 | Scoring and AI judge |
| M5 | Feedback loop |
| M6–M8 | Attention ladder, weekly report, polish |

Details: [`ROADMAP.md`](ROADMAP.md), [`DECISIONS.md`](DECISIONS.md).

## What I don't claim

- It cannot reliably detect AI-generated videos. It can hide ones YouTube labels as AI and limit YouTube to approved channels.
- "Attention span" isn't precisely measurable, so Intent measures behavior (uninterrupted watching, completion, ratings), not medical outcomes.
