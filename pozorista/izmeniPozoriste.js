window.addEventListener("load", function () {
  //sadrzaj funkcije koja ce se pozvati kada browser proglasi stranicu ucitanom
  //tj DOM tree potpuno formiranim
  document.getElementById("forma").addEventListener("submit", function (event) {
    var nazivElement = document.getElementById("naziv");
    var adresaElement = document.getElementById("adresa");
    var phoneElement = document.getElementById("telefon");
    var emailElement = document.getElementById("email");

    // Check if the input has the 'error' class
    if (
      nazivElement.classList.contains("error") ||
      adresaElement.classList.contains("error") ||
      phoneElement.classList.contains("error") ||
      emailElement.classList.contains("error")
    ) {
      alert("Molimo ispravite greške pre čuvanja.");
      event.preventDefault(); // Prevent form submission
    }

    // Continue with form submission if no errors
    return true;
  });

  document
    .getElementById("btnNazadIzmeniPozoriste")
    .addEventListener("click", function () {
      location.href = "/pozorista/pozorista.html";
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
  //   var validno = true;
  if (inputElement.value.length < 3) {
    // validno = false;
    inputElement.classList.add("error");
    inputElement.classList.remove("success");
  } else {
    inputElement.classList.add("success");
    inputElement.classList.remove("error");
  }
  //   return validno;
}

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

// document.addEventListener("DOMContentLoaded", function () {
//   document
//     .getElementById("btnNazadIzmeniPozoriste")
//     .addEventListener("click", function () {
//       location.href = "/pozorista/pozorista.html";
//     });
// });
