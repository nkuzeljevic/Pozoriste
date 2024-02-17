window.addEventListener("load", function () {
  fetch("http://localhost:9000/admin/glumac")
    .then((response) => response.json())
    .then((glumci) => {
      console.log(glumci);

      const createOption = (glumci) => {
        return `<option value="${glumci.id}">${glumci.ime}</option>`;
      };

      glumci.forEach((glumac) => {
        const optionHTML = createOption(glumac);
        selectElementGlumci.insertAdjacentHTML("beforeend", optionHTML);
      });

      const styleLink = document.createElement("link");
      styleLink.rel = "stylesheet";
      styleLink.href = "/main.css"; 
      document.head.appendChild(styleLink);
    });
  const selectElementGlumci = document.getElementById("glumci");
  const hiddenInputGlumci = document.getElementById("izabraniGlumci");

  selectElementGlumci.addEventListener("change", function () {
    const selectedGlumacId = selectElementGlumci.value;
    hiddenInputGlumci.value = selectedGlumacId;
  });

  fetch("http://localhost:9000/admin/zanr")
    .then((response) => response.json())
    .then((zanrovi) => {
      console.log(zanrovi);

      const createOption = (zanrovi) => {
        return `<option value="${zanrovi.id}" data-name="${zanrovi.naziv}">${zanrovi.naziv}</option>`;
      };

      zanrovi.forEach((zanr) => {
        const optionHTML = createOption(zanr);
        selectElementZanrovi.insertAdjacentHTML("beforeend", optionHTML);
      });

      const styleLink = document.createElement("link");
      styleLink.rel = "stylesheet";
      styleLink.href = "/main.css"; 
      document.head.appendChild(styleLink);
    });
  const selectElementZanrovi = document.getElementById("zanr");
  const hiddenInputZanrovi = document.getElementById("izabraniZanr");

  selectElementZanrovi.addEventListener("change", function () {
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

      pozorista.forEach((pozoriste) => {
        const optionHTML = createOption(pozoriste);
        selectElementPozorista.insertAdjacentHTML("beforeend", optionHTML);
      });

      const styleLink = document.createElement("link");
      styleLink.rel = "stylesheet";
      styleLink.href = "/main.css"; 
      document.head.appendChild(styleLink);
    });

  const selectElementPozorista = document.getElementById("pozoriste");
  const hiddenInputPozorita = document.getElementById("izabranoPozoriste");

 
  selectElementPozorista.addEventListener("change", function () {
    const selectedPozoristaId = selectElementPozorista.value;
    hiddenInputPozorita.value = selectedPozoristaId;
    updateHallOptions();
  });
  
  document
    .getElementById("btnNazadPredstave")
    .addEventListener("click", function () {
      location.href = "/admin/predstave/predstave.html";
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
      event.preventDefault(); 
    } else {
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

      var glumciInput = "glumciInput";
      document.getElementById(glumciInput).value = niz;
      console.log("niz: " + niz);

      document.getElementById("izabranaSala").value =
        document.getElementById("sala").value;

      event.preventDefault();
      const novaPredstava = {
        naziv: document.getElementById("naziv").value,
        datum: document.getElementById("datum").value,
        vreme: document.getElementById("vreme").value,
        izabranoPozoriste: document.getElementById("izabranoPozoriste").value,
        izabraniZanr: document.getElementById("izabraniZanr").value,
        izabranaSala: document.getElementById("izabranaSala").value,
        glumciInput: document.getElementById("glumciInput").value,
        cena: document.getElementById("cena").value,
      };

      console.log(JSON.stringify(niz));
      console.log(novaPredstava);

      fetch("http://localhost:9000/admin/predstava", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(novaPredstava),
      })
        .then((response) => {
          console.log("Response status:", response.status);
          if (!response.ok) {
            if (response.status === 400) {
              return response.json().then((errorDetails) => {
                console.log("Error details:", errorDetails);
                if (
                  errorDetails.error === "Validation failed" &&
                  errorDetails.details
                ) {
                  // Handle validation errors
                  errorDetails.details.forEach((detail) => {
                    alert("Naziv mora da ima barem 5 kraktera.");
                  });
                  return Promise.reject(new Error("Validation failed"));
                } else {
                  throw new Error("Server error: " + response.status);
                }
              });
            } else {
              throw new Error("Server error: " + response.status);
            }
          }
          return response.json();
        })
        .then((data) => {
          if (data) {
            console.log("Fetched Predstava Data:", data);
            window.location.href = `/admin/predstave/predstave.html`;
          }
        })
        .catch((err) => {
          if (err.message !== "Validation failed") {
            console.log(err);
          }
        });
    }
  });

  var addedGenres = [];
  //Novi zanr
  document
    .getElementById("dodajNovZanr")
    .addEventListener("click", function () {
      var naziv = document.getElementById("novZanr").value;
      // if (!id) {
      if (!naziv) {
        alert("Unesi žanr");
        return;
      }
      (async () => {
        try {
          const response = await fetch("http://localhost:9000/admin/zanr", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ naziv }),
          });

          if (!response.ok) {
            throw new Error("Server error: " + response.status);
          }

          const novoDodatiZanr = await response.json();
          appendZanrToSelect(novoDodatiZanr);

        } catch (error) {
          console.error("Error adding genre:", error);
          if (error.response && error.response.status === 400) {
            const errorDetails = await error.response.json();

            if (
              errorDetails.error === "Validation failed" &&
              errorDetails.details
            ) {
              const errorMessage = errorDetails.details
                .map((detail) => `${detail.field}: ${detail.message}`)
                .join("\n");

              alert(`Validation failed:\n${errorMessage}`);
            } else {
              alert("Server error: " + errorDetails.error);
            }
          } else {
            alert("Zanr mora da ima barem 5 kraktera.");
          }
        }
      })();
      document.getElementById("novZanr").value = "";
    });

  //Obrisi zanr
  document
    .getElementById("obrisiZanr")
    .addEventListener("click", async function () {
      var selectedGenre = document.getElementById("zanr").value;

      if (!selectedGenre) {
        alert("Izaberi žanr koji želiš da obrišeš");
        return;
      }

      if (confirm("Da li si siguran da želiš da obrišeš?")) {
        try {
          const response = await fetch(
            "http://localhost:9000/admin/zanr/" + selectedGenre,
            {
              method: "DELETE",
            }
          );

          if (!response.ok) {
            throw new Error("Server error: " + response.status);
          }

          const deletedGenre = await response.json();

          alert("Obrisan je žanr čiji je id: " + deletedGenre);

          // Remove the genre from the addedGenres array
          var index = addedGenres.indexOf(selectedGenre);
          if (index !== -1) {
            addedGenres.splice(index, 1);
          }

          // Remove the option from the select element
          removeOptionByValue(document.getElementById("zanr"), selectedGenre);
        } catch (error) {
          console.error("Error deleting genre:", error);
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
  });

  function showAlert(message) {
    alert(message);
  }
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

  document.getElementById("izmeniZanr").addEventListener("click", function () {

    const selectedOption =
      selectElementZanrovi.options[selectElementZanrovi.selectedIndex];

    if (selectedOption) {
      const selectedZanrId = selectedOption.value;
      const selectedZanrName = selectedOption.dataset.name;

      document.getElementById("izmeni").value = selectedZanrName;
      document.getElementById("izmeniId").value = selectedZanrId;
    } else {
      console.error("No option selected.");
    }
  });

  document.getElementById("sacuvajZanr").addEventListener("click", function () {

    const izmeniValue = document.getElementById("izmeni").value.trim();

    if (izmeniValue) {

      const selectedOption =
        selectElementZanrovi.options[selectElementZanrovi.selectedIndex];

      if (selectedOption) {
        const selectedZanrId = selectedOption.value;

        fetch("http://localhost:9000/admin/zanr/" + selectedZanrId, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ naziv: izmeniValue }),
        })
          .then(async (response) => {
            console.log("Response status:", response.status);
            if (!response.ok) {
              if (response.status === 400) {
                return response.text().then((errorMessage) => {
                  const errorDetails = JSON.parse(errorMessage);

                  if (
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
           selectedOption.text = izmeniValue;
            izmeni.value = "";
          })
          .catch((err) => console.log(err));
      } else {
        console.error("No option selected.");
      }
    } else {
      console.error("Izmeni input field cannot be empty.");
    }
  });
});

async function updateHallOptions() {

  const selectedTheaterId = document.getElementById("izabranoPozoriste").value;


  const hallSelect = document.getElementById("sala");
  const selectedHallId = hallSelect.value;
  document.getElementById("izabranaSala").value = selectedHallId;
  console.log("Selected theater ID:", selectedTheaterId);
  console.log("selectedHallId: ", selectedHallId);

  // Clear existing options
  hallSelect.innerHTML = "";

  try {
    const response = await fetch(
      `http://localhost:9000/admin/sala/pozoriste/${selectedTheaterId}`
    );
    const halls = await response.json();
    console.log("Halls data:", halls);

    if (halls !== null) {
      const optionsHTML = halls
        .map((hall) => `<option value="${hall.id}">${hall.naziv}</option>`)
        .join("");

      hallSelect.innerHTML = optionsHTML;

      hallSelect.addEventListener("change", function () {
        console.log("Hall select changed");
        const selectedHallId = hallSelect.value;
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

async function dodajZanr(naziv) {
  try {
    const response = await fetch("http://localhost:9000/admin/zanr", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ naziv }),
    });

    if (!response.ok) {
      throw new Error("Server error: " + response.status);
    }

    const novoDodatiZanr = await response.json();
    appendZanrToSelect(novoDodatiZanr);
   
  } catch (err) {
    console.error("Error adding genre:", err);
    alert("Error adding genre. Check the console for details.");
  }
}

function appendZanrToSelect(zanr) {
  var existingGenres = document.querySelectorAll("#zanr option");
  for (var i = 0; i < existingGenres.length; i++) {
    if (existingGenres[i].value === zanr.id.toString()) {
      alert("Žanr već postoji u listi.");
      return;
    }
  }

  var option = document.createElement("option");
  option.value = zanr.id;
  option.innerHTML = zanr.naziv;
  document.getElementById("zanr").appendChild(option);
  document.getElementById("zanr").value = zanr.id;
}

function removeOptionByValue(selectElement, value) {
  for (var i = 0; i < selectElement.options.length; i++) {
    if (selectElement.options[i].value === value) {
      selectElement.remove(i);
      break;
    }
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

function validate() {
  var nazivElement = document.getElementById("naziv");
  if (nazivElement.classList.contains("error")) {
    alert("Molimo ispravite greške pre čuvanja.");
    return false;
  }
  return true;
}
