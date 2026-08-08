// Note: avoid naming globals `status` or `name` — they collide with built-in
// window properties (both coerce to strings) and silently break assignments.
var formEl = document.getElementById('contact-form');
var statusEl = document.getElementById('form-status');
var submitBtn = document.getElementById('submit-btn');

function showStatus(message, kind) {
  statusEl.textContent = message;
  statusEl.className = 'form-status visible ' + kind;
}

formEl.addEventListener('submit', function (e) {
  e.preventDefault();

  submitBtn.disabled = true;
  showStatus('Sending…', 'pending');

  fetch(formEl.action, {
    method: 'POST',
    body: new FormData(formEl),
    headers: { Accept: 'application/json' }
  })
    .then(function (res) {
      if (res.ok) {
        formEl.reset();
        showStatus('Thanks — your message is on its way. I usually reply within a couple of days.', 'ok');
        return;
      }
      return res.json().then(function (data) {
        var detail = data && data.errors
          ? data.errors.map(function (x) { return x.message; }).join(', ')
          : 'Something went wrong.';
        showStatus(detail + ' You can also email contact@yashyennam.com directly.', 'err');
      });
    })
    .catch(function () {
      showStatus('Network error — please email contact@yashyennam.com directly.', 'err');
    })
    .then(function () {
      submitBtn.disabled = false;
    });
});
