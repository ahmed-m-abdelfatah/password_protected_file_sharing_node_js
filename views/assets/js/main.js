const passwordInput = document.getElementById('password');
const checkBox = document.getElementById('show-password');

checkBox.addEventListener('change', () => {
  console.log('~ change');

  if (checkBox.checked) {
    passwordInput.type = 'text';
  } else {
    passwordInput.type = 'password';
  }
});

// change title of page to h1 element
document.title = document.getElementsByTagName('H1').item(0).textContent;

// hide all warning messages after 5 seconds
const warningMessages = document.getElementsByClassName('alert-danger');

for (let i = 0; i < warningMessages.length; i++) {
  setTimeout(() => {
    warningMessages.item(i).style.display = 'none';
  }, 5000);
}
