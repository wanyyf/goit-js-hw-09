import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const startBtnEl = document.querySelector('button[data-start');
const daysFieldEl = document.querySelector('.value[data-days]');
const hoursFieldEl = document.querySelector('.value[data-hours]');
const minutesFieldEl = document.querySelector('.value[data-minutes]');
const secondsFieldEl = document.querySelector('.value[data-seconds]');
const inputEl = document.querySelector('#datetime-picker');

const ValidOrInvalidDate = date => {
  if (date <= Date.now()) {
    Notiflix.Notify.warning('Please choose a date in the future');
    startBtnEl.disabled = true;
    return;
  }
  startBtnEl.disabled = false;
};
const onStartBtnClick = () => {
  setInterval(() => {
    const chooseData = new Date(inputEl.value);
    const timeLeft = chooseData - Date.now();
    if (timeLeft <= 0) return;
    console.log(timeLeft);
    convertMs(timeLeft);
    addTextValue(convertMs(timeLeft));
  }, 1000);
};
startBtnEl.addEventListener('click', onStartBtnClick);
const pad = num => String(num).padStart(2, '0');

function addTextValue({ days, hours, minutes, seconds }) {
  daysFieldEl.textContent = pad(days);
  hoursFieldEl.textContent = pad(hours);
  minutesFieldEl.textContent = pad(minutes);
  secondsFieldEl.textContent = pad(seconds);
}

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    ValidOrInvalidDate(selectedDates[0]);
    console.log(selectedDates[0]);
  },
};
flatpickr('#datetime-picker', options);

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}
