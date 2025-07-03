document.addEventListener("DOMContentLoaded", () => {
  const domainDisplay = document.getElementById("domain");
  const toggleBtn = document.getElementById("toggle-btn");
  const dashboardBtn = document.getElementById("open-dashboard");

  let currentDomain = "";
  let isExcluded = false;

  domainDisplay.textContent = "Loading...";
  toggleBtn.disabled = true;

  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    try {
      const url = new URL(tabs[0].url);
      currentDomain = url.hostname;
      domainDisplay.textContent = currentDomain;

      chrome.storage.local.get(["excludedSites"], (res) => {
        const excluded = res.excludedSites || [];
        isExcluded = excluded.includes(currentDomain);
        renderButton();
        toggleBtn.disabled = false;
      });
    } catch (err) {
      domainDisplay.textContent = "Could not load domain.";
      console.error("Invalid tab URL", err);
    }
  });

  function renderButton() {
    if (isExcluded) {
      toggleBtn.textContent = "😴 Sleepy — Wake Up!";
      toggleBtn.className =
        "w-full px-4 py-3 rounded-xl font-bold text-sm transition-all duration-300 border-2 shadow-lg transform hover:scale-105 active:scale-95 bg-gradient-to-r from-orange-500 to-red-500 border-orange-400 text-white hover:from-orange-400 hover:to-red-400 shadow-red-500/20";
    } else {
      toggleBtn.textContent = "🏊‍♀️ Swimming — Take a Break!";
      toggleBtn.className =
        "w-full px-4 py-3 rounded-xl font-bold text-sm transition-all duration-300 border-2 shadow-lg transform hover:scale-105 active:scale-95 bg-gradient-to-r from-blue-500 to-indigo-500 border-blue-400 text-white hover:from-blue-400 hover:to-indigo-400 shadow-blue-500/20";
    }
  }

  toggleBtn.addEventListener("click", () => {
    chrome.storage.local.get(["excludedSites"], (res) => {
      let excluded = res.excludedSites || [];

      if (isExcluded) {
        excluded = excluded.filter((site) => site !== currentDomain);
      } else {
        excluded.push(currentDomain);
      }

      chrome.storage.local.set({ excludedSites: excluded }, () => {
        isExcluded = !isExcluded;
        renderButton();
      });
    });
  });

  dashboardBtn.addEventListener("click", () => {
    chrome.runtime.openOptionsPage();
  });
});
