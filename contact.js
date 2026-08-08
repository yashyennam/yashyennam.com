var form = document.getElementById('contact-form');
var status = document.getElementById('form-status');
var button = document.getElementById('submit-btn');

function show(message, kind) {
  status.textContent = message;
  status.className = 'form-status visible ' + kind;
}

form.addEventListener('submit', function (e) {
  e.preventDefault();

  button.disabled = true;
  show('Sending…', 'pending');

  fetch(form.action, {
    method: 'POST',
    body: new FormData(form),
    headers: { Accept: 'application/json' }
  })
    .then(function (res) {
      if (res.ok) {
        form.reset();
        show('Thanks — your message is on its way. I usually reply within a couple of days.', 'ok');
      } else {
        return res.json().then(function (data) {
          var detail = data && data.errors
            ? data.errors.map(function (x) { return x.message; }).join(', ')
            : 'Something went wrong.';
          show(detail + ' You can also email contact@yashyennam.com directly.', 'err');
        });
      }
    })
    .catch(function () {
      show('Network error — please email contact@yashyennam.com directly.', 'err');
    })
    .then(function () {
      button.disabled = false;
    });
});
