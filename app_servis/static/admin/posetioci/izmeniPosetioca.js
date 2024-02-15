var id = null;
window.addEventListener("load", function () {
  var url = new URL(window.location.href);
  id = url.searchParams.get("id");
  const selectElementUloge = document.getElementById("uloga");

  fetch("http://localhost:9000/admin/posetilac/" + id)
    .then((resp) => resp.json())
    .then((data) => {
      console.log(data); //proverite sta ste dobili
      var selectElement = document.getElementById("uloga");
      var options = selectElement.options;

      for (var i = 0; i < options.length; i++) {
        if (options[i].value == data.uloga) {
          options[i].selected = true;
          break;
        }
      }
      // Set the selected option in the pozoriste select element
      selectElementUloge.value = data.uloga;
      document.getElementById("ime").value = data.imePrezime;
      document.getElementById("email").value = data.email;
      document.getElementById("telefon").value = data.brojTelefona;
      document.getElementById("lozinka").value = data.lozinka;
      document.getElementById("ponovi").value = data.lozinka;
    })
    .catch((err) => console.log(err));

  //sadrzaj funkcije koja ce se pozvati kada browser proglasi stranicu ucitanom
  //tj DOM tree potpuno formiranim
  document.getElementById("forma").addEventListener("submit", function (event) {
    var imeElement = document.getElementById("ime");
    var ulogaElement = document.getElementById("uloga");
    var telefonElement = document.getElementById("telefon");
    var emailElement = document.getElementById("email");
    var lozinkaElement = document.getElementById("lozinka");
    var ponoviElement = document.getElementById("ponovi");

    // Check if the input has the 'error' class
    if (
      imeElement.classList.contains("error") ||
      ulogaElement.classList.contains("error") ||
      telefonElement.classList.contains("error") ||
      emailElement.classList.contains("error") ||
      lozinkaElement.classList.contains("error") ||
      ponoviElement.classList.contains("error")
    ) {
      alert("Molimo ispravite greške pre čuvanja.");
      event.preventDefault(); // Prevent form submission
    }

    event.preventDefault();
    const izmeniPosetioca = {
      imePrezime: document.getElementById("ime").value,
      lozinka: document.getElementById("lozinka").value,
      brojTelefona: document.getElementById("telefon").value,
      email: document.getElementById("email").value,
      uloga: document.getElementById("uloga").value,
    };
    fetch("http://localhost:9000/admin/posetilac/" + id, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(izmeniPosetioca),
    })
      .then(async (response) => {
        console.log("Response status:", response.status);
        if (!response.ok) {
          //Handle 400 Bad Request error
          if (response.status === 400) {
            return response.text().then((errorMessage) => {
              const errorDetails = JSON.parse(errorMessage);

              if (
                errorDetails.error &&
                errorDetails.error.includes("brojTelefona")
              ) {
                alert("Molimo unesite ispravan telefonski broj.");
              } else if (
                errorDetails.error &&
                errorDetails.error.includes("email")
              ) {
                alert("Molimo unesite ispravan email (qqq@qqq.com).");
              } else if (
                errorDetails.error &&
                errorDetails.error.includes("lozinka")
              ) {
                alert("Molimo unesite ispravnu lozinku.");
              } else if (
                errorDetails.error &&
                errorDetails.error.includes("imePrezime")
              ) {
                alert("Ime i prezime mora da ima barem 5 karaktera.");
              } else {
                alert(errorMessage); // Display the original error message
              }

              throw new Error(errorMessage);
            });
          } else {
            throw new Error("Server error: " + response.status);
          }
        }
        return response.json();
      })
      .then((data) => {
        console.log("Fetched Predstava Data:", data);
        // alert("podaci su: " + novaSala.izabranoPozoriste);
        window.location.href = `/admin/posetioci/posetioci.html`;
      })
      .catch((err) => console.log(err));
    // Continue with form submission if no errors
    return true;
  });

  document
    .getElementById("btnNazadIzmeniPosetioca")
    .addEventListener("click", function () {
      location.href = "/admin/posetioci/posetioci.html";
    });

  document.getElementById("btnObrisi").addEventListener("click", function () {
    if (confirm("Potvrdi brisanje")) {
      fetch("http://localhost:9000/admin/posetilac/" + id, {
        method: "DELETE",
      })
        .then((resp) => resp.json())
        .then((data) => {
          //response sadrzi samo id obrisanog
          alert("Obrisan je zapis čiji je id: " + data);
          window.location.href = `/admin/posetioci/posetioci.html`;
        })
        .catch((err) => console.log(err));
    } else {
      return;
    }
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
