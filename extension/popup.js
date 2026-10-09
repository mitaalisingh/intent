// The popup that opens when you click the Intent icon.
// Shows one button per level and saves the choice.

const container = document.getElementById("levels");

function render(selected) {
  container.innerHTML = "";
  for (const [key, level] of Object.entries(LEVELS)) {
    const button = document.createElement("button");
    if (key === selected) button.className = "selected";

    const name = document.createElement("strong");
    name.textContent = level.label;
    const description = document.createElement("span");
    description.textContent = level.description;
    button.append(name, description);

    // Saving to storage is enough: open YouTube tabs listen for the change
    button.addEventListener("click", () => {
      chrome.storage.local.set({ level: key });
      render(key);
    });
    container.appendChild(button);
  }
}

chrome.storage.local.get({ level: DEFAULT_LEVEL }).then(({ level }) => render(level));
