// document.addEventListener("DOMContentLoaded", function () {
//   document
//     .getElementById("btnNazadPozoriste")
//     .addEventListener("click", function () {
//       location.href = "/pozorista/pozorista.html";
//     });
// });

// function validacija() {
//   var validno = true;
//   if (document.getElementById("naziv").value.length < 3) {
//     validno = false;
//     document.getElementById("naziv").classList.add("error");
//     document.getElementById("naziv").classList.remove("success");

//     // document.getElementById("naziv").style.borderColor = "red";
//   } else {
//     document.getElementById("naziv").classList.add("success");
//     document.getElementById("naziv").classList.remove("error");

//     // document.getElementById("naziv").style.borderColor = "green";
//   }
//   return validno;
// }

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

    // updatePredstavaInput();
    // var spanovi = document.querySelectorAll("#unetePredstave > span.badge");
    // var niz = [];
    // for (let i = 0; i < spanovi.length; i++) {
    //   niz.push(spanovi[i].dataset.id);
    // }
    // var jsonString = JSON.stringify(niz);

    // var predstaveInput = "predstaveInput";
    // document.getElementById(predstaveInput).value = jsonString;
    // console.log(document.getElementById(predstaveInput).value);
    // Continue with form submission if no errors

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
          // Handle 400 Bad Request error
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

  // document
  //   .getElementById("dodajPredstavu")
  //   .addEventListener("click", function () {
  //     var id = document.getElementById("predstave").value;
  //     if (!id) {
  //       alert("Unesi predstvu");
  //       return;
  //     }
  //     dodajPredstavu(id);
  //     document.getElementById("predstave").value = "";
  //   });

  // function updatePredstavaInput() {
  //   var spanovi = document.querySelectorAll("#unetePredstave > span.badge");
  //   var niz = [];
  //   for (let i = 0; i < spanovi.length; i++) {
  //     niz.push(spanovi[i].dataset.id);
  //   }
  //   var jsonString = JSON.stringify(niz);

  //   var predstaveInput = document.getElementById("predstaveInput");
  //   predstaveInput.value = jsonString;
  //   console.log(predstaveInput.value);
  // }

  // // Get error parameter from the URL
  // var error = getParameterByName("error");

  // // Display error message as an alert if present
  // if (error) {
  //   alert(error);
  // }

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

// function validate() {
//   var nazivElement = document.getElementById("naziv");
//   var adresaElement = document.getElementById("adresa");
//   var phoneElement = document.getElementById("telefon");
//   var emailElement = document.getElementById("email");

//   // Check if the input has the 'error' class
//   if (
//     nazivElement.classList.contains("error") ||
//     adresaElement.classList.contains("error") ||
//     phoneElement.classList.contains("error") ||
//     emailElement.classList.contains("error")
//   ) {
//     alert("Molimo ispravite greške pre čuvanja.");
//     return false; // Prevent form submission
//   }

//   // Continue with form submission if no errors
//   return true;
// }

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

//samo ako je validan input dodaj novi el
// function validateAndToggleButton(inputElement, buttonId) {
//   var isValid;
//   if (inputElement.value.length >= 3) {
//     isValid = true;
//   } else {
//     isValid = false;
//   }
//   var button = document.getElementById(buttonId);
//   if (button) {
//     button.disabled = !isValid;
//   }
// }

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
//   var inputElement = document.getElementById("naziv");
//   inputElement.addEventListener("input", function () {
//     inputElement.style.borderColor = "black";
//   });
// });

// function dodajPredstavu(id) {
//   // Check if the play already exists in the list
//   var existingPlays = document.querySelectorAll("#unetePredstave > span.badge");
//   for (var i = 0; i < existingPlays.length; i++) {
//     if (existingPlays[i].dataset.id === id) {
//       alert("Predstava već postoji u listi.");
//       return;
//     }
//   }
//   // Creating span element
//   var span = document.createElement("span");
//   span.classList.add("badge");
//   span.classList.add("bg-secondary");
//   span.dataset.id = id;
//   span.innerHTML = id;

//   //Creting button
//   var button = document.createElement("button");
//   button.type = "button";
//   button.classList.add("btn");
//   button.classList.add("btn-default");
//   button.classList.add("btn-sm");
//   button.innerHTML = "X";

//   //Append button to the span
//   span.appendChild(button);

//   //Append span to the unetePredstave
//   document.getElementById("unetePredstave").appendChild(span);

//   //Da bi postojao razmak
//   document
//     .getElementById("unetePredstave")
//     .appendChild(document.createTextNode(" "));

//   //Brisanje dodatog elementa
//   button.addEventListener("click", function () {
//     var id = this.parentNode.dataset.id;
//     if (confirm("Da li si siguran da želiš da obrišeš?")) {
//       this.parentNode.parentNode.removeChild(this.parentNode);
//       updatePredstavaInput();
//     }
//   });

//   function updatePredstavaInput() {
//     var spanovi = document.querySelectorAll("#unetePredstave > span.badge");
//     var niz = [];
//     for (let i = 0; i < spanovi.length; i++) {
//       niz.push(spanovi[i].dataset.id);
//     }
//     var jsonString = JSON.stringify(niz);

//     var predstaveInput = "predstaveInput";
//     document.getElementById(predstaveInput).value = jsonString;
//     console.log(document.getElementById(predstaveInput).value);
//   }
// }
// }
