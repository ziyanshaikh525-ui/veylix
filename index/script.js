// Mobile nav toggle
document.addEventListener('DOMContentLoaded', function () {
  var burger = document.querySelector('.burger');
  var menu = document.querySelector('.mobile-menu');
  if (burger && menu) {
    burger.addEventListener('click', function () {
      menu.classList.toggle('open');
      burger.textContent = menu.classList.contains('open') ? '✕' : '☰';
    });
    menu.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () {
        menu.classList.remove('open');
        burger.textContent = '☰';
      });
    });
  }

  // FAQ accordion
  document.querySelectorAll('.faq-item').forEach(function (item) {
    var q = item.querySelector('.faq-q');
    if (!q) return;
    q.addEventListener('click', function () {
      var wasOpen = item.classList.contains('open');
      document.querySelectorAll('.faq-item.open').forEach(function (i) {
        if (i !== item) i.classList.remove('open');
      });
      item.classList.toggle('open', !wasOpen);
    });
  });

  // Pricing plan -> contact page handoff
  document.querySelectorAll('[data-plan]').forEach(function (btn) {
    btn.addEventListener('click', function (e) {
      var plan = btn.getAttribute('data-plan');
      window.location.href = 'contact.html?plan=' + encodeURIComponent(plan);
    });
  });

  // Contact form
  var form = document.getElementById('contact-form');
  if (form) {
    // Pre-fill plan from query string if present
    var params = new URLSearchParams(window.location.search);
    var plan = params.get('plan');
    var planSelect = document.getElementById('plan');
    if (plan && planSelect) {
      Array.from(planSelect.options).forEach(function (opt) {
        if (opt.value === plan) opt.selected = true;
      });
    }

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var valid = true;
      var name = document.getElementById('name');
      var email = document.getElementById('email');
      var message = document.getElementById('message');

      [name, email, message].forEach(function (field) {
        field.closest('.field').classList.remove('error');
      });

      if (!name.value.trim()) {
        name.closest('.field').classList.add('error');
        valid = false;
      }
      var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(email.value.trim())) {
        email.closest('.field').classList.add('error');
        valid = false;
      }
      if (!message.value.trim()) {
        message.closest('.field').classList.add('error');
        valid = false;
      }

      if (!valid) return;

      // No backend is wired up — this simulates a successful submit.
      // To actually receive these messages, connect the form action to
      // a service like Formspree, Getform, or a mailto link.
      form.style.display = 'none';
      document.getElementById('form-success').classList.add('show');
    });
  }
});
