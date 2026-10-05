/* FlowTask — landing page behaviour */

document.addEventListener('DOMContentLoaded', function () {

  /* Trial form */

  var form = document.getElementById('trial-form');
  if (form) {
    var email = form.querySelector('input[name="email"]');
    var error = document.getElementById('email-error');
    var status = document.getElementById('trial-status');

    form.addEventListener('submit', function (e) {
      e.preventDefault();

      if (!email.value.trim() || !email.validity.valid) {
        error.hidden = false;
        email.setAttribute('aria-invalid', 'true');
        email.focus();
        return;
      }

      error.hidden = true;
      email.removeAttribute('aria-invalid');
      form.hidden = true;
      status.textContent = 'Thanks — check your inbox, the workspace is being created.';
      status.focus();
    });
  }

  /* FAQ accordion */

  document.querySelectorAll('.faq__q').forEach(function (question) {
    question.addEventListener('click', function () {
      var open = question.parentElement.classList.toggle('is-open');
      question.setAttribute('aria-expanded', String(open));
    });
  });

});