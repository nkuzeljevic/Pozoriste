window.addEventListener("load", function () {
  fetch("http://localhost:9000/admin/predstava")
    .then((response) => response.json())
    .then((predstave) => {
      console.log(predstave);

      const createOption = (predstava) => {
        return `<option value="${predstava.id}">${predstava.naziv}</option>`;
      };

      // Append options to the select element
      predstave.forEach((predstava) => {
        const optionHTML = createOption(predstava);
        selectElementPredstave.insertAdjacentHTML("beforeend", optionHTML);
      });

      // Dynamically add the link to main.css
      const styleLink = document.createElement("link");
      styleLink.rel = "stylesheet";
      styleLink.href = "/main.css"; // Replace with the correct path to your main.css
      document.head.appendChild(styleLink);
    });

  const selectElementPredstave = document.getElementById("predstave");
  const hiddenInputPredstava = document.getElementById("izabranaPredstava");

  // Add event listener to update hidden input on change
  selectElementPredstave.addEventListener("change", function () {
    const selectedPredstavaId = selectElementPredstave.value;
    // Update the hidden input field with the selected Predstava ID
    hiddenInputPredstava.value = selectedPredstavaId;
  });
  document.getElementById("forma").addEventListener("submit", function (event) {
    var imeElement = document.getElementById("ime");

    // Check if the input has the 'error' class
    if (imeElement.classList.contains("error")) {
      alert("Molimo ispravite greške pre čuvanja.");
      event.preventDefault(); // Prevent form submission
    }

    // var spanovi = document.querySelectorAll("#unetePredstave > span.badge");
    // var niz = [];
    // for (let i = 0; i < spanovi.length; i++) {
    //   niz.push(spanovi[i].dataset.id);
    // }
    // var jsonString = JSON.stringify(niz);

    // var predstaveInput = "predstaveInput";
    // document.getElementById(predstaveInput).value = jsonString;
    // console.log(document.getElementById(predstaveInput).value);

    //Redirekcija nakon unosa novog glumca
    event.preventDefault(); //sprecimo default ponasanje
    // var validno = validacija(); //uradimo validaciju
    // if (!validno) {
    //   return;
    // } //ako nije validno - kraj

    const noviGlumac = {
      ime: document.getElementById("ime").value,
      opis: document.getElementById("opis").value,
      izabranaPredstava: hiddenInputPredstava.value,
    };

    fetch("http://localhost:9000/admin/glumac", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(noviGlumac),
    })
      .then((response) => {
        if (!response.ok) {
          // Handle 400 Bad Request error
          if (response.status === 400) {
            return response.text().then((errorMessage) => {
              // console.error("Bad Request error:", errorMessage);
              alert(errorMessage); // Display the error message
              throw new Error(errorMessage);
            });
          } else {
            throw new Error("Server error: " + response.status);
          }
        }
        return response.json();
      })
      .then((data) => {
        //dobili smo objekat novounesenog jela, koje ima svoj id, super
        //mozemo nazad na spisak, a mozemo i na izmenu tog jela
        window.location.href = `/glumci/glumci.html`;
      })
      .catch((err) => console.log(err));

    // Continue with form submission if no errors
    return true;
  });

  document
    .getElementById("btnNazadGlumac")
    .addEventListener("click", function () {
      location.href = "/glumci/glumci.html";
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
//     }
//   });
// }
// //samo ako je validan input dodaj novi el
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
