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
  fetch("http://localhost:9000/admin/glumac")
    .then((response) => response.json())
    .then((glumci) => {
      console.log(glumci);

      const createOption = (glumci) => {
        return `<option value="${glumci.id}">${glumci.ime}</option>`;
      };

      // Append options to the select element
      glumci.forEach((glumac) => {
        const optionHTML = createOption(glumac);
        selectElementGlumci.insertAdjacentHTML("beforeend", optionHTML);
      });

      // Dynamically add the link to main.css
      const styleLink = document.createElement("link");
      styleLink.rel = "stylesheet";
      styleLink.href = "/main.css"; // Replace with the correct path to your main.css
      document.head.appendChild(styleLink);
    });
  const selectElementGlumci = document.getElementById("glumci");
  const hiddenInputGlumci = document.getElementById("izabraniGlumci");

  selectElementGlumci.addEventListener("change", function () {
    const selectedGlumacId = selectElementGlumci.value;
    // // Update the hidden input field with the selected Predstava ID
    hiddenInputGlumci.value = selectedGlumacId;
    // const selectedGlumacIds = Array.from(
    //   selectElementGlumci.selectedOptions
    // ).map((option) => option.value);
    // hiddenInputGlumci.value = JSON.stringify(selectedGlumacIds);
  });

  fetch("http://localhost:9000/admin/zanr")
    .then((response) => response.json())
    .then((zanrovi) => {
      console.log(zanrovi);

      const createOption = (zanrovi) => {
        // return `<option value="${zanrovi.id}">${zanrovi.naziv}</option>`;
        return `<option value="${zanrovi.id}" data-name="${zanrovi.naziv}">${zanrovi.naziv}</option>`;
      };

      // Append options to the select element
      zanrovi.forEach((zanr) => {
        const optionHTML = createOption(zanr);
        selectElementZanrovi.insertAdjacentHTML("beforeend", optionHTML);
      });

      // Dynamically add the link to main.css
      const styleLink = document.createElement("link");
      styleLink.rel = "stylesheet";
      styleLink.href = "/main.css"; // Replace with the correct path to your main.css
      document.head.appendChild(styleLink);
    });
  const selectElementZanrovi = document.getElementById("zanr");
  const hiddenInputZanrovi = document.getElementById("izabraniZanr");

  selectElementZanrovi.addEventListener("change", function () {
    // const selectedZanrId = selectElementZanrovi.value;
    // hiddenInputZanrovi.value = selectedZanrId;
    const selectedOption =
      selectElementZanrovi.options[selectElementZanrovi.selectedIndex];
    const selectedZanrId = selectedOption.value;
    const selectedZanrName = selectedOption.dataset.name;

    hiddenInputZanrovi.value = selectedZanrId;
    console.log("selectedZanrName: " + selectedZanrId);
  });

  fetch("http://localhost:9000/admin/pozoriste")
    .then((response) => response.json())
    .then((pozorista) => {
      console.log(pozorista);

      const createOption = (pozoriste) => {
        return `<option value="${pozoriste.id}">${pozoriste.naziv}</option>`;
      };

      // Append options to the select element
      pozorista.forEach((pozoriste) => {
        const optionHTML = createOption(pozoriste);
        selectElementPozorista.insertAdjacentHTML("beforeend", optionHTML);
      });

      // Dynamically add the link to main.css
      const styleLink = document.createElement("link");
      styleLink.rel = "stylesheet";
      styleLink.href = "/main.css"; // Replace with the correct path to your main.css
      document.head.appendChild(styleLink);
    });

  const selectElementPozorista = document.getElementById("pozoriste");
  const hiddenInputPozorita = document.getElementById("izabranoPozoriste");

  // Add event listener to update hidden input on change
  selectElementPozorista.addEventListener("change", function () {
    const selectedPozoristaId = selectElementPozorista.value;
    // Update the hidden input field with the selected Predstava ID
    hiddenInputPozorita.value = selectedPozoristaId;
    updateHallOptions();
  });
  // Initialize the hall options based on the default selected theater
  // updateHallOptions();

  // document.addEventListener("DOMContentLoaded", function () {

  // document.getElementById("izabranaSala").value =
  //   document.getElementById("sala").value;

  // Ako se promeni izabrano pozoriste da se pokrene iz pocetka
  // document
  //   .getElementById("pozoriste")
  //   .addEventListener("change", updateHallOptions);
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
    var izabranaSalaElement = document.getElementById("izabranaSala");
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
      izabranaSalaElement.classList.contains("error") ||
      zanrElement.classList.contains("error") ||
      izabraniZanrElement.classList.contains("error") ||
      glumciInputElement.classList.contains("error") ||
      cenaElement.classList.contains("error")
    ) {
      alert("Molimo ispravite greške pre čuvanja.");
      event.preventDefault(); // Prevent form submission
    } else {
      //  Obrada da se salje naziv pozorista, a ne ID
      // const selectElementPozoriste = document.getElementById("pozoriste");
      // const izabranoPozoriste =
      //   selectElementPozoriste.options[selectElementPozoriste.selectedIndex]
      //     .text;

      // // Update the hidden input field (optional, for server-side validation)
      // document.getElementById("izabranoPozoriste").value = izabranoPozoriste;

      //Obrada da se salje id pozorista
      // const selectElementPozoriste = document.getElementById("pozoriste");
      // const izabranoPozoristeId = selectElementPozoriste.value; // Get the selected theater ID

      // document.getElementById("izabranoPozoriste").value = izabranoPozoristeId;

      //Slanje izabranog zanra
      // const selectElementZanr = document.getElementById("zanr");
      // const selectElementZanr = document.getElementById("izabraniZanr");
      // const izabraniZanr =
      //   selectElementZanr.options[selectElementZanr.selectedIndex].text;

      // // Update the hidden input field (optional, for server-side validation)
      // document.getElementById("izabraniZanr").value = izabraniZanr;
      selectElementZanrovi.addEventListener("change", function () {
        const selectedOption =
          selectElementZanrovi.options[selectElementZanrovi.selectedIndex];

        // Check if selectedOption is defined before accessing its properties
        if (selectedOption) {
          const selectedZanrId = selectedOption.value;
          const selectedZanrName = selectedOption.dataset.name;

          hiddenInputZanrovi.value = selectedZanrId;
          console.log("selectedZanrName: " + selectedZanrId);
        }
      });

      //Pravljenje bedzeva za glumce
      var spanovi = document.querySelectorAll("#unetiGlumci > span.badge");
      var niz = [];
      for (let i = 0; i < spanovi.length; i++) {
        niz.push(spanovi[i].dataset.id);
      }
      // var jsonString = JSON.stringify(niz);

      var glumciInput = "glumciInput";
      document.getElementById(glumciInput).value = niz;
      console.log("niz: " + niz);

      // Set the initial value for izabranaSala after updating hall options
      document.getElementById("izabranaSala").value =
        document.getElementById("sala").value;

      event.preventDefault();
      const novaPredstava = {
        naziv: document.getElementById("naziv").value,
        datum: document.getElementById("datum").value,
        vreme: document.getElementById("vreme").value,
        izabranoPozoriste: document.getElementById("izabranoPozoriste").value,
        izabraniZanr: document.getElementById("izabraniZanr").value,
        // izabranaSala: document.getElementById("sala").value,
        izabranaSala: document.getElementById("izabranaSala").value,
        glumciInput: document.getElementById("glumciInput").value,
        // izabraniGlumci: niz,
        cena: document.getElementById("cena").value,
      };

      console.log(JSON.stringify(niz));
      console.log(novaPredstava);

      alert("pozdrav;");
      fetch("http://localhost:9000/admin/predstava", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(novaPredstava),
      })
        .then((succ) => succ.json())
        .then((data) => {
          console.log("Fetched Predstava Data:", data);
          window.location.href = `/predstave/predstave.html`;
        })
        .catch((err) => console.log(err));
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
    // updateGlumciInput();
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

  // (async () => {
  //   await updateHallOptions();
  // })();
});

