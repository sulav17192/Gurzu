const form = document.getElementById('multiStepForm');
const steps = document.querySelectorAll('.form-step');
let currentStep = 0;

const nextBtns = document.querySelectorAll('.next-btn');
const prevBtns = document.querySelectorAll('.prev-btn');

steps[currentStep].classList.add('active');

nextBtns.forEach(button => {
  button.addEventListener('click', () => {
    if (validateStep(steps[currentStep])) {
      changeStep(1);
    }
  });
});

prevBtns.forEach(button => {
  button.addEventListener('click', () => {
    changeStep(-1);
  });
});

form.addEventListener('submit', e => {
  e.preventDefault();
  if (validateStep(steps[currentStep])) {
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    // Save data to sessionStorage as JSON string
    sessionStorage.setItem('multiStepFormData', JSON.stringify(data));

    alert('Form submitted!');
  }
});

function changeStep(direction) {
  steps[currentStep].classList.remove('active');
  currentStep += direction;
  steps[currentStep].classList.add('active');
}

const inputs = form.querySelectorAll('input');
inputs.forEach(input => {
  input.addEventListener('input', () => validateField(input));
});

function validateStep(step) {
  const inputs = step.querySelectorAll('input');
  let valid = true;
  inputs.forEach(input => {
    if (!validateField(input)) valid = false;
  });
  return valid;
}

function validateField(input) {
  const error = input.nextElementSibling;
  let valid = true;

  if (input.value.trim() === '') {
    valid = false;
    error.textContent = 'This field is required';
  } else if (
    input.type === 'email' &&
    !/^\S+@\S+\.\S+$/.test(input.value)
  ) {
    valid = false;
    error.textContent = 'Enter a valid email';
  } else if (input.id === 'phone' && !/^\d{10}$/.test(input.value)) {
    valid = false;
    error.textContent = 'Enter a 10-digit phone number';
  } else if (input.id === 'zip' && !/^\d{5,6}$/.test(input.value)) {
    valid = false;
    error.textContent = 'Enter a valid ZIP code';
  } else if (
    input.id === 'year' &&
    (input.value < 1900 || input.value > new Date().getFullYear())
  ) {
    valid = false;
    error.textContent = 'Enter a valid year';
  } else {
    error.textContent = '';
  }

  if (!valid) {
    input.classList.add('invalid');
  } else {
    input.classList.remove('invalid');
  }

  return valid;
}
