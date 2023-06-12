//Get input elements
const hourInput = document.getElementById("hour");
const minInput = document.getElementById("min");
const secInput = document.getElementById("sec");
//Get input elements' values
const startButton = document.getElementById("start");
const pauseButton = document.getElementById("pause");
const resetButton = document.getElementById("reset");
//Listen for start,pause and reset
startButton.addEventListener("click", startTimer);
pauseButton.addEventListener("click", pauseTimer);
resetButton.addEventListener("click", resetTimer);

//Initial time values and interval
let hourVal = 0;
let minVal = 0;
let secVal = 0;
let totalSec = 0;
let remainingSec = 0;
let interval = null;

//Start timer
function startTimer() {
  if (interval) {
    return; //If timer already running do nothing
  }

  //Take user entered values as input values or 0 if value = empty string.
  hourVal = parseInt(hourInput.value) || 0;
  minVal = parseInt(minInput.value) || 0;
  secVal = parseInt(secInput.value) || 0;
  totalSec = hourVal * 3600 + minVal * 60 + secVal; //Calculate total seconds to format time in displayTime() function

  //Update timer every 1s
  interval = setInterval(() => {
    if (totalSec <= 0) {
      clearInterval(interval);
      playAudio();
      alert("Countdown Complete!");
      resetTimer();
    } else {
      totalSec--;
      displayTime();
    }
  }, 1000);
}

//Pause timer and if timer is paused restart from previous time when startTimer() function is calld again
function pauseTimer() {
  if (!interval) {
    return; // Timer not running
  }

  clearInterval(interval);
  interval = null;
  remainingSec = totalSec; //pass remainingSec value as totalSec to start function so timer resumes.
}
//Reset timer back to 0 and reset all values
function resetTimer() {
  clearInterval(interval);
  hourVal = 0;
  minVal = 0;
  secVal = 0;
  totalSec = 0;
  remainingSec = 0;
  displayTime(0);
}
//Use totalSec to format time and display formatted time
function displayTime() {
  const hours = Math.floor(totalSec / 3600);
  const minutes = Math.floor((totalSec % 3600) / 60);
  const seconds = totalSec % 60;

  hourInput.value = hours.toString().padStart(2, "0");
  minInput.value = minutes.toString().padStart(2, "0");
  secInput.value = seconds.toString().padStart(2, "0");
}
//Play audio when timer is complete
function playAudio() {
  const audio = document.getElementById("ding");
  ding.play();
}
