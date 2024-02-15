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
      //  Obrada da se salje naziv pozorista, a ne ID
      // const selectElement = document.getElementById("pozoriste");
      // const izabranoPozoriste =
      //   selectElement.options[selectElement.selectedIndex].text;
      // // Update the hidden input field (optional, for server-side validation)
      // document.getElementById("izabranoPozoriste").value = izabranoPozoriste;

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
            // Handle 400 Bad Request error
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

// function validate() {
//   var nazivElement = document.getElementById("naziv");
//   if (nazivElement.classList.contains("error")) {
//     alert("Molimo ispravite greške pre čuvanja.");
//     return false; // Prevent form submission
//   }
//   // Continue with form submission if no errors
//   return true;
// }
