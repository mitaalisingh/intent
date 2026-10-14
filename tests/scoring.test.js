// Run with:  node --test   (from the project folder)
const test = require("node:test");
const assert = require("node:assert");
const { scoreVideo, parseDuration } = require("../extension/scoring.js");

test("parseDuration reads minutes and hours", () => {
  assert.strictEqual(parseDuration("0:26"), 26);
  assert.strictEqual(parseDuration("8:19"), 499);
  assert.strictEqual(parseDuration("1:10:10"), 4210);
});

test("parseDuration returns null for things that are not times", () => {
  assert.strictEqual(parseDuration("LIVE"), null);
  assert.strictEqual(parseDuration(""), null);
  assert.strictEqual(parseDuration(undefined), null);
  assert.strictEqual(parseDuration("12"), null);
});

test("a calm tutorial scores well", () => {
  const { score } = scoreVideo({
    title: "Normalization in DBMS explained",
    durationSec: parseDuration("25:00"),
  });
  assert.ok(score >= 65, `expected 65 or more, got ${score}`);
});

test("a plain video of medium length stays near the middle", () => {
  const { score } = scoreVideo({ title: "A walk through the old town", durationSec: 480 });
  assert.strictEqual(score, 50);
});

test("a hooky short video scores very low", () => {
  const { score, reasons } = scoreVideo({
    title: "YOU WON'T BELIEVE THIS INSANE TRICK!!! 😱😱",
    durationSec: 45,
  });
  assert.ok(score <= 10, `expected 10 or less, got ${score}`);
  assert.ok(reasons.length >= 4);
});

test("calm beats plain, and plain beats hooky", () => {
  const calm = scoreVideo({ title: "Binary search lecture", durationSec: 1500 }).score;
  const plain = scoreVideo({ title: "My week in Pune", durationSec: 480 }).score;
  const hooky = scoreVideo({ title: "INSANE FAIL!! GONE WRONG 😭😭", durationSec: 90 }).score;
  assert.ok(calm > plain && plain > hooky);
});

test("short acronyms are not counted as shouting", () => {
  const { reasons } = scoreVideo({ title: "SQL and DSA for interviews", durationSec: 900 });
  assert.ok(!reasons.some((r) => r.includes("CAPS")));
});

test("long videos get a small bonus, not a big one", () => {
  const hour = scoreVideo({ title: "Old house journey", durationSec: 1800 }).score;
  const long = scoreVideo({ title: "Old house journey", durationSec: 4500 }).score;
  assert.ok(long < hour);
});

test("a video with no length (live) is judged on its title alone", () => {
  const { score } = scoreVideo({ title: "Study with me", durationSec: null });
  assert.strictEqual(score, 50);
});

test("the score stays between 0 and 100", () => {
  const low = scoreVideo({
    title: "INSANE SHOCKING GUARANTEED!!! 😱😱 *VIRAL*",
    durationSec: 10,
  }).score;
  assert.strictEqual(low, 0);
});

test("real titles from the feed, in the order we'd hope", () => {
  const hooky = scoreVideo({
    title: "ULTIMATE BEACH DAY IN ITALY *VLOG!!*",
    durationSec: parseDuration("1:10:10"),
  }).score;
  const teaching = scoreVideo({
    title: "How to get Placement in 6 months ? Study Plan for Placements",
    durationSec: parseDuration("28:10"),
  }).score;
  assert.ok(teaching > hooky, `teaching ${teaching} should beat hooky ${hooky}`);
});
