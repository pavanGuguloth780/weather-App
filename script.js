let timer = document.getElementById('timer');
let startPauseBtn = document.getElementById('startPauseBtn');
let resetBtn = document.getElementById('resetBtn');
let lapBtn = document.getElementById('lapBtn');
let lapList = document.getElementById('lapList');
let progressBar = document.getElementById('progress-bar');
let toggleThemeBtn = document.getElementById('toggleThemeBtn');
let fullScreenBtn = document.getElementById('fullScreenBtn');

let isRunning = false;
let interval;
let time = 0;

function startPauseTimer() {
    if (isRunning) {
        clearInterval(interval);
        startPauseBtn.textContent = 'Start';
    } else {
        interval = setInterval(updateTimer, 1000);
        startPauseBtn.textContent = 'Pause';
    }
    playSound(isRunning ? 'pause' : 'start');
    isRunning = !isRunning;
}

function updateTimer() {
    time++;
    let hours = Math.floor(time / 3600);
    let minutes = Math.floor((time % 3600) / 60);
    let seconds = time % 60;

    timer.textContent = `${formatTime(hours)}:${formatTime(minutes)}:${formatTime(seconds)}`;

    // Progress bar update
    progressBar.style.width = `${(time % 60) * (100 / 60)}%`;
}

function formatTime(value) {
    return value < 10 ? '0' + value : value;
}

function resetTimer() {
    clearInterval(interval);
    time = 0;
    timer.textContent = '00:00:00';
    startPauseBtn.textContent = 'Start';
    lapList.innerHTML = '';
    progressBar.style.width = '0%';
    isRunning = false;
    playSound('reset');
}

function addLap() {
    if (isRunning) {
        let lapTime = document.createElement('li');
        lapTime.classList.add('lap');
        lapTime.textContent = `Lap: ${timer.textContent} - ${new Date().toLocaleTimeString()}`;
        lapList.appendChild(lapTime);
    }
}

function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
}

function playSound(type) {
    let audio = new Audio(`${type}.mp3`);
    audio.play();
}

function toggleFullScreen() {
    if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen();
    } else {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        }
    }
}

// Keyboard shortcuts
document.addEventListener('keydown', (e) => {
    if (e.code === 'Space') startPauseTimer();
    if (e.code === 'KeyR') resetTimer();
    if (e.code === 'KeyL') addLap();
});

startPauseBtn.addEventListener('click', startPauseTimer);
resetBtn.addEventListener('click', resetTimer);
lapBtn.addEventListener('click', addLap);
toggleThemeBtn.addEventListener('click', toggleDarkMode);
fullScreenBtn.addEventListener('click', toggleFullScreen);
