// Gives a video a score from 0 to 100 for how good it looks for your attention,
// and the reasons behind the score. Higher is better.
//
// For now it only uses what is visible on a video card: the title and the length.
// Completion, your "worth it / wasted" taps, and pacing come later.
// The points are a first guess. Tune them against videos you label yourself.

const BASE_SCORE = 50;

// Things titles do to hook you. Each one is tested on the lowercase title.
const BAIT_PATTERNS = [
  /you won'?t believe/,
  /\binsane\b/,
  /gone wrong/,
  /\bshocking\b/,
  /nobody (tells|talks)/,
  /\bone trick\b/,
  /\bguaranteed\b/,
  /\bin just \d/,
  /\[satisfying\]/,
  /blow your mind/,
  /\bmust watch\b/,
  /\bwent viral\b/,
];

// Words that usually mean someone is teaching, not hooking.
const CALM_PATTERNS = [
  /\bexplained\b/,
  /\blecture\b/,
  /\btutorial\b/,
  /\bessay\b/,
  /\bdocumentary\b/,
  /\bcourse\b/,
  /\bwalkthrough\b/,
  /\bdeep dive\b/,
  /\bhow to\b/,
];

// "1:10:10" -> 4210 seconds, "8:19" -> 499, anything else -> null.
function parseDuration(text) {
  if (typeof text !== "string") return null;
  const parts = text.trim().split(":");
  if (parts.length < 2 || parts.length > 3) return null;
  const numbers = parts.map((part) => (/^\d+$/.test(part) ? Number(part) : NaN));
  if (numbers.some(Number.isNaN)) return null;
  return numbers.reduce((total, n) => total * 60 + n, 0);
}

// Words of 4+ letters written fully in capitals. Short ones like "SQL" are
// skipped on purpose, because they are usually real abbreviations.
function allCapsWords(title) {
  const words = title.match(/[A-Za-z]+/g) || [];
  return words.filter((word) => word.length >= 4 && word === word.toUpperCase()).length;
}

// Each signal is { points, reason }. Negative points mean "more hook".
function titleSignals(title) {
  const signals = [];
  const lower = title.toLowerCase();

  const caps = allCapsWords(title);
  if (caps >= 3) signals.push({ points: -10, reason: "lots of ALL CAPS words" });
  else if (caps === 2) signals.push({ points: -6, reason: "ALL CAPS words" });

  const bangs = (title.match(/!/g) || []).length;
  if (bangs >= 2) signals.push({ points: -8, reason: "!! in the title" });
  else if (bangs === 1) signals.push({ points: -2, reason: "! in the title" });

  const emoji = (title.match(/\p{Extended_Pictographic}/gu) || []).length;
  if (emoji >= 2) signals.push({ points: -6, reason: "several emoji" });
  else if (emoji === 1) signals.push({ points: -2, reason: "an emoji" });

  if (/\*[^*]+\*/.test(title)) signals.push({ points: -4, reason: "*emphasis* in the title" });

  const baitHits = BAIT_PATTERNS.filter((pattern) => pattern.test(lower)).length;
  if (baitHits > 0) {
    signals.push({ points: -10 * Math.min(baitHits, 2), reason: "hook phrases" });
  }

  if (CALM_PATTERNS.some((pattern) => pattern.test(lower))) {
    signals.push({ points: 8, reason: "sounds like teaching" });
  }
  return signals;
}

// Very short videos are fast by nature. Long ones are not automatically good,
// so the bonus stops growing after an hour.
function lengthSignal(seconds) {
  if (seconds === null || seconds === undefined) return null;
  if (seconds < 120) return { points: -30, reason: "under 2 minutes" };
  if (seconds < 300) return { points: -10, reason: "2 to 5 minutes" };
  if (seconds < 600) return null;
  if (seconds <= 3600) return { points: 10, reason: "10 to 60 minutes" };
  return { points: 5, reason: "over an hour" };
}

// video: { title: string, durationSec: number | null }
// returns { score: 0..100, reasons: ["ALL CAPS words (-6)", ...] }
function scoreVideo({ title, durationSec }) {
  const signals = titleSignals(title || "");
  const length = lengthSignal(durationSec);
  if (length) signals.push(length);

  const total = signals.reduce((sum, signal) => sum + signal.points, BASE_SCORE);
  const score = Math.max(0, Math.min(100, total));
  const reasons = signals.map(
    ({ points, reason }) => `${reason} (${points > 0 ? "+" : ""}${points})`
  );
  return { score, reasons };
}

// Lets the tests load this file in Node. The browser ignores this line.
if (typeof module !== "undefined") {
  module.exports = { scoreVideo, parseDuration, titleSignals, lengthSignal };
}
