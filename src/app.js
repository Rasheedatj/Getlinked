// declaring variables
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
const silver = document.querySelectorAll('#silver');
const input = document.querySelectorAll('input');
const formInput = document.querySelectorAll(
  'form input, form select, form textarea'
);

const animateElement = [trophy, cloud, padlock, judge, rule, idea];
let countdownInterval;

// open hamburger menu
function openMenu() {
  menu.classList.add('open');
}

// remove hamburger menu
function closeMenu() {
  menu.classList.remove('open');
}

// deadline countdown
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

// Faq open and close
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

// translating animations for flex images on home page
function animateFunc() {
  const animations = [
    {
      transform: 'translateY(0)',
    },
    {
      transform: ' translateY(-20px)',
    },
  ];
  const animationMedal = [
    {
      transform: 'rotate(0deg) scale(1)',
    },
    {
      transform: 'rotate(5deg) scale(1.05)',
    },
  ];

  const animateOpts = {
    iterations: Infinity,
    duration: 2000,
    direction: 'alternate',
  };

  animateElement.forEach((element) => {
    const animation = element.animate(animations, animateOpts);
    animation.play();
  });
  silver.forEach((element) => {
    const animation = element.animate(animationMedal, animateOpts);
    animation.play();
  });
}

// form verification  and then call postInfo function
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
  // All conditions passed, show congratulations message and post info
  else {
    postInfo();
    errorMsg.classList.remove('active');
  }

  closeErrorMsg.addEventListener('click', () =>
    errorMsg.classList.remove('active')
  );

  setTimeout(() => errorMsg.classList.remove('active'), 5750);
}

// add spinner
function showLoader() {
  document.querySelector('#loader').classList.add('active');
}
// remove spinner
function removeLoader() {
  document.querySelector('#loader').classList.remove('active');
}

// get category from api
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

// regsitration api
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
    showLoader();

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
      throw new Error('User EXist');
    }

    removeLoader();
    congratulationsMsg.classList.add('open');

    const result = await data.json();
  } catch (error) {
    if (error.message === 'User EXist') {
      // remove existing error message if there is
      if (document.querySelector('.exist')) {
        document.querySelector('.exist').remove();
      }
      errorMsg(error);
    }
  }
}

// create error message for existing user
function errorMsg(err) {
  document.querySelector('#loader').classList.remove('active');
  const errElement = document.createElement('p');
  errElement.textContent = err;
  errElement.classList.add('exist');
  errElement.style.color = '#FF26B9';
  errElement.style.fontStyle = 'italic';
  errElement.style.fontSize = '12px';
  document
    .querySelector('.email-form')
    .insertAdjacentElement('beforeend', errElement);
}

async function postContact() {
  try {
    const info = {
      email: contactemail.value,
      phone_number: '0903322445533',
      first_name: contactName.value,
      message: contactMessage.value,
    };
    showLoader();

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
    removeLoader();

    // shpw sucess messaage
    document.querySelector('.success').classList.add('active');

    // remove success message after 3 seconds
    setTimeout(() => {
      document.querySelector('.success').classList.remove('active');
    }, 3000);

    // reload page after error message is removed
    setTimeout(() => {
      window.location.reload();
    }, 3100);
  } catch (error) {
    console.log(error);
  }
}

// add border to active input
function onClickBox(e) {
  formInput.forEach((item) => {
    item.style.borderColor = '#ffffff';
  });
  e.target.style.borderColor = '#D434FE';
}

// back to top button
function scrollToTop() {
  if (document.documentElement.scrollTop === 0) {
    document.querySelector('.top').classList.remove('active');
  } else {
    document.querySelector('.top').classList.add('active');
  }
}

// router
function init() {
  switch (global) {
    case '/':
    case '/index.html':
      requestAnimationFrame(updateCountdown);
      menuBtn.addEventListener('click', openMenu);
      closeBtn.addEventListener('click', closeMenu);
      animateFunc();
      window.addEventListener('scroll', scrollToTop);
      break;
    case '/src/register.html':
      registerBack.addEventListener('click', () => {
        window.location.reload();
      });
      getCategory();
      register.addEventListener('submit', verifyForm);
      document.querySelector('form').addEventListener('click', onClickBox);

      break;
    case '/src/contact.html':
      contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        postContact();
      });
      document.querySelector('form').addEventListener('click', onClickBox);

      break;
  }
}

// call router function on content load
document.addEventListener('DOMContentLoaded', init);
