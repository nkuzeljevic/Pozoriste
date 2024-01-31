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

    updatePredstavaInput();
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
    return true;
  });

  document
    .getElementById("btnNazadPozoriste")
    .addEventListener("click", function () {
      location.href = "/pozorista/pozorista.html";
    });

  document
    .getElementById("dodajPredstavu")
    .addEventListener("click", function () {
      var id = document.getElementById("predstave").value;
      if (!id) {
        alert("Unesi predstvu");
        return;
      }
      dodajPredstavu(id);
      document.getElementById("predstave").value = "";
    });

  function updatePredstavaInput() {
    var spanovi = document.querySelectorAll("#unetePredstave > span.badge");
    var niz = [];
    for (let i = 0; i < spanovi.length; i++) {
      niz.push(spanovi[i].dataset.id);
    }
    var jsonString = JSON.stringify(niz);

    var predstaveInput = document.getElementById("predstaveInput");
    predstaveInput.value = jsonString;
    console.log(predstaveInput.value);
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
  // Define a regular expression pattern for a simple phone number
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
//   var inputElement = document.getElementById("naziv");
//   inputElement.addEventListener("input", function () {
//     inputElement.style.borderColor = "black";
//   });
// });

function dodajPredstavu(id) {
  // Creating span element
  var span = document.createElement("span");
  span.classList.add("badge");
  span.classList.add("bg-secondary");
  span.dataset.id = id;
  span.innerHTML = id;

  //Creting button
  var button = document.createElement("button");
  button.type = "button";
  button.classList.add("btn");
  button.classList.add("btn-default");
  button.classList.add("btn-sm");
  button.innerHTML = "X";

  //Append button to the span
  span.appendChild(button);

  //Append span to the unetePredstave
  document.getElementById("unetePredstave").appendChild(span);

  //Da bi postojao razmak
  document
    .getElementById("unetePredstave")
    .appendChild(document.createTextNode(" "));

  //Brisanje dodatog elementa
  button.addEventListener("click", function () {
    var id = this.parentNode.dataset.id;
    if (confirm("Da li si siguran da želiš da obrišeš?")) {
      this.parentNode.parentNode.removeChild(this.parentNode);
      updatePredstavaInput();
    }
  });

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
}
