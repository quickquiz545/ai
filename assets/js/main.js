// Mobile navigation toggle
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.site-nav');

if (navToggle && navMenu) {
  navToggle.addEventListener('click', () => {
    const isOpen = navToggle.getAttribute('aria-expanded') === 'true';
    navToggle.setAttribute('aria-expanded', String(!isOpen));
    navMenu.classList.toggle('open');
  });
}

// Form validation and submission for all forms
const forms = document.querySelectorAll('.lead-form');

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function showError(input, message) {
  const group = input.closest('.form-group');
  const error = group ? group.querySelector('.error-message') : null;
  if (error) {
    error.textContent = message;
  }
  input.setAttribute('aria-invalid', 'true');
}

function clearError(input) {
  const group = input.closest('.form-group');
  const error = group ? group.querySelector('.error-message') : null;
  if (error) {
    error.textContent = '';
  }
  input.removeAttribute('aria-invalid');
}

forms.forEach((form) => {
  const requiredFields = form.querySelectorAll('[data-required="true"]');

  requiredFields.forEach((field) => {
    field.addEventListener('input', () => clearError(field));
    if (field.tagName.toLowerCase() === 'textarea') {
      field.addEventListener('blur', () => clearError(field));
    }
  });

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    let hasError = false;

    requiredFields.forEach((field) => {
      const value = field.value.trim();
      if (!value) {
        showError(field, 'This field is required.');
        hasError = true;
        return;
      }

      if (field.type === 'email' && !emailPattern.test(value)) {
        showError(field, 'Please enter a valid business email.');
        hasError = true;
      }
    });

    if (hasError) return;

    alert('Thank you! Our migration experts will contact you shortly.');
    form.reset();
    requiredFields.forEach(clearError);
  });
});

// FAQ accordion handling
const faqQuestions = document.querySelectorAll('.faq-question');
faqQuestions.forEach((btn) => {
  btn.addEventListener('click', () => {
    const item = btn.closest('.faq-item');
    const isOpen = item?.classList.contains('open');
    document.querySelectorAll('.faq-item').forEach((el) => el.classList.remove('open'));
    if (!isOpen) {
      item?.classList.add('open');
    }
  });
});
