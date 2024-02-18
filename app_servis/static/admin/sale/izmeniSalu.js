var id = null;
window.addEventListener("load", function () {
  document
    .getElementById("btnNazadIzmeniSalu")
    .addEventListener("click", function () {
      location.href = "/admin/sale/sale.html";
    });

  const selectElementPozorista = document.getElementById("pozoriste");
  const hiddenInputPozorita = document.getElementById("izabranoPozoriste");

  var url = new URL(window.location.href);
  id = url.searchParams.get("id");

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

  fetch("http://localhost:9000/admin/sala/" + id)
    .then((resp) => resp.json())
    .then((data) => {
      console.log(data);
      var selectElement = document.getElementById("pozoriste");
      var options = selectElement.options;

      for (var i = 0; i < options.length; i++) {
        if (options[i].value == data.idPozorista) {
          options[i].selected = true;
          break;
        }
      }

      selectElementPozorista.value = data.idPozorista;
      document.getElementById("naziv").value = data.naziv;
      document.getElementById("brMesta").value = data.brojMesta;
    })
    .catch((err) => console.log(err));

  selectElementPozorista.addEventListener("change", function () {
    const selectedPozoristaId = selectElementPozorista.value;
    hiddenInputPozorita.value = selectedPozoristaId;
  });

  var selectBrMestaElement = document.getElementById("brMesta");

  selectBrMestaElement.addEventListener("input", function () {
    const selectedPozoristaId = selectElementPozorista.value;
    hiddenInputPozorita.value = selectedPozoristaId;
  });

  var selectNazivElement = document.getElementById("naziv");
  selectNazivElement.addEventListener("input", function () {
    const selectedPozoristaId = selectElementPozorista.value;
    hiddenInputPozorita.value = selectedPozoristaId;
  });

  document.getElementById("forma").addEventListener("submit", function (event) {
    var nazivElement = document.getElementById("naziv");
    var pozoristeElement = document.getElementById("pozoriste");
    var brMestaElement = document.getElementById("brMesta");

    if (
      nazivElement.classList.contains("error") ||
      pozoristeElement.classList.contains("error") ||
      brMestaElement.classList.contains("error")
    ) {
      alert("Molimo ispravite greške pre čuvanja.");
      event.preventDefault(); 
    }

    event.preventDefault();
    const novaSala = {
      naziv: document.getElementById("naziv").value,
      izabranoPozoriste: document.getElementById("izabranoPozoriste").value,
      brMesta: document.getElementById("brMesta").value,
    };
    fetch("http://localhost:9000/admin/sala/" + id, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(novaSala),
    })
    .then(async (response) => {
          console.log("Response status:", response.status);
          if (!response.ok) {
            if (response.status === 400) {
              const errorDetails = await response.json();
              console.log("Error details:", errorDetails);
              if (
                errorDetails.error === "Validation failed" &&
                errorDetails.details
              ) {
                // Handle validation errors
                const errorMessage = errorDetails.details
                  .map((detail) => detail.message)
                  .join("\n");
                alert(
                  `Naziv mora da ima barem 5 karaktera.`
                );
              } else {
                throw new Error("Server error: " + response.status);
              }
            } else {
              throw new Error("Server error: " + response.status);
            }
          }
          return response.json();
        })
      .then((data) => {
        console.log("Fetched Predstava Data:", data);
        window.location.href = `/admin/sale/sale.html`;
      })
      .catch((err) => console.log(err));

    return true;
  });

  document.getElementById("btnObrisi").addEventListener("click", function () {
    if (confirm("Potvrdi brisanje")) {
      fetch("http://localhost:9000/admin/sala/" + id, { method: "DELETE" })
        .then((resp) => resp.json())
        .then((data) => {
          alert("Obrisan je zapis čiji je id: " + data);
          window.location.href = `/admin/sale/sale.html`;
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
