import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const datetimePicker = document.querySelector("#datetime-picker");
const startButton = document.querySelector("[data-start]");
const daysSpan = document.querySelector("[data-days]");
const hoursSpan = document.querySelector("[data-hours]");
const minutesSpan = document.querySelector("[data-minutes]");
const secondsSpan = document.querySelector("[data-seconds]");

let countdownInterval;

function addLeadingZero(value) {
  return value < 10 ? "0" + value : value;
}

function updateTimerDisplay(days, hours, minutes, seconds) {
  daysSpan.textContent = addLeadingZero(days);
  hoursSpan.textContent = addLeadingZero(hours);
  minutesSpan.textContent = addLeadingZero(minutes);
  secondsSpan.textContent = addLeadingZero(seconds);
}

function calculateTimeDifference(selectedDate) {
  const currentDate = new Date();
  const timeDifference = selectedDate.getTime() - currentDate.getTime();
  
  if (timeDifference <= 0) {
    clearInterval(countdownInterval);
    iziToast.error({
      title: "Error",
      message: "Time has already passed",
    });
    startButton.disabled = true;
    return;
  }

  const totalSeconds = Math.floor(timeDifference / 1000);
  const days = Math.floor(totalSeconds / (3600 * 24));
  const hours = Math.floor((totalSeconds % (3600 * 24)) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = Math.floor(totalSeconds % 60);

  updateTimerDisplay(days, hours, minutes, seconds);
}

datetimePicker.addEventListener("change", () => {
  const selectedDate = new Date(datetimePicker.value);

  if (selectedDate <= new Date()) {
    iziToast.error({
      title: "Error",
      message: "Please choose a date in the future",
    });
    startButton.disabled = true; 
  } else {
    startButton.disabled = false; 
  }
});


startButton.addEventListener("click", () => {
  const selectedDate = new Date(datetimePicker.value);

  if (selectedDate <= new Date()) {
    iziToast.error({
      title: "Error",
      message: "Please choose a date in the future",
    });
    startButton.disabled = true; 
    return;
  }

  startButton.disabled = true;

  countdownInterval = setInterval(() => {
    calculateTimeDifference(selectedDate);
  }, 1000);

  calculateTimeDifference(selectedDate);
});

flatpickr(datetimePicker, {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
});
