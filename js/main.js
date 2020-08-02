const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

const daySelector = document.querySelector('.day-selector');

for (let i = 0; i < 7; i++) {
  console.log(dayNames[i]);
  daySelector.insertAdjacentHTML("beforeend", `<div class="single-day">${dayNames[i]}</div>`);
}

// day-selector visibility
function toggleDayVisibility(event) {
  const details = document.querySelector('.day-selector');

  isVisibleDay = !isVisibleDay;
  if (isVisibleDay) {
    details.classList.remove('hidden');
  } else {
    details.classList.add('hidden');
  }
}

let isVisibleDay = false;
document.querySelector("#plus-sign").addEventListener('click', toggleDayVisibility);

// =============================================

// time-selector visibility
function toggleTimeVisibility(event) {
  const details = document.querySelector('.time-selector');

  isVisibleTime = !isVisibleTime;
  if (isVisibleTime) {
    details.classList.remove('hidden');
  } else {
    details.classList.add('hidden');
  }
}

let isVisibleTime = false;
document.querySelectorAll(".day-selector .single-day").forEach(day => {
  day.addEventListener('click', toggleTimeVisibility);
})
