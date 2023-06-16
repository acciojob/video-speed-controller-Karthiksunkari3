// Get DOM elements
const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const volume = player.querySelector('.player__slider[name="volume"]');
const playbackSpeed = player.querySelector('.player__slider[name="playbackRate"]');
const skipButtons = player.querySelectorAll('[data-skip]');
const skipBackButton = player.querySelector('.skip-back');
const skipForwardButton = player.querySelector('.skip-forward');

// Functions

// Toggle play/pause
function togglePlay() {
  const method = video.paused ? 'play' : 'pause';
  video[method]();
}

// Update play/pause button icon
function updateButton() {
  const icon = video.paused ? '►' : '❚ ❚';
  toggle.textContent = icon;
}

// Skip forward or backward
function skip() {
  video.currentTime += parseFloat(this.dataset.skip);
}

// Update volume and playback speed
function handleSliderUpdate() {
  video[this.name] = this.value;
}

// Update progress bar
function updateProgress() {
  const percent = (video.currentTime / video.duration) * 100;
  progressBar.style.flexBasis = `${percent}%`;
}

// Seek to a specific time in the video
function seekToTime(e) {
  const seekTime = (e.offsetX / progress.offsetWidth) * video.duration;
  video.currentTime = seekTime;
}

// Event listeners
video.addEventListener('click', togglePlay);
video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);
video.addEventListener('timeupdate', updateProgress);

toggle.addEventListener('click', togglePlay);

skipButtons.forEach(button => button.addEventListener('click', skip));
skipBackButton.addEventListener('click', () => {
  video.currentTime -= 10;
});
skipForwardButton.addEventListener('click', () => {
  video.currentTime += 25;
});

volume.addEventListener('input', handleSliderUpdate);
playbackSpeed.addEventListener('input', handleSliderUpdate);

let mousedown = false;
progress.addEventListener('click', seekToTime);
progress.addEventListener('mousemove', (e) => mousedown && seekToTime(e));
progress.addEventListener('mousedown', () => mousedown = true);
progress.addEventListener('mouseup', () => mousedown = false);
