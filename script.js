let startTime, updatedTime, difference, timerInterval;
let isRunning = false;
let laps = [];

const display = document.getElementById('display');
const startBtn = document.getElementById('startBtn');
const pauseBtn = document.getElementById('pauseBtn');
const resetBtn = document.getElementById('resetBtn');
const lapBtn = document.getElementById('lapBtn');
const lapsList = document.getElementById('laps');
const modeToggle = document.getElementById('modeToggle');
const clickSound = document.getElementById('clickSound');

function playClick() {
  clickSound.currentTime = 0;
  clickSound.play();
}

function updateDisplay(time) {
  let hrs = Math.floor(time / 3600000);
  let mins = Math.floor((time % 3600000) / 60000);
  let secs = Math.floor((time % 60000) / 1000);

  display.textContent =
    `${hrs.toString().padStart(2, '0')}:` +
    `${mins.toString().padStart(2, '0')}:` +
    `${secs.toString().padStart(2, '0')}`;
}

function startTimer() {
  if (!isRunning) {
    playClick();
    isRunning = true;
    startTime = Date.now() - (difference || 0);
    timerInterval = setInterval(() => {
      updatedTime = Date.now();
      difference = updatedTime - startTime;
      updateDisplay(difference);
    }, 1000);
  }
}

function pauseTimer() {
  if (isRunning) {
    playClick();
    clearInterval(timerInterval);
    isRunning = false;
  }
}

function resetTimer() {
  playClick();
  clearInterval(timerInterval);
  isRunning = false;
  startTime = null;
  difference = 0;
  updateDisplay(0);
  laps = [];
  lapsList.innerHTML = '';
}

function addLap() {
  if (isRunning && difference) {
    playClick();
    const lapTime = display.textContent;
    laps.push(lapTime);
    const li = document.createElement('li');
    li.textContent = `Lap ${laps.length}: ${lapTime}`;
    lapsList.appendChild(li);
  }
}

// Dark mode toggle
modeToggle.addEventListener('change', () => {
  document.body.classList.toggle('dark');
  playClick();
});

// Event Listeners
startBtn.addEventListener('click', startTimer);
pauseBtn.addEventListener('click', pauseTimer);
resetBtn.addEventListener('click', resetTimer);
lapBtn.addEventListener('click', addLap);
