const video = document.getElementById('videoPlayer');
const playPauseBtn = document.getElementById('playPauseBtn');
const skipBtn = document.getElementById('skipBtn');
const skipBackBtn = document.getElementById('skipBackBtn');
const volumeRange = document.getElementById('volumeRange');
const currentTime = document.getElementById('currentTime');
const duration = document.getElementById('duration');
const volumeUp = document.getElementById('volumeUp');
const downloadBtn = document.getElementById('downloadBtn');
let volumeInput;

playPauseBtn.addEventListener('click', () => {
    if (video.paused) {
        video.play();
        playPauseBtn.innerHTML = '<i class="bi-pause"></i>';
    } else {
        video.pause();
        playPauseBtn.innerHTML = '<i class="bi-play"></i>';
    }
});

video.addEventListener('ended', () => {
    playPauseBtn.innerHTML = '<i class="bi-play"></i>';
});

skipBtn.addEventListener('click', () => {
    video.currentTime += 10;
});

skipBackBtn.addEventListener('click', () => {
    video.currentTime -= 10;
});

volumeRange.addEventListener('input', () => {
    video.volume = volumeRange.value;
});

volumeUp.addEventListener('click', () => {
    toggleVolumeInput();
});

downloadBtn.addEventListener('click', () => {
    downloadVideo();
});

video.addEventListener('timeupdate', () => {
    currentTime.textContent = formatTime(video.currentTime);
    duration.textContent = formatTime(video.duration);
    updateProgressBar();
});

// Initialiser la durée à "0:00"
currentTime.textContent = formatTime(0);
duration.textContent = formatTime(0);

function formatTime(time) {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);

    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
}

function updateProgressBar() {
    const progress = (video.currentTime / video.duration) * 100;
    volumeRange.value = progress / 100;
}
function toggleVolumeInput() {
    if (!volumeInput) {
        showVolumeInput();
    } else {
        hideVolumeInput();
    }
}

function showVolumeInput() {
    volumeInput = document.createElement('input');
    volumeInput.type = 'range';
    volumeInput.min = '0';
    volumeInput.max = '1';
    volumeInput.step = '0.1';
    volumeInput.value = video.volume.toString();
    volumeInput.addEventListener('input', () => {
        video.volume = volumeInput.value;
    });

    volumeUp.parentNode.insertBefore(volumeInput, volumeUp.nextSibling);
      volumeInput.addEventListener('change', () => {
        isVolumeInputVisible = true;
    });
}

function hideVolumeInput() {
    if (volumeInput) {
        volumeInput.remove();
        volumeInput = null;
    }
}

function downloadVideo() {
    const video = document.getElementById('videoPlayer');
    const videoUrl = video.querySelector('source').src;

    const a = document.createElement('a');
    a.href = videoUrl;
    a.download = videoUrl;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
}


