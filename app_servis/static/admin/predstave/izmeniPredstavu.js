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

      const styleLink = document.createElement("link");
      styleLink.rel = "stylesheet";
      styleLink.href = "/main.css"; 
      document.head.appendChild(styleLink);

      selectElementPozorista.addEventListener("change", function () {
        const selectedPozoristaId = selectElementPozorista.value;
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

      zanrovi.forEach((zanr) => {
        const optionHTML = createOption(zanr);
        selectElementZanra.insertAdjacentHTML("beforeend", optionHTML);
      });

      const styleLink = document.createElement("link");
      styleLink.rel = "stylesheet";
      styleLink.href = "/main.css"; 
      document.head.appendChild(styleLink);

      selectElementZanra.addEventListener("change", function () {
        const selectedZanraId = selectElementZanra.value;
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

      glumci.forEach((glumac) => {
        const optionHTML = createOption(glumac);
        selectElementGlumca.insertAdjacentHTML("beforeend", optionHTML);
      });

      const styleLink = document.createElement("link");
      styleLink.rel = "stylesheet";
      styleLink.href = "/main.css"; 
      document.head.appendChild(styleLink);
    });

  selectElementGlumca.addEventListener("change", function () {
    const selectedGlumacId = selectElementGlumca.value;
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

      const glumciUl = document.getElementById("glumciList");

      const selectedGlumciLi = glumciUl.querySelectorAll("li");

      if (selectedGlumciLi.length === 0) {
        console.log("The list is empty.");
        return; 
      }

      if (!confirm("Potvrdi brisanje")) {
        return; 
      }

      const deleteRequests = [];

      selectedGlumciLi.forEach((glumacLi) => {
        const glumacId = glumacLi.dataset.id;

        const deleteRequest = fetch(
          `http://localhost:9000/admin/predstava/${id}/glumac/${glumacId}`,
          {
            method: "DELETE",
          }
        )
          .then((resp) => resp.json())
          .then((data) => {
            glumacLi.remove();
          });

        deleteRequests.push(deleteRequest);
      });
      //Izvrsi sva brisanja
      Promise.all(deleteRequests)
        .then(() => {
          alert("Glumci su uspešno obrisani.");
          window.location.href = `http://localhost:8000/admin/predstave/izmeni-predstavu.html?id=${id}`;
        })
        .catch((err) => console.log(err));
    });

  document.getElementById("datum").min = new Date().toISOString().split("T")[0];

  document.getElementById("forma").addEventListener("submit", function (event) {
    var nazivElement = document.getElementById("naziv");

    if (nazivElement.classList.contains("error")) {
      alert("Molimo ispravite greške pre čuvanja.");
      event.preventDefault(); 
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

        window.location.href = `/admin/predstave/predstave.html`;
      })
      .catch((err) => console.log(err));
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
  if (inputElement.value.length < 3) {
    inputElement.classList.add("error");
    inputElement.classList.remove("success");
  } else {
    inputElement.classList.add("success");
    inputElement.classList.remove("error");
  }
}

async function updateHallOptions(selectedHallId) {
 
  const selectedTheaterId = document.getElementById("izabranoPozoriste").value;

  const hallSelect = document.getElementById("sala");

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

      // Set the selected value if provided
      if (selectedHallId) {
        hallSelect.value = selectedHallId;
      }

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
function dodajGlumca(id) {
  var existingActors = document.querySelectorAll("#unetiGlumci > span.badge");
  for (var i = 0; i < existingActors.length; i++) {
    if (existingActors[i].dataset.id === id) {
      alert("Glumac već postoji u listi.");
      return;
    }
  }
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
