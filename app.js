import Timer from "./timer.js";
let clickLowerUrl = "file://D://Learning//JavascriptMetronome//click_lower.mp3";

const tempoDisplay = document.querySelector(".tempo");
const tempoText = document.querySelector(".tempo-text");
const decreaseTempoButton = document.querySelector(".decrease-tempo");
const increaseTempoButton = document.querySelector(".increase-tempo");
const tempoSlider = document.querySelector(".slider");
const startStopButton = document.querySelector(".start-stop");
const subtractBeatsButton = document.querySelector(".subtract-beats");
const addBeatsButton = document.querySelector(".add-beats");
const measureCount = document.querySelector(".measure-count");
const soundSelector01 = document.querySelector(".sound-selector-01");
const soundSelector02 = document.querySelector(".sound-selector-02");
const tapTempoButton = document.querySelector(".tap-tempo-button");

const clickLower = new Audio(
  "https://github.com/thareeqroshan/JSMetronome/raw/main/click_lower.mp3"
);
const clickUpper = new Audio(
  "https://github.com/thareeqroshan/JSMetronome/raw/main/click_upper.mp3"
);
clickLower.preload = "auto";

let clicks = [clickLower, clickUpper];

let bpm = 140;
let beatsPerMeasure = 4;
let tempoTextString = "Medium";
let isRunning = false;
let count = 0;
let selectedSound = 1;
let timeSinceLastTap = 0;
soundSelector01.classList.add("selected");
const metronome = new Timer(playClick, 60000 / bpm, { immediate: true });
updateMetronome();

soundSelector01.addEventListener("click", () => {
  selectedSound = 1;
  soundSelector01.classList.add("selected");
  soundSelector02.classList.remove("selected");
});

soundSelector02.addEventListener("click", () => {
  selectedSound = 2;
  soundSelector02.classList.add("selected");
  soundSelector01.classList.remove("selected");
});

tapTempoButton.addEventListener("click", () => {
  let currentTime = Date.now();
  let timeBetweenTaps = currentTime - timeSinceLastTap;
  timeSinceLastTap = currentTime;
  bpm = Math.floor(60000 / timeBetweenTaps);
  validateTempo();
  updateMetronome();
});

decreaseTempoButton.addEventListener("click", () => {
  bpm--;
  validateTempo();
  updateMetronome();
});

increaseTempoButton.addEventListener("click", () => {
  bpm++;
  validateTempo();
  updateMetronome();
});

tempoSlider.addEventListener("input", () => {
  bpm = tempoSlider.value;
  updateMetronome();
});

subtractBeatsButton.addEventListener("click", () => {
  if (beatsPerMeasure <= 2) return;
  beatsPerMeasure--;
  measureCount.textContent = beatsPerMeasure;
});

addBeatsButton.addEventListener("click", () => {
  if (beatsPerMeasure >= 12) return;
  beatsPerMeasure++;
  measureCount.textContent = beatsPerMeasure;
});

startStopButton.addEventListener("click", () => {
  count = 0;
  if (!isRunning) {
    metronome.start();
    isRunning = true;
    startStopButton.textContent = "STOP";
  } else {
    metronome.stop();
    isRunning = false;
    startStopButton.textContent = "START";
  }
});

function updateMetronome() {
  tempoDisplay.textContent = bpm;
  tempoSlider.value = bpm;

  if (bpm <= 40) tempoTextString = "Super Slow";
  if (bpm > 40 && bpm <= 80) tempoTextString = "Slow";
  if (bpm > 80 && bpm <= 120) tempoTextString = "Getting there";
  if (bpm > 120 && bpm <= 180) tempoTextString = "Nice and Steady";
  if (bpm > 180 && bpm <= 220) tempoTextString = "Rock n' Roll";
  if (bpm > 220 && bpm <= 240) tempoTextString = "Funky Stuff";
  if (bpm > 240 && bpm <= 260) tempoTextString = "Relax Dude";
  if (bpm > 260 && bpm <= 280) tempoTextString = "Eddie Van Halen";

  tempoText.textContent = tempoTextString;
  metronome.timeInterval = 60000 / bpm;
}

function validateTempo() {
  if (bpm <= 20) {
    bpm = 20;
  }
  if (bpm >= 280) {
    bpm = 280;
  }
}

function playClick() {
  console.log(count);
  if (count === beatsPerMeasure) {
    count = 0;
  }
  // if (count === 0) {
  //   clickLower.play();
  //   clickLower.currentTime = 0;
  // } else {
  //   clickUpper.play();
  //   clickUpper.currentTime = 0;
  // }

  clicks[selectedSound - 1].play();
  clicks[selectedSound - 1].currentTime = 0;
  count++;
}
