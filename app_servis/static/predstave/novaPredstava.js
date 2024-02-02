// // Function to get URL parameter by name
// function getParameterByName(name, url) {
//   if (!url) url = window.location.href;
//   name = name.replace(/[\[\]]/g, "\\$&");
//   var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
//     results = regex.exec(url);
//   if (!results) return null;
//   if (!results[2]) return "";
//   return decodeURIComponent(results[2].replace(/\+/g, " "));
// }

// // Event listener for DOMContentLoaded
// document.addEventListener("DOMContentLoaded", function () {
//   // Get error parameter from the URL
//   var error = getParameterByName("error");

//   // Display error message as an alert if present
//   if (error) {
//     alert(error);
//   }
// });
window.addEventListener("load", function () {
  // document.addEventListener("DOMContentLoaded", function () {

  // Initialize the hall options based on the default selected theater
  updateHallOptions();

  // Ako se promeni izabrano pozoriste da se pokrene iz pocetka
  document
    .getElementById("pozoriste")
    .addEventListener("change", updateHallOptions);

  document
    .getElementById("btnNazadPredstave")
    .addEventListener("click", function () {
      location.href = "/predstave/predstave.html";
    });

  //spreciti datume starije od danas
  document.getElementById("datum").min = new Date().toISOString().split("T")[0];

  document.getElementById("forma").addEventListener("submit", function (event) {
    var nazivElement = document.getElementById("naziv");
    var datumElement = document.getElementById("datum");
    var vremeElement = document.getElementById("vreme");
    var pozoristeElement = document.getElementById("pozoriste");
    var izabranoPozoristeElement = document.getElementById("izabranoPozoriste");
    var salaElement = document.getElementById("sala");
    var zanrElement = document.getElementById("zanr");
    var izabraniZanrElement = document.getElementById("izabraniZanr");
    var glumciInputElement = document.getElementById("glumciInput");
    var cenaElement = document.getElementById("cena");

    if (
      nazivElement.classList.contains("error") ||
      datumElement.classList.contains("error") ||
      vremeElement.classList.contains("error") ||
      pozoristeElement.classList.contains("error") ||
      izabranoPozoristeElement.classList.contains("error") ||
      salaElement.classList.contains("error") ||
      zanrElement.classList.contains("error") ||
      izabraniZanrElement.classList.contains("error") ||
      glumciInputElement.classList.contains("error") ||
      cenaElement.classList.contains("error")
    ) {
      alert("Molimo ispravite greške pre čuvanja.");
      event.preventDefault(); // Prevent form submission
    } else {
      //  Obrada da se salje naziv pozorista, a ne ID
      const selectElementPozoriste = document.getElementById("pozoriste");
      const izabranoPozoriste =
        selectElementPozoriste.options[selectElementPozoriste.selectedIndex]
          .text;

      // Update the hidden input field (optional, for server-side validation)
      document.getElementById("izabranoPozoriste").value = izabranoPozoriste;

      //Slanje izabranog zanra
      const selectElementZanr = document.getElementById("zanr");
      const izabraniZanr =
        selectElementZanr.options[selectElementZanr.selectedIndex].text;

      // Update the hidden input field (optional, for server-side validation)
      document.getElementById("izabraniZanr").value = izabraniZanr;
    }
  });

  // document.getElementById("btnUnesi").addEventListener("click", function () {
  //   console.log("Button clicked");
  //   const selectElement = document.getElementById("pozoriste");
  //   const selectedOption = selectElement.options[selectElement.selectedIndex];

  //   console.log("Selected Option Value:", selectedOption.value);
  //   console.log("Selected Option Text:", selectedOption.text);
  //   const formData = {
  //     naziv: document.getElementById("naziv").value,
  //     datum: document.getElementById("datum").value,
  //     vreme: document.getElementById("vreme").value,
  //     pozoriste: selectedOption.value,
  //     izabranoPozoriste: selectedOption.text,
  //     sala: document.getElementById("sala").value,
  //     zanr: document.getElementById("zanr").value,
  //     glumciInput: document.getElementById("glumciInput").value,
  //     cena: document.getElementById("cena").value,
  //   };
  //   console.log("Form Data:", formData);
  //   if (validate(formData)) {
  //     console.log("Form data submitted:", formData);
  //     // Perform form submission or any other actions here
  //   } else {
  //     console.log("Form data validation failed.");
  //     // Obrada da se salje naziv pozorista, a ne ID
  //     // console.log(document.getElementById("pozoriste"));
  //     // const selectElement = document.getElementById("pozoriste");
  //     // const izabranoPozoriste =
  //     //   selectElement.options[selectElement.selectedIndex].text;

  //     // // Update the hidden input field (optional, for server-side validation)
  //     // document.getElementById("izabranoPozoriste").value = izabranoPozoriste;
  //   }
  // });

  var addedGenres = [];
  //Novi zanr
  document
    .getElementById("dodajNovZanr")
    .addEventListener("click", function () {
      var id = document.getElementById("novZanr").value;
      if (!id) {
        alert("Unesi žanr");
        return;
      }
      dodajZanr(id);
      addedGenres.push(id); // Keep track of added genres
      document.getElementById("novZanr").value = "";
      document.getElementById("zanr").value = id;
    });

  //Obrisi zanr
  document.getElementById("obrisiZanr").addEventListener("click", function () {
    var selectedGenre = document.getElementById("zanr").value;
    if (confirm("Da li si siguran da želiš da obrišeš?")) {
      if (selectedGenre) {
        removeOptionByValue(document.getElementById("zanr"), selectedGenre);

        // Remove the genre from the addedGenres array
        var index = addedGenres.indexOf(selectedGenre);
        if (index !== -1) {
          addedGenres.splice(index, 1);
        }
      }
    }
  });

  //dodavanje novog glumca
  document.getElementById("dodajGlumca").addEventListener("click", function () {
    var id = document.getElementById("glumci").value;
    if (!id) {
      alert("Unesi glumca");
      return;
    }
    dodajGlumca(id);
    document.getElementById("glumci").value = "";

    //prevodjenje glumaca u json
    updateGlumciInput();
    // var spanovi = document.querySelectorAll("#unetiGlumci > span.badge");
    // var niz = [];
    // for (let i = 0; i < spanovi.length; i++) {
    //   niz.push(spanovi[i].dataset.id);
    // }
    // var jsonString = JSON.stringify(niz);

    // var glumciInput = "glumciInput";
    // document.getElementById(glumciInput).value = jsonString;
    // console.log(document.getElementById(glumciInput).value);
    // // Continue with form submission if no errors
    // return true;
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

function updateHallOptions() {
  // Get the selected theater
  const selectedTheater = document.getElementById("pozoriste").value;

  // Get the hall select element
  const hallSelect = document.getElementById("sala");

  // Clear existing options
  hallSelect.innerHTML = "";

  // Add options based on the selected theater
  switch (selectedTheater) {
    case "atelje":
      addHallOption("Scena Petar Kralj");
      addHallOption("Scena Mire Trailović");
      break;
    case "bdp":
      addHallOption("Velika scena");
      addHallOption("Mala sala");
      break;
    case "jdp":
      addHallOption("Velika scena Ljuba Tadić");
      addHallOption("Scena Studio JDP");
      break;
    case "pozoristeNaTerazijama":
      addHallOption("Velika scena");
      addHallOption("Mala sala");
      break;
    case "zvezdaraTeatar":
      addHallOption("Scena Bata Stojković");
      addHallOption("Nova scena");
      break;

    // Default case (if no theater is selected)
    default:
      addHallOption("Izaberite pozorište");
  }
}

function addHallOption(optionText) {
  const option = document.createElement("option");
  option.text = optionText;
  document.getElementById("sala").add(option);
}

function dodajGlumca(id) {
  // Check if the actor already exists in the list
  var existingActors = document.querySelectorAll("#unetiGlumci > span.badge");
  for (var i = 0; i < existingActors.length; i++) {
    if (existingActors[i].dataset.id === id) {
      alert("Glumac već postoji u listi.");
      return;
    }
  }
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

  //Append span to the unetiGlumci
  document.getElementById("unetiGlumci").appendChild(span);

  //Da bi postojao razmak
  document
    .getElementById("unetiGlumci")
    .appendChild(document.createTextNode(" "));

  //Brisanje dodatog elementa
  button.addEventListener("click", function () {
    var id = this.parentNode.dataset.id;
    if (confirm("Da li si siguran da želiš da obrišeš?")) {
      this.parentNode.parentNode.removeChild(this.parentNode);
      updateGlumciInput();
    }
  });
}

function updateGlumciInput() {
  var spanovi = document.querySelectorAll("#unetiGlumci > span.badge");
  var niz = [];
  for (let i = 0; i < spanovi.length; i++) {
    niz.push(spanovi[i].dataset.id);
  }
  var jsonString = JSON.stringify(niz);

  var glumciInput = "glumciInput";
  document.getElementById(glumciInput).value = jsonString;
  console.log(document.getElementById(glumciInput).value);
}

//samo ako je validan input dodaj novi el
function validateAndToggleButton(inputElement, buttonId) {
  var isValid;
  if (inputElement.value.length >= 3) {
    isValid = true;
  } else {
    isValid = false;
  }
  var button = document.getElementById(buttonId);
  if (button) {
    button.disabled = !isValid;
  }
}
function dodajZanr(id) {
  // Check if the genre already exists in the list
  var existingGenres = document.querySelectorAll("#zanr option");
  for (var i = 0; i < existingGenres.length; i++) {
    if (existingGenres[i].value === id) {
      alert("Žanr već postoji u listi.");
      return;
    }
  }
  // Creating span element
  var option = document.createElement("option");
  // option.dataset.value = id;
  option.value = id;
  option.innerHTML = id;

  //Append span to the unetePredstave
  document.getElementById("zanr").appendChild(option);
}

function removeOptionByValue(selectElement, value) {
  for (var i = 0; i < selectElement.options.length; i++) {
    if (selectElement.options[i].value === value) {
      selectElement.remove(i);
      break;
    }
  }
}

// document.addEventListener("DOMContentLoaded", function () {
//   document
//     .getElementById("btnNazadPredstave")
//     .addEventListener("click", function () {
//       location.href = "/predstave/predstave.html";
//     });
// });

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
}

function validate() {
  var nazivElement = document.getElementById("naziv");
  if (nazivElement.classList.contains("error")) {
    alert("Molimo ispravite greške pre čuvanja.");
    return false; // Prevent form submission
  }
  // Continue with form submission if no errors
  return true;
}
