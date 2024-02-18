window.addEventListener("load", function () {

  document.getElementById("forma").addEventListener("submit", function (event) {
    var imeElement = document.getElementById("ime");
    var ulogaElement = document.getElementById("uloga");
    var telefonElement = document.getElementById("telefon");
    var emailElement = document.getElementById("email");
    var lozinkaElement = document.getElementById("lozinka");
    var ponoviElement = document.getElementById("ponovi");


    if (
      imeElement.classList.contains("error") ||
      ulogaElement.classList.contains("error") ||
      telefonElement.classList.contains("error") ||
      emailElement.classList.contains("error") ||
      lozinkaElement.classList.contains("error") ||
      ponoviElement.classList.contains("error")
    ) {
      alert("Molimo ispravite greške pre čuvanja.");
      event.preventDefault(); 
    }

    // Continue with form submission if no errors
    return true;
  });

  document
    .getElementById("btnNazadRegistracija")
    .addEventListener("click", function () {
      location.href = "../../administrator/login.html";
    });
});

function validatePhoneNumber(inputElement) {
  // Da ima izmedju 9 i 15 brojeva
  var phoneNumberPattern = /^\d{9,15}$/;

  if (phoneNumberPattern.test(inputElement.value)) {
    inputElement.classList.add("success");
    inputElement.classList.remove("error");
  } else {
    inputElement.classList.add("error");
    inputElement.classList.remove("success");
  }
}

function validateInput(inputElement) {

  if (inputElement.value.length < 3) {
    inputElement.classList.add("error");
    inputElement.classList.remove("success");
  } else {
    inputElement.classList.add("success");
    inputElement.classList.remove("error");
  }
}

//Da ima karakter koji nije space ili @, @, karakter koji nije space ili @, tacka,karakter koji nije space ili @
function validateEmail(inputElement) {
  var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (emailPattern.test(inputElement.value)) {
    inputElement.classList.add("success");
    inputElement.classList.remove("error");
  } else {
    inputElement.classList.add("error");
    inputElement.classList.remove("success");
  }
}

//Da ima minimum 8 karaktera
function validatePass(input) {
  var password = input.value;

  if (password.length < 8) {
    input.setCustomValidity("Password must be at least 8 characters long.");
  } else {
    input.setCustomValidity("");
  }
}

function togglePasswordVisibility(passwordInput, togglePasswordBtn) {
  if (passwordInput.type === "password") {
    passwordInput.type = "text";
    togglePasswordBtn.innerHTML = '<i class="fas fa-eye-slash"></i>';
  } else {
    passwordInput.type = "password";
    togglePasswordBtn.innerHTML = '<i class="fas fa-eye"></i>';
  }
}

function checkPasswordsMatch() {
  var passwordInput = document.getElementById("lozinka");
  var confirmInput = document.getElementById("ponovi");
  var messageDiv = document.getElementById("passwordMatchMessage");

  if (passwordInput.value !== confirmInput.value) {
    confirmInput.setCustomValidity("Passwords do not match.");
  } else {
    confirmInput.setCustomValidity("");
  }
}
