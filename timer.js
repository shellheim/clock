const count = document.querySelector(".time-count");
const startButton = document.getElementById("start");
const pauseButton = document.getElementById("pause");
const resetButton = document.getElementById("reset");

let seconds = 0;
let interval = null;

//Listen for start, pause and reset

startButton.addEventListener("click", start);
pauseButton.addEventListener("click", pause);
resetButton.addEventListener("click", reset);
function timer() {
  seconds++;

  //Formatted Time
  let hrs = Math.floor(seconds / 3600);
  let min = Math.floor((seconds - hrs * 3600) / 60);
  let sec = seconds % 60;

  if (sec < 10) {
    sec = "0" + sec;
  }
  if (min < 10) {
    min = "0" + min;
  }
  if (hrs < 10) {
    hrs = "0" + hrs;
  }
  count.innerText = `${hrs}:${min}:${sec}`;
}
//Call timer function ever 1s if it's not already started
function start() {
  if (interval) {
    return;
  } else {
    interval = setInterval(timer, 1000);
  }
}
//Clear the interval, stop updating timer
function pause() {
  clearInterval(interval);
  interval = null;
}
//First stop the timer then put it back to 0 and reset seconds for next start.
function reset() {
  pause();
  seconds = 0;
  count.innerText = "00:00:00";
}