async function updateHallOptions() {
  // Get the selected theater
  const selectedTheaterId = document.getElementById("izabranoPozoriste").value;

  // Get the hall select element
  const hallSelect = document.getElementById("sala");
  const selectedHallId = hallSelect.value;
  document.getElementById("izabranaSala").value = selectedHallId;
  console.log("Selected theater ID:", selectedTheaterId);
  console.log("selectedHallId: ", selectedHallId);

  // Clear existing options
  hallSelect.innerHTML = "";
  // hallSelect.options.length = 0;

  // Fetch halls based on the selected theater
  try {
    const response = await fetch(
      `http://localhost:9000/admin/sala/pozoriste/${selectedTheaterId}`
    );
    const halls = await response.json();
    console.log("Halls data:", halls);

    // Ensure that halls is not null before processing
    if (halls !== null) {
      // // Ensure that halls is an array before using forEach loop
      // if (Array.isArray(halls)) {
      //   halls.forEach((hall) => {
      //     addHallOption(hall.naziv); // Assuming 'naziv' is the property you want to display
      //   });
      // } else {
      //   console.error("Invalid halls data:", halls);
      // }
      // Create an HTML string for options
      const optionsHTML = halls
        .map((hall) => `<option value="${hall.id}">${hall.naziv}</option>`)
        .join("");

      // Set the innerHTML of the select element
      hallSelect.innerHTML = optionsHTML;

      // Add event listener to update hidden input on change
      hallSelect.addEventListener("change", function () {
        console.log("Hall select changed");
        const selectedHallId = hallSelect.value;
        // Update the hidden input field with the selected Hall ID
        document.getElementById("izabranaSala").value = selectedHallId;
      });
      // Trigger the change event manually after setting options
      hallSelect.dispatchEvent(new Event("change"));
    } else {
      console.log("No halls data available.");
    }
  } catch (error) {
    console.error("Error fetching halls:", error);
  }

  // Add options based on the selected theater
  // switch (selectedTheaterId) {
  // case "atelje":
  //   addHallOption("Scena Petar Kralj");
  //   addHallOption("Scena Mire Trailović");
  //   break;
  // case "bdp":
  //   addHallOption("Velika scena");
  //   addHallOption("Mala sala");
  //   break;
  // case "jdp":
  //   addHallOption("Velika scena Ljuba Tadić");
  //   addHallOption("Scena Studio JDP");
  //   break;
  // case "pozoristeNaTerazijama":
  //   addHallOption("Velika scena");
  //   addHallOption("Mala sala");
  //   break;
  // case "zvezdaraTeatar":
  //   addHallOption("Scena Bata Stojković");
  //   addHallOption("Nova scena");
  //   break;

  // // Default case (if no theater is selected)
  // default:
  //   addHallOption("Izaberite pozorište");
  //   case "Izaberite pozorište":
  //     addHallOption("Izaberite pozorište");
  //     break;
  //   default:
  //     try {
  //       const response = await fetch(
  //         `http://localhost:9000/admin/sala/${selectedTheaterId}`
  //       );
  //       const halls = await response.json();
  //       console.log("procitanje sale: " + halls);

  //       halls.forEach((hall) => {
  //         addHallOption(hall.naziv);
  //       });
  //     } catch (error) {
  //       console.error("Error fetching halls:", error);
  //     }
  // }
}

function addHallOption(optionText) {
  const option = document.createElement("option");
  option.text = optionText;
  document.getElementById("sala").add(option);
  // const hallSelect = document.getElementById("sala");
  // const option = document.createElement("option");
  // option.value = naziv;
  // option.text = naziv;
  // hallSelect.add(option);
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
  // Find the selected option in the dropdown
  var selectedOption = document.querySelector(
    "#glumci option[value='" + id + "']"
  );

  // Creating span element
  var span = document.createElement("span");
  span.classList.add("badge");
  span.classList.add("bg-secondary");
  span.dataset.id = id;
  // span.innerHTML = id;
  span.innerHTML = selectedOption.textContent;

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
  // Update the hidden input with the added glumci
  updateGlumciInput();
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
