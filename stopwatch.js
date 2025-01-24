let startTime = 0;
let elapsedTime = 0;
let timerInterval;
let lastLapTime = 0;

const timeDisplay = document.getElementById('time');
const lapsContainer = document.getElementById('laps');
const historyContainer = document.getElementById('history');

function formatTime(ms) {
    const minutes = Math.floor(ms / 60000).toString().padStart(2, '0');
    const seconds = Math.floor((ms % 60000) / 1000).toString().padStart(2, '0');
    const milliseconds = (ms % 1000).toString().padStart(3, '0');
    return `${minutes}:${seconds}.${milliseconds}`;
}

function start() {
    startTime = Date.now() - elapsedTime;
    timerInterval = setInterval(() => {
        elapsedTime = Date.now() - startTime;
        timeDisplay.innerHTML = formatTime(elapsedTime);
    }, 10);
}

function pause() {
    clearInterval(timerInterval);
}

function reset() {
    clearInterval(timerInterval);

    if (elapsedTime > 0) {
        const runDiv = document.createElement('div');
        runDiv.className = 'run';
        runDiv.innerHTML = `Run Time: ${formatTime(elapsedTime)}`;
        historyContainer.appendChild(runDiv);
    }

    elapsedTime = 0;
    lastLapTime = 0;
    timeDisplay.innerHTML = '00:00:00.000';
    lapsContainer.innerHTML = '<h3>Laps</h3>';
}

function addLap() {
    const lapTime = elapsedTime;
    const splitTime = lapTime - lastLapTime;
    lastLapTime = lapTime;

    const lapDiv = document.createElement('div');
    lapDiv.className = 'lap';
    lapDiv.innerHTML = `Lap: ${formatTime(lapTime)} (Split: ${formatTime(splitTime)})`;
    lapsContainer.appendChild(lapDiv);
}

document.getElementById('start').addEventListener('click', () => {
    start();
});

document.getElementById('pause').addEventListener('click', () => {
    pause();
});

document.getElementById('reset').addEventListener('click', () => {
    reset();
});

timeDisplay.addEventListener('click', () => {
    addLap();
});
