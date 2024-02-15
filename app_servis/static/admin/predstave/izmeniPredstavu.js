var id = null;
var niz = [];
window.addEventListener("load", function () {
  document
    .getElementById("btnNazadIzmeniPredstavu")
    .addEventListener("click", function () {
      location.href = "/admin/predstave/predstave.html";
    });

  var url = new URL(window.location.href);
  id = url.searchParams.get("id");

  const selectElementPozorista = document.getElementById("pozoriste");
  const hiddenInputPozorita = document.getElementById("izabranoPozoriste");
  const hiddenInputSala = document.getElementById("izabranaSala");
  const salaSelectElement = document.getElementById("sala");
  const selectElementZanra = document.getElementById("zanr");
  const hiddenInputZanra = document.getElementById("izabraniZanr");
  const selectElementGlumca = document.getElementById("selectGlumca");
  const hiddenInputGlumca = document.getElementById("izabraniGlumac");

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

      selectElementPozorista.addEventListener("change", function () {
        const selectedPozoristaId = selectElementPozorista.value;
        // Update the hidden input field with the selected Predstava ID
        hiddenInputPozorita.value = selectedPozoristaId;
        updateHallOptions();
      });
    });

  fetch("http://localhost:9000/admin/zanr")
    .then((response) => response.json())
    .then((zanrovi) => {
      console.log(zanrovi);

      const createOption = (zanrovi) => {
        return `<option value="${zanrovi.id}">${zanrovi.naziv}</option>`;
      };

      // Append options to the select element
      zanrovi.forEach((zanr) => {
        const optionHTML = createOption(zanr);
        selectElementZanra.insertAdjacentHTML("beforeend", optionHTML);
      });

      // Dynamically add the link to main.css
      const styleLink = document.createElement("link");
      styleLink.rel = "stylesheet";
      styleLink.href = "/main.css"; // Replace with the correct path to your main.css
      document.head.appendChild(styleLink);

      selectElementZanra.addEventListener("change", function () {
        const selectedZanraId = selectElementZanra.value;
        // Update the hidden input field with the selected Predstava ID
        hiddenInputZanra.value = selectedZanraId;
      });
    });

  fetch("http://localhost:9000/admin/glumac")
    .then((response) => response.json())
    .then((glumci) => {
      console.log(glumci);

      const createOption = (glumac) => {
        return `<option value="${glumac.id}">${glumac.ime}</option>`;
      };

      // Append options to the select element
      glumci.forEach((glumac) => {
        const optionHTML = createOption(glumac);
        selectElementGlumca.insertAdjacentHTML("beforeend", optionHTML);
      });

      // Dynamically add the link to main.css
      const styleLink = document.createElement("link");
      styleLink.rel = "stylesheet";
      styleLink.href = "/main.css"; // Replace with the correct path to your main.css
      document.head.appendChild(styleLink);
    });

  // Add event listener to update hidden input on change
  selectElementGlumca.addEventListener("change", function () {
    const selectedGlumacId = selectElementGlumca.value;
    // Update the hidden input field with the selected Predstava ID
    hiddenInputGlumca.value = selectedGlumacId;
  });

  fetch("http://localhost:9000/admin/predstava/" + id)
    .then((resp) => resp.json())
    .then(async (data) => {
      console.log(data);

      var selectElement = document.getElementById("pozoriste");
      var options = selectElement.options;

      for (var i = 0; i < options.length; i++) {
        if (options[i].value == data.idPozorista) {
          options[i].selected = true;
          break;
        }
      }

      // Set the selected option in the pozoriste select element
      hiddenInputPozorita.value = data.idPozorista;
      await updateHallOptions(data.idSale);

      var selectElement = document.getElementById("zanr");
      var options = selectElement.options;

      for (var i = 0; i < options.length; i++) {
        if (options[i].value == data.idZanra) {
          options[i].selected = true;
          break;
        }
      }
      // Set the selected option in the pozoriste select element
      hiddenInputZanra.value = data.idZanra;

      if (data.PredstavaGlumacs && Array.isArray(data.PredstavaGlumacs)) {
        console.log("PredstavaGlumacs:", data.PredstavaGlumacs);
        // Extract the Predstava records from the PredstavaGlumac associations
        const glumci = data.PredstavaGlumacs.map((pg) => pg.Glumac);

        // Get the ul element by its id
        const glumciUl = document.getElementById("glumciList");

        // Clear existing content of the ul
        glumciUl.innerHTML = "";

        // Append list items for each Predstava to the ul
        glumci.forEach((glumac) => {
          const listItem = document.createElement("li");
          listItem.classList.add("list-group-item", "podlista");
          listItem.textContent = glumac ? glumac.ime : "N/A";
          listItem.dataset.id = glumac ? glumac.id : null;

          glumciUl.appendChild(listItem);

          niz.push(listItem.dataset.id);
        });
      } else {
        console.log("No PredstavaGlumacs data found.");
      }

      document.getElementById("naziv").value = data.naziv;
      document.getElementById("datum").value = data.datum;
      document.getElementById("vreme").value = data.vreme;
      document.getElementById("cena").value = data.cena;
    })
    .catch((err) => console.log(err));

  document
    .getElementById("btnObrisiIzabrane")
    .addEventListener("click", function () {
      // Get the ul element by its id
      const glumciUl = document.getElementById("glumciList");

      // Find all selected predstave li elements
      const selectedGlumciLi = glumciUl.querySelectorAll("li");

      // Check if the NodeList is empty
      if (selectedGlumciLi.length === 0) {
        console.log("The list is empty.");
        return; // Exit the function if the list is empty
      }

      // Ask for confirmation before proceeding
      if (!confirm("Potvrdi brisanje")) {
        return; // Exit the function if the user cancels the confirmation
      }

      // Create an array to store promises for each fetch request
      const deleteRequests = [];

      // Iterate through selected predstave li elements
      selectedGlumciLi.forEach((glumacLi) => {
        const glumacId = glumacLi.dataset.id;

        // Send a request to delete the relationship in the database
        const deleteRequest = fetch(
          `http://localhost:9000/admin/predstava/${id}/glumac/${glumacId}`,
          {
            method: "DELETE",
          }
        )
          .then((resp) => resp.json())
          .then((data) => {
            // Remove the corresponding li element from the UI
            glumacLi.remove();
          });

        // Add the promise to the array
        deleteRequests.push(deleteRequest);
      });

      // Execute all delete requests concurrently
      Promise.all(deleteRequests)
        .then(() => {
          // Inform the user about successful deletion
          alert("Glumci su uspešno obrisani.");
          window.location.href = `http://localhost:8000/admin/predstave/izmeni-predstavu.html?id=${id}`;
        })
        .catch((err) => console.log(err));
    });

  document.getElementById("datum").min = new Date().toISOString().split("T")[0];

  document.getElementById("forma").addEventListener("submit", function (event) {
    var nazivElement = document.getElementById("naziv");

    // Check if the input has the 'error' class
    if (nazivElement.classList.contains("error")) {
      alert("Molimo ispravite greške pre čuvanja.");
      event.preventDefault(); // Prevent form submission
    }

    document.getElementById("izabranaSala").value =
      document.getElementById("sala").value;

    var spanovi = document.querySelectorAll("#unetiGlumci > span.badge");

    for (let i = 0; i < spanovi.length; i++) {
      niz.push(spanovi[i].dataset.id);
    }

    event.preventDefault();
    const izmeniPredstavu = {
      naziv: document.getElementById("naziv").value,
      datum: document.getElementById("datum").value,
      vreme: document.getElementById("vreme").value,
      cena: document.getElementById("cena").value,
      izabranaSala: document.getElementById("izabranaSala").value,
      izabraniZanr: document.getElementById("izabraniZanr").value,
      izabranoPozoriste: document.getElementById("izabranoPozoriste").value,
      izabraniGlumac: niz,
    };

    fetch("http://localhost:9000/admin/predstava/" + id, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(izmeniPredstavu),
    })
      .then(async (response) => {
        console.log("Response status:", response.status);
        if (!response.ok) {
          //Handle 400 Bad Request error
          if (response.status === 400) {
            return response.text().then((errorMessage) => {
              const errorDetails = JSON.parse(errorMessage);

              if (errorDetails.error && errorDetails.error.includes("naziv")) {
                alert("Naziv mora da ima barem 5 karaktera.");
              } else if (
                errorDetails.error &&
                errorDetails.error.includes("datum")
              ) {
                alert("Molimo unesite datum.");
              } else if (
                errorDetails.error &&
                errorDetails.error.includes("vreme")
              ) {
                alert("Molimo unesite vreme.");
              } else if (
                errorDetails.error &&
                errorDetails.error.includes("cena")
              ) {
                alert("Molimo unesite cenu.");
              } else if (
                errorDetails.error &&
                errorDetails.error.includes("sala")
              ) {
                alert("Molimo izaberite salu.");
              } else if (
                errorDetails.error &&
                errorDetails.error.includes("zanr")
              ) {
                alert("Molimo izaberite zanr.");
              } else if (
                errorDetails.error &&
                errorDetails.error.includes("izabranoPozoriste")
              ) {
                alert("Molimo izaberite pozoriste.");
              } else if (
                errorDetails.error &&
                errorDetails.error.includes("izabraniGlumac")
              ) {
                alert("Molimo unesite glumca.");
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
        // alert("Fetched Predstava Data:", data);
        // alert("podaci su: " + novaSala.izabranoPozoriste);
        // alert("izmeniPredstavu: " + izmeniPredstavu.izabraniGlumac);
        window.location.href = `/admin/predstave/predstave.html`;
      })
      .catch((err) => console.log(err));
    // Continue with form submission if no errors
    return true;
  });

  document.getElementById("dodajGlumca").addEventListener("click", function () {
    var id = document.getElementById("selectGlumca").value;
    if (!id) {
      alert("Unesi glumca");
      return;
    }
    dodajGlumca(id);
    document.getElementById("selectGlumca").value = "";
  });

  document.getElementById("btnObrisi").addEventListener("click", function () {
    if (confirm("Potvrdi brisanje")) {
      fetch("http://localhost:9000/admin/predstava/" + id, {
        method: "DELETE",
      })
        .then((resp) => resp.json())
        .then((data) => {
          //response sadrzi samo id obrisanog
          alert("Obrisan je zapis čiji je id: " + data);
          window.location.href = `/admin/predstave/predstave.html`;
        })
        .catch((err) => console.log(err));
    } else {
      return;
    }
  });
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

async function updateHallOptions(selectedHallId) {
  // Get the selected theater
  const selectedTheaterId = document.getElementById("izabranoPozoriste").value;

  // Get the hall select element
  const hallSelect = document.getElementById("sala");

  try {
    const response = await fetch(
      `http://localhost:9000/admin/sala/pozoriste/${selectedTheaterId}`
    );
    const halls = await response.json();
    console.log("Halls data:", halls);

    // Ensure that halls is not null before processing
    if (halls !== null) {
      const optionsHTML = halls
        .map((hall) => `<option value="${hall.id}">${hall.naziv}</option>`)
        .join("");

      // Set the innerHTML of the select element
      hallSelect.innerHTML = optionsHTML;

      // Set the selected value if provided
      if (selectedHallId) {
        hallSelect.value = selectedHallId;
      }

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
}
function dodajGlumca(id) {
  // Check if the play already exists in the list
  var existingActors = document.querySelectorAll("#unetiGlumci > span.badge");
  for (var i = 0; i < existingActors.length; i++) {
    if (existingActors[i].dataset.id === id) {
      alert("Glumac već postoji u listi.");
      return;
    }
  }
  // Find the selected option in the dropdown
  var selectedOption = document.querySelector(
    "#selectGlumca option[value='" + id + "']"
  );

  // Creating span element
  var span = document.createElement("span");
  span.classList.add("badge");
  span.classList.add("bg-secondary");
  span.dataset.id = id;
  span.dataset.name = selectedOption.textContent;
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

  //Append span to the unetePredstave
  document.getElementById("unetiGlumci").appendChild(span);

  //Da bi postojao razmak
  document
    .getElementById("unetiGlumci")
    .appendChild(document.createTextNode(" "));
}
