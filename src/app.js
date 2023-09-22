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
const register = document.querySelector('.register-form');
const congratulationsMsg = document.querySelector('.msg');
const registerBack = document.querySelector('.back');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const topicInput = document.getElementById('topic');
const phoneNumer = document.getElementById('phone');
const check = document.querySelector('.check');
const category = document.getElementById('category');
const grpSize = document.getElementById('size');
const contactName = document.querySelector('.contact .name');
const contactemail = document.querySelector('.contact .email');
const contactMessage = document.querySelector('.contact textarea');
const contactForm = document.querySelector('.contact');

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
    postInfo();
    congratulationsMsg.classList.add('open');
    errorMsg.classList.remove('active');
  }

  closeErrorMsg.addEventListener('click', () =>
    errorMsg.classList.remove('active')
  );
}

async function getCategory() {
  try {
    const data = await fetch(
      'https://backend.getlinked.ai/hackathon/categories-list',
      {
        headers: { 'Content-Type': 'application/json' },
      }
    );
    const result = await data.json();

    if (!data.ok) {
      throw new Error('error');
    }

    result.forEach((result) => {
      const option = document.createElement('option');
      option.textContent = result.name;
      option.value = result.id;
      option.style.background = 'black';
      document.getElementById('category').appendChild(option);
    });
  } catch (error) {
    console.log(error);
  }
}

async function postInfo() {
  try {
    const info = {
      email: emailInput.value,
      phone_number: phoneNumer.value,
      team_name: nameInput.value,
      group_size: grpSize.value,
      project_topic: topicInput.value,
      category: category.value,
      privacy_poclicy_accepted: check.checked ? true : false,
    };
    const data = await fetch(
      'https://backend.getlinked.ai/hackathon/registration',
      {
        method: 'POST',
        body: JSON.stringify(info),
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    if (!data.ok) {
      throw new Error();
    }

    const result = await data.json();
    console.log(result);
  } catch (error) {
    console.log(error);
  }
}

async function postContact() {
  try {
    const info = {
      email: contactemail.value,
      phone_number: '0903322445533',
      first_name: contactName.value,
      message: contactMessage.value,
    };
    const data = await fetch(
      ' https://backend.getlinked.ai/hackathon/contact-form',
      {
        method: 'POST',
        body: JSON.stringify(info),
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    if (!data.ok) {
      throw new Error('error');
    }

    const result = await data.json();
    console.log(result);
  } catch (error) {
    console.log(error);
  }
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

      break;
    case '/src/register.html':
      registerBack.addEventListener('click', () =>
        congratulationsMsg.classList.remove('open')
      );
      getCategory();
      register.addEventListener('submit', verifyForm);
      break;
    case '/src/contact.html':
      contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        postContact();
      });
      break;
  }
}

document.addEventListener('DOMContentLoaded', init);
