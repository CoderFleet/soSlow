chrome.storage.local.get(["defaultSpeed"], (res) => {
  const speed = res.defaultSpeed || 2.0;
  let currentSpeed = speed;

  // chrome.storage.local.set({ defaultSpeed: currentSpeed });
  // Trying Debouncing storage update
  let saveTimeout;
  const updateSpeed = (newSpeed) => {
    currentSpeed = newSpeed;
    clearTimeout(saveTimeout);
    saveTimeout = setTimeout(() => {
      chrome.storage.local.set({ defaultSpeed: currentSpeed });
    });
    document.querySelectorAll("video").forEach((video) => {
      video.playbackRate = currentSpeed;
    });

    console.log("Speed updated to", currentSpeed);
  };

  document.addEventListener("keydown", (e) => {
    if (e.shiftKey && e.key === "ArrowUp") {
      updateSpeed(Math.min(currentSpeed + 0.25, 16)); // I am limiting this to 16x
    } else if (e.shiftKey && e.key === "ArrowDown") {
      updateSpeed(Math.max(currentSpeed - 0.25, 0.25)); // Future ref: minimum is 0.25x
    }
  });

  const applySpeed = (video) => {
    if (video && video.playbackRate !== currentSpeed) {
      video.playbackRate = currentSpeed;
    }
  };

  const observeNewVideos = () => {
    const observer = new MutationObserver(() => {
      const newVideos = document.querySelectorAll("video");
      newVideos.forEach(applySpeed);
    });
    

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });
  };

  const videos = document.querySelectorAll("video");
  videos.forEach(applySpeed);

  observeNewVideos();
});
