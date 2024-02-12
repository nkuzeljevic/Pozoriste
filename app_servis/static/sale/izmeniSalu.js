var id = null;
window.addEventListener("load", function () {
  document
    .getElementById("btnNazadIzmeniSalu")
    .addEventListener("click", function () {
      location.href = "/sale/sale.html";
    });

  const selectElementPozorista = document.getElementById("pozoriste");
  const hiddenInputPozorita = document.getElementById("izabranoPozoriste");

  var url = new URL(window.location.href);
  id = url.searchParams.get("id");
  // alert(id);

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
      // Set the selected option in the pozoriste select element
      selectElementPozorista.value = data.idPozorista;
      document.getElementById("naziv").value = data.naziv;
      document.getElementById("brMesta").value = data.brojMesta;
    })
    .catch((err) => console.log(err));

  // Add event listener to update hidden input on change
  selectElementPozorista.addEventListener("change", function () {
    const selectedPozoristaId = selectElementPozorista.value;
    // Update the hidden input field with the selected Predstava ID
    hiddenInputPozorita.value = selectedPozoristaId;
  });

  var selectBrMestaElement = document.getElementById("brMesta");
  // Add event listener to update hidden input when brMesta changes
  selectBrMestaElement.addEventListener("input", function () {
    const selectedPozoristaId = selectElementPozorista.value;
    // Update the hidden input field with the selected Predstava ID
    hiddenInputPozorita.value = selectedPozoristaId;
  });

  var selectNazivElement = document.getElementById("naziv");
  // Add event listener to update hidden input when brMesta changes
  selectNazivElement.addEventListener("input", function () {
    const selectedPozoristaId = selectElementPozorista.value;
    // Update the hidden input field with the selected Predstava ID
    hiddenInputPozorita.value = selectedPozoristaId;
  });

  document.getElementById("forma").addEventListener("submit", function (event) {
    var nazivElement = document.getElementById("naziv");
    var pozoristeElement = document.getElementById("pozoriste");
    var brMestaElement = document.getElementById("brMesta");

    // Check if the input has the 'error' class
    if (
      nazivElement.classList.contains("error") ||
      pozoristeElement.classList.contains("error") ||
      brMestaElement.classList.contains("error")
    ) {
      alert("Molimo ispravite greške pre čuvanja.");
      event.preventDefault(); // Prevent form submission
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
          //Handle 400 Bad Request error
          if (response.status === 400) {
            // return response.text().then((errorMessage) => {
            //   const errorDetails = JSON.parse(errorMessage);
            //   if (
            //     errorDetails.error &&
            //     errorDetails.error.includes("brMesta")
            //   ) {
            //     alert("Broj mesta mora biti veći od 0.");
            //   } else if (
            //     errorDetails.error &&
            //     errorDetails.error.includes("naziv")
            //   ) {
            //     alert("Naziv mora da ima barem 5 karaktera.");
            //   } else {
            //     alert(errorMessage); // Display the original error message
            //   }

            //   throw new Error(errorMessage);
            // });
            const errorDetails = await response.json();
            console.log("Error details:", errorDetails);
            if (
              errorDetails.error === "Validation failed" &&
              errorDetails.details
            ) {
              // // Handle validation errors
              // const errorMessage = errorDetails.details
              //   .map((detail) => detail.message)
              //   .join("\n");
              // alert(`Validation failed:\n ${detail.message}`);
              errorDetails.details.forEach((detail) => {
                console.log("Validation error detail:", detail);
              });

              // Display the first error message in an alert
              const errorMessage =
                errorDetails.details[0]?.message || "Validation failed.";
              alert(`Validation failed:\n ${errorMessage}`);
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
        // alert("podaci su: " + novaSala.izabranoPozoriste);
        window.location.href = `/sale/sale.html`;
      })
      .catch((err) => console.log(err));

    // Continue with form submission if no errors
    return true;
  });

  document.getElementById("btnObrisi").addEventListener("click", function () {
    if (confirm("Potvrdi brisanje")) {
      fetch("http://localhost:9000/admin/sala/" + id, { method: "DELETE" })
        .then((resp) => resp.json())
        .then((data) => {
          //response sadrzi samo id obrisanog
          alert("Obrisan je zapis čiji je id: " + data);
          window.location.href = `/sale/sale.html`;
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
