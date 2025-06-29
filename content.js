const hostname = location.hostname;

chrome.storage.local.get(["excludedSites"], (res) => {
  const excludedSites = res.excludedSites || [];

  if (!excludedSites.includes(hostname)) {
    const s = document.createElement("script");
    s.src = chrome.runtime.getURL("inject.js");
    s.onload = () => s.remove();
    document.head.appendChild(s);
  }
});
