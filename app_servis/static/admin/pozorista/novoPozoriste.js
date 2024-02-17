window.addEventListener("load", function () {

  document.getElementById("forma").addEventListener("submit", function (event) {
    var nazivElement = document.getElementById("naziv");
    var adresaElement = document.getElementById("adresa");
    var phoneElement = document.getElementById("telefon");
    var emailElement = document.getElementById("email");


    if (
      nazivElement.classList.contains("error") ||
      adresaElement.classList.contains("error") ||
      phoneElement.classList.contains("error") ||
      emailElement.classList.contains("error")
    ) {
      alert("Molimo ispravite greške pre čuvanja.");
      event.preventDefault(); // Prevent form submission
    }

    event.preventDefault();

    const novoPozoriste = {
      naziv: document.getElementById("naziv").value,
      opis: document.getElementById("opis").value,
      email: document.getElementById("email").value,
      adresa: document.getElementById("adresa").value,
      telefon: document.getElementById("telefon").value,
    };

    fetch("http://localhost:9000/admin/pozoriste", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(novoPozoriste),
    })
      .then((response) => {
        if (!response.ok) {
          if (response.status === 400) {
            return response.text().then((errorMessage) => {
              const errorDetails = JSON.parse(errorMessage);

              if (
                errorDetails.error &&
                errorDetails.error.includes("telefon")
              ) {
                alert("Molimo unesite ispravan telefonski broj.");
              } else if (
                errorDetails.error &&
                errorDetails.error.includes("email")
              ) {
                alert("Molimo unesite ispravan email (qqq@qqq.com).");
              } else if (
                errorDetails.error &&
                errorDetails.error.includes("adresa")
              ) {
                alert("Adresa mora da ima barem 5 karaktera.");
              } else if (
                errorDetails.error &&
                errorDetails.error.includes("naziv")
              ) {
                alert("Naziv mora da ima barem 5 karaktera.");
              } else {
                alert(errorMessage); 
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
        window.location.href = `/admin/pozorista/pozorista.html`;
      })
      .catch((err) => console.log(err));

    return true;
  });

  document
    .getElementById("btnNazadPozoriste")
    .addEventListener("click", function () {
      location.href = "/admin/pozorista/pozorista.html";
    });


  // Function to get URL parameter by name
  function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
      results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return "";
    return decodeURIComponent(results[2].replace(/\+/g, " "));
  }
  // Get error parameter from the URL
  var error = getParameterByName("error");

  // Display error message as an alert if present
  if (error) {
    alert(error);
  }
});


function validatePhoneNumber(inputElement) {
  // Define a regular expression pattern for a phone number
  // var phoneNumberPattern = /^\d{9,15}$/;
  var phoneNumberPattern = /^[0-9]{3}\/?[0-9]{6,7}$/;
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