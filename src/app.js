const global = window.location.pathname;

const menu = document.querySelector('.menu');
const menuBtn = document.querySelector('.menu-icon');
const closeBtn = document.querySelector('.close');
const trophy = document.querySelector('.trophy');
const cloud = document.querySelector('.faq-img');
const padlock = document.querySelector('.lock');
const judge = document.querySelector('.judge');
const rule = document.querySelector('.rule');
const idea = document.querySelector('.idea-img');
const registerBtn = document.querySelector('.submit-btn');
const congratulationsMsg = document.querySelector('.msg');
const registerBack = document.querySelector('.back');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const topicInput = document.getElementById('topic');
const check = document.querySelector('.check');

const animateElement = [trophy, cloud, padlock, judge, rule, idea];
let countdownInterval;

function openMenu() {
  menu.classList.add('open');
}
function closeMenu() {
  menu.classList.remove('open');
}

function updateCountdown() {
  const targetDate = new Date('September 30, 2023 00:00:00').getTime();
  const hoursElement = document.getElementById('hours');
  const minutesElement = document.getElementById('minutes');
  const secondsElement = document.getElementById('seconds');

  const currentDate = new Date().getTime();
  const timeDifference = targetDate - currentDate;

  if (timeDifference <= 0) {
    clearInterval(countdownInterval);
    hoursElement.textContent = '00';
    minutesElement.textContent = '00';
    secondsElement.textContent = '00';
    return;
  }

  const hours = Math.floor(
    (timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

  hoursElement.textContent = hours.toString().padStart(2, '0');
  minutesElement.textContent = minutes.toString().padStart(2, '0');
  secondsElement.textContent = seconds.toString().padStart(2, '0');

  requestAnimationFrame(updateCountdown);
}

let accordion = document.querySelectorAll('.faq > div');

accordion.forEach((question) => {
  question.addEventListener('click', (e) => {
    if (e.target.classList.contains('fa-plus')) {
      question.classList.add('active');
      e.target.classList.replace('fa-plus', 'fa-minus');
    } else if (e.target.classList.contains('fa-minus')) {
      question.classList.remove('active');
      e.target.classList.replace('fa-minus', 'fa-plus');
    }
  });
});

const animations = [
  {
    transform: 'translateY(0)',
  },
  {
    transform: ' translateY(-20px)',
  },
];

const animateOpts = {
  iterations: Infinity,
  duration: 2000,
  direction: 'alternate',
};

function verifyForm(e) {
  e.preventDefault();
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const isValidEmail = emailRegex.test(emailInput.value);
  const errorMsg = document.querySelector('.error');
  const closeErrorMsg = document.querySelector('.close-err');
  console.log(emailInput.value);
  // Check if the email is valid
  if (!isValidEmail) {
    errorMsg.classList.add('active');
  }
  // Check if the name is provided
  else if (nameInput.value.length < 1) {
    errorMsg.classList.add('active');
  }
  // Check if the topic is provided
  else if (topicInput.value.length < 1) {
    errorMsg.classList.add('active');
  }
  // Check if the checkbox is checked
  else if (!check.checked) {
    errorMsg.classList.add('active');
  }
  // All conditions passed, show congratulations message
  else {
    congratulationsMsg.classList.add('open');
    errorMsg.classList.remove('active');
  }

  closeErrorMsg.addEventListener('click', () =>
    errorMsg.classList.remove('active')
  );
}

function init() {
  switch (global) {
    case '/index.html':
      requestAnimationFrame(updateCountdown);
      menuBtn.addEventListener('click', openMenu);
      closeBtn.addEventListener('click', closeMenu);
      animateElement.forEach((element) => {
        const animation = element.animate(animations, animateOpts);
        animation.play();
      });

      console.log('home');
      break;
    case '/src/register.html':
      registerBtn.addEventListener('click', verifyForm);
      registerBack.addEventListener('click', () => window.location.reload());
      console.log('Register');
      break;
  }
}

document.addEventListener('DOMContentLoaded', init);
