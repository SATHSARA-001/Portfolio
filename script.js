// script.js
document.addEventListener('DOMContentLoaded', function() {
  // Initialize AOS
  AOS.init({
    once: true,
    offset: 80,
    duration: 800,
    easing: 'ease-in-out'
  });

  // Contact form submission + animated alerts
  const form = document.querySelector('form');
  if (!form) return;

  form.addEventListener('submit', function(e) {
    e.preventDefault();
    const formData = new FormData(form);
    fetch(form.action, {
      method: 'POST',
      body: formData,
      headers: { Accept: 'application/json' }
    })
    .then(response => {
      if (response.ok) {
        showFormAlert('Thank you! Your message has been sent.', 'success');
        form.reset();
      } else {
        showFormAlert('Oops! Something went wrong.', 'danger');
      }
    })
    .catch(() => showFormAlert('Network error. Please try again.', 'danger'));
  });

  function showFormAlert(message, type = 'success') {
    const alertBox = document.createElement('div');
    alertBox.className = `alert alert-${type} animate__animated animate__fadeInDown`;
    alertBox.style.position = 'fixed';
    alertBox.style.top = '30px';
    alertBox.style.left = '50%';
    alertBox.style.transform = 'translateX(-50%)';
    alertBox.style.zIndex = '9999';
    alertBox.innerText = message;
    document.body.appendChild(alertBox);

    setTimeout(() => {
      alertBox.classList.replace('animate__fadeInDown', 'animate__fadeOutUp');
      setTimeout(() => alertBox.remove(), 1000);
    }, 2200);
  }
});
