chrome.storage.local.get(["excludedSites", "defaultSpeed"], (res) => {
  const excluded = res.excludedSites || [];
  const defaultSpeed = res.defaultSpeed || 1.0;
  const currentDomain = window.location.hostname;

  if (!excluded.includes(currentDomain)) {
    const script = document.createElement("script");
    script.src = chrome.runtime.getURL("inject.js");

    script.onload = () => {
      script.remove();
      window.postMessage({ type: "SET_SPEED", speed: defaultSpeed }, "*");
    };

    (document.head || document.documentElement).appendChild(script);
  }
});
