document.getElementById('contact-form').addEventListener('submit', function (e) {
  e.preventDefault();

  var name = document.getElementById('name').value.trim();
  var email = document.getElementById('email').value.trim();
  var message = document.getElementById('message').value.trim();

  var subject = 'Portfolio contact from ' + name;
  var body = message + '\n\n---\n' + name + '\n' + email;

  var mailto = 'mailto:contact@yashyennam.com'
    + '?subject=' + encodeURIComponent(subject)
    + '&body=' + encodeURIComponent(body);

  var status = document.getElementById('form-status');
  status.textContent = 'Opening your email app… if nothing happens, email contact@yashyennam.com directly.';
  status.classList.add('visible');

  window.location.href = mailto;
});
