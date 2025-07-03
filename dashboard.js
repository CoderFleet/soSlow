const speedOptions = [1.25, 1.5, 1.75, 2.0, 2.25, 2.5, 2.75, 3.0, 3.5, 4.0];
const speedButtons = document.getElementById("speed-buttons");
const currentSpeedDisplay = document.getElementById("current-speed");
const savingToast = document.getElementById("saving-toast");
const siteInput = document.getElementById("site-input");
const addSiteBtn = document.getElementById("add-site");
const siteList = document.getElementById("site-list");
const noSitesMsg = document.getElementById("no-sites-msg");

let excludedSites = [];
let defaultSpeed = 2.0;

const showToast = () => {
  savingToast.classList.remove("hidden");
  setTimeout(() => savingToast.classList.add("hidden"), 1000);
};

const renderSites = () => {
  siteList.innerHTML = "";
  if (excludedSites.length === 0) {
    noSitesMsg.classList.remove("hidden");
    return;
  }
  noSitesMsg.classList.add("hidden");
  excludedSites.forEach((site) => {
    const item = document.createElement("div");
    item.className =
      "flex items-center justify-between p-3 bg-red-50 rounded-lg border border-red-200";
    item.innerHTML = `
            <div class="flex items-center gap-3">
              <div class="w-2 h-2 bg-red-400 rounded-full"></div>
              <span class="font-mono text-gray-800">${site}</span>
            </div>
            <button class="px-3 py-1 text-red-600 hover:bg-red-100 rounded-md transition-colors text-sm font-medium">Remove</button>
          `;
    item.querySelector("button").onclick = async () => {
      excludedSites = excludedSites.filter((s) => s !== site);
      await chrome.storage.local.set({ excludedSites });
      renderSites();
      showToast();
    };
    siteList.appendChild(item);
  });
};

// const loadData = async () => {
//   const result = await chrome.storage.local.get({
//     excludedSites: [],
//     defaultSpeed: 2.0,
//   });
//   excludedSites = result.excludedSites;
//   defaultSpeed = result.defaultSpeed;
//   currentSpeedDisplay.textContent = defaultSpeed + "x";
//   renderSites();

//   speedOptions.forEach((speed) => {
//     speedButtons.innerHTML = "";
//     const btn = document.createElement("button");
//     btn.textContent = speed + "x";
//     btn.className = `py-3 px-4 rounded-lg font-semibold transition-all transform hover:scale-105 ${
//       speed === defaultSpeed
//         ? "bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-lg"
//         : "bg-gray-100 text-gray-700 hover:bg-gray-200"
//     }`;
//     btn.onclick = async () => {
//       defaultSpeed = speed;
//       await chrome.storage.local.set({ defaultSpeed });
//       currentSpeedDisplay.textContent = speed + "x";
//       Array.from(speedButtons.children).forEach(
//         (b) => (b.className = b.className.replace(/bg-.+? /g, ""))
//       );
//       renderSites();
//       showToast();
//       loadData();
//     };
//     speedButtons.appendChild(btn);
//   });
// };
const loadData = async () => {
  const result = await chrome.storage.local.get({
    excludedSites: [],
    defaultSpeed: 2.0,
  });

  excludedSites = result.excludedSites;
  defaultSpeed = result.defaultSpeed;

  currentSpeedDisplay.textContent = defaultSpeed + "x";
  renderSites();
  renderSpeedButtons();
};
const renderSpeedButtons = () => {
  speedButtons.innerHTML = "";

  speedOptions.forEach((speed) => {
    const btn = document.createElement("button");
    btn.textContent = speed + "x";
    btn.className = `py-3 px-4 rounded-lg font-semibold transition-all transform hover:scale-105 ${
      speed === defaultSpeed
        ? "bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-lg"
        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
    }`;
    btn.onclick = async () => {
      defaultSpeed = speed;
      await chrome.storage.local.set({ defaultSpeed });
      currentSpeedDisplay.textContent = speed + "x";
      renderSpeedButtons(); // re-render all buttons with updated selection
      showToast();
    };
    speedButtons.appendChild(btn);
  });
};

addSiteBtn.onclick = async () => {
  const newSite = siteInput.value.trim().toLowerCase();
  if (newSite && !excludedSites.includes(newSite)) {
    excludedSites.push(newSite);
    await chrome.storage.local.set({ excludedSites });
    siteInput.value = "";
    renderSites();
    showToast();
  }
};

siteInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    addSiteBtn.click();
  }
});

loadData();
