window.addEventListener("load", function () {
  //sadrzaj funkcije koja ce se pozvati kada browser proglasi stranicu ucitanom
  //tj DOM tree potpuno formiranim
  document.getElementById("forma").addEventListener("submit", function (event) {
    var emailElement = document.getElementById("email");
    var lozinkaElement = document.getElementById("password");

    // Check if the input has the 'error' class
    if (
      emailElement.classList.contains("error") ||
      lozinkaElement.classList.contains("error")
    ) {
      alert("Molimo ispravite greške pre čuvanja.");
      event.preventDefault(); // Prevent form submission
    }

    // Continue with form submission if no errors
    return true;
  });
});

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

function togglePasswordVisibility(passwordId, checkboxId) {
  var passwordInput = document.getElementById(passwordId);
  var showPasswordCheckbox = document.getElementById(checkboxId);

  if (showPasswordCheckbox.checked) {
    passwordInput.type = "text";
  } else {
    passwordInput.type = "password";
  }
}

// function checkPasswordsMatch() {
//   var passwordInput = document.getElementById("password");
//   var confirmInput = document.getElementById("ponovi");
//   var messageDiv = document.getElementById("passwordMatchMessage");

//   if (passwordInput.value !== confirmInput.value) {
//     confirmInput.setCustomValidity("Passwords do not match.");
//   } else {
//     confirmInput.setCustomValidity("");
//   }
// }
