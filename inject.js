const videos = document.querySelectorAll("video");

videos.forEach(video => {
  video.playbackRate = 2.5;
});

const applySpeed = (video, speed) => {
  if (video && video.playbackRate !== speed) {
    video.playbackRate = speed;
  }
};

const observeNewVideos = (speed) => {
  const observer = new MutationObserver(() => {
    const newVideos = document.querySelectorAll("video");
    newVideos.forEach(video => applySpeed(video, speed));
  });

  observer.observe(document.body, {
    childList: true,
    subtree: true
  });
};

const defaultSpeed = 2.5;
videos.forEach(video => applySpeed(video, defaultSpeed));

observeNewVideos(defaultSpeed);
