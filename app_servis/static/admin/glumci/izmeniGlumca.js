var id = null;
var niz = [];
window.addEventListener("load", function () {
  var url = new URL(window.location.href);
  id = url.searchParams.get("id");

  fetch("http://localhost:9000/admin/predstava")
    .then((response) => response.json())
    .then((predstave) => {
      console.log(predstave);

      const createOption = (predstava) => {
        return `<option value="${predstava.id}">${predstava.naziv}</option>`;
      };

      predstave.forEach((predstava) => {
        const optionHTML = createOption(predstava);
        selectElementPredstave.insertAdjacentHTML("beforeend", optionHTML);
      });

      const styleLink = document.createElement("link");
      styleLink.rel = "stylesheet";
      styleLink.href = "/main.css"; 
      document.head.appendChild(styleLink);
    });

  const selectElementPredstave = document.getElementById("selectPredstave");
  const hiddenInputPredstava = document.getElementById("izabranaPredstava");


  selectElementPredstave.addEventListener("change", function () {
    const selectedPredstavaId = selectElementPredstave.value;
    hiddenInputPredstava.value = selectedPredstavaId;
  });

  fetch("http://localhost:9000/admin/glumac/" + id)
    .then((resp) => resp.json())
    .then((data) => {
      console.log(data);

      if (data.PredstavaGlumacs && Array.isArray(data.PredstavaGlumacs)) {
        console.log("PredstavaGlumacs:", data.PredstavaGlumacs);

        const predstave = data.PredstavaGlumacs.map((pg) => pg.Predstava);

        // Get the ul element by its id
        const predstaveUl = document.getElementById("predstaveList");

        predstaveUl.innerHTML = "";

        // Append list items for each Predstava to the ul
        predstave.forEach((predstava) => {
          const listItem = document.createElement("li");
          listItem.classList.add("list-group-item", "podlista");
          listItem.textContent = predstava ? predstava.naziv : "N/A";
          listItem.dataset.id = predstava ? predstava.id : null;

          predstaveUl.appendChild(listItem);

          niz.push(listItem.dataset.id);
        });
      } else {
        console.log("No PredstavaGlumacs data found.");
      }

      document.getElementById("ime").value = data.ime;
      document.getElementById("opis").value = data.opis;
    })
    .catch((err) => console.log(err));

  document
    .getElementById("btnObrisiIzabrane")
    .addEventListener("click", function () {

      const predstaveUl = document.getElementById("predstaveList");

      const selectedPredstaveLi = predstaveUl.querySelectorAll("li");

      if (selectedPredstaveLi.length === 0) {
        console.log("The list is empty.");
        return; 
      }

      if (!confirm("Potvrdi brisanje")) {
        return; 
      }

      const deleteRequests = [];

      selectedPredstaveLi.forEach((predstavaLi) => {
        const predstavaId = predstavaLi.dataset.id;

        const deleteRequest = fetch(
          `http://localhost:9000/admin/glumac/${id}/predstava/${predstavaId}`,
          {
            method: "DELETE",
          }
        )
          .then((resp) => resp.json())
          .then((data) => {
            predstavaLi.remove();
          });

        deleteRequests.push(deleteRequest);
      });

      // Execute all delete requests concurrently
      Promise.all(deleteRequests)
        .then(() => {
          alert("Predstave su uspešno obrisane.");
          window.location.href = `http://localhost:8000/admin/glumci/izmeni-glumca.html?id=${id}`;
        })
        .catch((err) => console.log(err));
    });

  document.getElementById("forma").addEventListener("submit", function (event) {
    var imeElement = document.getElementById("ime");
    var predstavaElement = document.getElementById("predstaveInput");

    if (
      imeElement.classList.contains("error") ||
      predstavaElement.classList.contains("error")
    ) {
      alert("Molimo ispravite greške pre čuvanja.");
      event.preventDefault(); 
    }

    var spanovi = document.querySelectorAll("#unetePredstave > span.badge");

    for (let i = 0; i < spanovi.length; i++) {
      niz.push(spanovi[i].dataset.id);
    }

    event.preventDefault();
    const izmeniGlumca = {
      ime: document.getElementById("ime").value,
      opis: document.getElementById("opis").value,
      izabranaPredstava: niz,
    };
    fetch("http://localhost:9000/admin/glumac/" + id, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(izmeniGlumca),
    })
      .then(async (response) => {
        console.log("Response status:", response.status);
        if (!response.ok) {
          if (response.status === 400) {
            return response.text().then((errorMessage) => {
              const errorDetails = JSON.parse(errorMessage);

              if (errorDetails.error && errorDetails.error.includes("ime")) {
                alert("Ime i prezime moraju da imaju barem 5 karaktera.");
              } else if (
                errorDetails.error &&
                errorDetails.error.includes("opis")
              ) {
                alert("Molimo unesite opis.");
              } else if (
                errorDetails.error &&
                errorDetails.error.includes("izabranaPredstava")
              ) {
                alert("Molimo izaberite predstavu");
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
        window.location.href = `/admin/glumci/glumci.html`;
      })
      .catch((err) => console.log(err));

    return true;
  });

  document
    .getElementById("dodajPredstavu")
    .addEventListener("click", function () {
      var id = document.getElementById("selectPredstave").value;
      if (!id) {
        alert("Unesi predstvu");
        return;
      }
      dodajPredstavu(id);
      document.getElementById("selectPredstave").value = "";
    });
  document
    .getElementById("btnNazadIzmeniGlumca")
    .addEventListener("click", function () {
      location.href = "/admin/glumci/glumci.html";
    });

  document.getElementById("btnObrisi").addEventListener("click", function () {
    if (confirm("Potvrdi brisanje")) {
      fetch("http://localhost:9000/admin/glumac/" + id, {
        method: "DELETE",
      })
        .then((resp) => resp.json())
        .then((data) => {
          alert("Obrisan je zapis čiji je id: " + data);
          window.location.href = `/admin/glumci/glumci.html`;
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
  //   return validno;
}
function dodajPredstavu(id) {
  var existingPlays = document.querySelectorAll("#unetePredstave > span.badge");
  for (var i = 0; i < existingPlays.length; i++) {
    if (existingPlays[i].dataset.id === id) {
      alert("Predstava već postoji u listi.");
      return;
    }
  }
  // Find the selected option in the dropdown
  var selectedOption = document.querySelector(
    "#selectPredstave option[value='" + id + "']"
  );

  // Creating span element
  var span = document.createElement("span");
  span.classList.add("badge");
  span.classList.add("bg-secondary");
  span.dataset.id = id;
  span.dataset.name = selectedOption.textContent;
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
  document.getElementById("unetePredstave").appendChild(span);

  //Da bi postojao razmak
  document
    .getElementById("unetePredstave")
    .appendChild(document.createTextNode(" "));
}
