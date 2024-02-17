window.addEventListener("load", function () {
  document
    .getElementById("btnNazadSala")
    .addEventListener("click", function () {
      location.href = "/admin/sale/sale.html";
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
  });

  document.getElementById("forma").addEventListener("submit", function (event) {
    var nazivElement = document.getElementById("naziv");
    var pozoristeElement = document.getElementById("izabranoPozoriste");
    var brMestElement = document.getElementById("brMesta");

    if (
      nazivElement.classList.contains("error") ||
      pozoristeElement.classList.contains("error") ||
      brMestElement.classList.contains("error")
    ) {
      alert("Molimo ispravite greške pre čuvanja.");
      event.preventDefault(); // Prevent form submission
    } else {

      event.preventDefault();
      const novaSala = {
        naziv: document.getElementById("naziv").value,
        izabranoPozoriste: document.getElementById("izabranoPozoriste").value,
        brMesta: document.getElementById("brMesta").value,
      };

      fetch("http://localhost:9000/admin/sala", {
        method: "POST",
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
                  `Validation failed:\n Naziv mora da ima barem 5 karaktera.`
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
    }
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

function validateInput(inputElement) {
  if (inputElement.value.length < 3) {
    inputElement.classList.add("error");
    inputElement.classList.remove("success");
  } else {
    inputElement.classList.add("success");
    inputElement.classList.remove("error");
  }
}

