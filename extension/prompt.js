// The pop-up in the middle of YouTube. Two steps:
// 1. "What's your intent?" Type it and press Enter.
//    (Empty the box and press Enter to end the session.)
// 2. "How strict should YouTube be?" Pick a level.
// Esc closes it without changing anything.
// Both choices go into storage. The rest of the extension reads them from there.
//
// While it is open, a plain calm page covers YouTube: no thumbnails, no noise.

const PROMPT_ID = "intent-prompt";

// Every rule starts with the pop-up's id, so YouTube's own styles don't leak in.
// Colors follow the computer's light or dark mode.
const PROMPT_CSS = `
  :root:has(#${PROMPT_ID}) { overflow: hidden !important; }

  #${PROMPT_ID} {
    --bg: #faf8f5;
    --text: #2b2b2b;
    --muted: #7a756c;
    --line: #d6d0c6;
    --accent: #4a7c6b;
    --soft: #eef5f1;
  }
  @media (prefers-color-scheme: dark) {
    #${PROMPT_ID} {
      --bg: #1b1a18;
      --text: #ece8e1;
      --muted: #9a958c;
      --line: #3a3833;
      --accent: #7fb5a1;
      --soft: #26302b;
    }
  }

  #${PROMPT_ID} {
    all: initial;
    position: fixed;
    inset: 0;
    z-index: 2147483647;
    display: flex;
    align-items: center;
    justify-content: center;
    background: var(--bg);
    color: var(--text);
    font-family: system-ui, sans-serif;
    animation: intent-fade 0.3s ease-out;
  }
  @keyframes intent-fade { from { opacity: 0; } to { opacity: 1; } }

  #${PROMPT_ID} * { box-sizing: border-box; font-family: inherit; }

  #${PROMPT_ID} .card {
    width: 480px;
    max-width: calc(100vw - 48px);
  }
  #${PROMPT_ID} .question {
    display: block;
    margin: 0 0 20px;
    font-size: 30px;
    font-weight: 500;
    line-height: 1.2;
    color: var(--text);
  }
  #${PROMPT_ID} input {
    display: block;
    width: 100%;
    padding: 8px 0;
    font-size: 22px;
    color: var(--text);
    background: transparent;
    border: 0;
    border-bottom: 2px solid var(--line);
    border-radius: 0;
    outline: none;
  }
  #${PROMPT_ID} input::placeholder { color: var(--muted); }
  #${PROMPT_ID} input:focus { border-bottom-color: var(--accent); }

  #${PROMPT_ID} button {
    display: block;
    width: 100%;
    margin: 0 0 10px;
    padding: 14px 16px;
    text-align: left;
    font-size: 18px;
    color: var(--text);
    background: transparent;
    border: 1.5px solid var(--line);
    border-radius: 12px;
    cursor: pointer;
  }
  #${PROMPT_ID} button:hover { border-color: var(--accent); }
  #${PROMPT_ID} button strong { display: block; font-size: 19px; font-weight: 600; }
  #${PROMPT_ID} button span { font-size: 15px; color: var(--muted); }
  #${PROMPT_ID} button.selected { border-color: var(--accent); background: var(--soft); }
`;

function showPrompt() {
  if (document.getElementById(PROMPT_ID)) return;

  const root = document.createElement("div");
  root.id = PROMPT_ID;
  const style = document.createElement("style");
  style.textContent = PROMPT_CSS;
  const card = document.createElement("div");
  card.className = "card";
  root.append(style, card);
  document.documentElement.appendChild(root);

  askIntent(card);
  document.addEventListener("keydown", closeOnEscape, true);

  // Silence YouTube while the pop-up is open. A video that starts later is paused too.
  pauseVideos();
  document.addEventListener("play", pauseNewVideo, true);
}

function closePrompt() {
  document.getElementById(PROMPT_ID)?.remove();
  document.removeEventListener("keydown", closeOnEscape, true);
  document.removeEventListener("play", pauseNewVideo, true);
}

function pauseVideos() {
  document.querySelectorAll("video").forEach((video) => video.pause());
}

// The "play" event does not bubble, so listen for it on the way down (capture).
function pauseNewVideo(event) {
  if (event.target instanceof HTMLVideoElement) event.target.pause();
}

// Esc closes the pop-up, and it stays closed in this tab until you reload.
function closeOnEscape(event) {
  if (event.key !== "Escape") return;
  try { sessionStorage.setItem("intent-dismissed", "1"); } catch {}
  closePrompt();
}

// Step 1: the question and a text box.
function askIntent(card) {
  card.innerHTML = "";

  const label = document.createElement("label");
  label.className = "question";
  label.htmlFor = "intent-prompt-input";
  label.textContent = "What's your intent?";

  const input = document.createElement("input");
  input.id = "intent-prompt-input";
  input.type = "text";
  input.maxLength = 120;
  input.placeholder = "e.g. placement prep";
  card.append(label, input);

  // If a session is running, show its intent so it can be changed.
  chrome.storage.local.get({ intent: "", active: false }).then(({ intent, active }) => {
    if (active) input.value = intent;
  });

  input.addEventListener("keydown", (event) => {
    if (event.key !== "Enter") return;
    const intent = input.value.trim();
    if (intent === "") {
      // An empty box ends the session.
      chrome.storage.local.set({ intent: "", active: false });
      closePrompt();
      return;
    }
    // Nothing is saved yet: the page would jump to your feed before you pick a level.
    askLevel(card, intent);
  });

  // A moment later, because YouTube may grab the focus while it loads.
  setTimeout(() => input.focus(), 50);
}

// Step 2: swap the question for the level buttons.
function askLevel(card, intent) {
  card.innerHTML = "";

  const question = document.createElement("p");
  question.className = "question";
  question.textContent = "How strict should YouTube be?";
  card.appendChild(question);

  chrome.storage.local.get({ level: DEFAULT_LEVEL }).then(({ level: selected }) => {
    for (const [key, level] of Object.entries(LEVELS)) {
      const button = document.createElement("button");
      if (key === selected) button.className = "selected";

      const name = document.createElement("strong");
      name.textContent = level.label;
      const description = document.createElement("span");
      description.textContent = level.description;
      button.append(name, description);

      // Save the intent and the level together. Saving is enough:
      // open YouTube tabs listen for the change (see content.js).
      button.addEventListener("click", () => {
        chrome.storage.local.set({ intent, active: true, level: key });
        closePrompt();
      });
      card.appendChild(button);
    }
  });
}

// Ask on its own when YouTube opens with no session running,
// unless it was closed with Esc in this tab.
chrome.storage.local.get({ active: false }).then(({ active }) => {
  let dismissed = false;
  try { dismissed = sessionStorage.getItem("intent-dismissed") === "1"; } catch {}
  if (!active && !dismissed) showPrompt();
});

// Clicking the Intent icon in the toolbar opens it too (see background.js).
chrome.runtime.onMessage.addListener((message) => {
  if (message.type === "intent-open") showPrompt();
});
