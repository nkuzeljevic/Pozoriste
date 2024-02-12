var id = null;

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

      // Append options to the select element
      predstave.forEach((predstava) => {
        const optionHTML = createOption(predstava);
        selectElementPredstave.insertAdjacentHTML("beforeend", optionHTML);
      });

      // Dynamically add the link to main.css
      const styleLink = document.createElement("link");
      styleLink.rel = "stylesheet";
      styleLink.href = "/main.css"; // Replace with the correct path to your main.css
      document.head.appendChild(styleLink);
    });

  const selectElementPredstave = document.getElementById("selectPredstave");
  const hiddenInputPredstava = document.getElementById("izabranaPredstava");

  // Add event listener to update hidden input on change
  selectElementPredstave.addEventListener("change", function () {
    const selectedPredstavaId = selectElementPredstave.value;
    // Update the hidden input field with the selected Predstava ID
    hiddenInputPredstava.value = selectedPredstavaId;
  });
  fetch("http://localhost:9000/admin/glumac/" + id)
    .then((resp) => resp.json())
    .then((data) => {
      console.log(data);

      if (data.PredstavaGlumacs && Array.isArray(data.PredstavaGlumacs)) {
        console.log("PredstavaGlumacs:", data.PredstavaGlumacs);
        // Extract the Predstava records from the PredstavaGlumac associations
        const predstave = data.PredstavaGlumacs.map((pg) => pg.Predstava);

        // Get the ul element by its id
        const predstaveUl = document.getElementById("predstaveList");

        // Clear existing content of the ul
        predstaveUl.innerHTML = "";

        // Append list items for each Predstava to the ul
        predstave.forEach((predstava) => {
          const listItem = document.createElement("li");
          listItem.classList.add("list-group-item", "podlista");
          listItem.textContent = predstava ? predstava.naziv : "N/A";
          predstaveUl.appendChild(listItem);
        });
      } else {
        console.log("No PredstavaGlumacs data found.");
      }

      document.getElementById("ime").value = data.ime;
      document.getElementById("opis").value = data.opis;
    })
    .catch((err) => console.log(err));

  // document
  //   .getElementById("btnObrisiIzabrane")
  //   .addEventListener("click", function () {
  //     if (confirm("Potvrdi brisanje")) {
  //       // Get the ul element by its id
  //       const predstaveUl = document.getElementById("unetePredstave");

  //       // Find all selected predstave li elements
  //       const selectedPredstaveLi = predstaveUl.querySelectorAll("li");

  //       // Create an array to store promises for each fetch request
  //       const deleteRequests = [];

  //       // Iterate through selected predstave li elements
  //       selectedPredstaveLi.forEach((predstavaLi) => {
  //         const predstavaId = predstavaLi.dataset.id;

  //         // Send a request to delete the relationship in the database
  //         const deleteRequest = fetch(
  //           `http://localhost:9000/admin/glumac/${id}/predstava/${predstavaId}`,
  //           {
  //             method: "DELETE",
  //           }
  //         )
  //           .then((resp) => resp.json())
  //           .then((data) => {
  //             // Remove the corresponding li element from the UI
  //             predstavaLi.remove();
  //           });

  //         // Add the promise to the array
  //         deleteRequests.push(deleteRequest);
  //       });

  //       // Execute all delete requests concurrently
  //       Promise.all(deleteRequests)
  //         .then(() => {
  //           // Inform the user about successful deletion
  //           alert("Predstave su uspešno obrisane.");
  //         })
  //         .catch((err) => console.log(err));
  //     } else {
  //       return;
  //     }
  //   });
  //sadrzaj funkcije koja ce se pozvati kada browser proglasi stranicu ucitanom
  //tj DOM tree potpuno formiranim
  document.getElementById("forma").addEventListener("submit", function (event) {
    var imeElement = document.getElementById("ime");
    var predstavaElement = document.getElementById("predstave");

    // Check if the input has the 'error' class
    if (
      imeElement.classList.contains("error") ||
      predstavaElement.classList.contains("error")
    ) {
      alert("Molimo ispravite greške pre čuvanja.");
      event.preventDefault(); // Prevent form submission
    }

    var spanovi = document.querySelectorAll("#unetePredstave > span.badge");
    var niz = [];
    for (let i = 0; i < spanovi.length; i++) {
      niz.push(spanovi[i].dataset.id);
    }
    // Continue with form submission if no errors
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
      location.href = "/glumci/glumci.html";
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
function dodajPredstavu(id) {
  // Check if the play already exists in the list
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
  document.getElementById("unetePredstave").appendChild(span);

  //Da bi postojao razmak
  document
    .getElementById("unetePredstave")
    .appendChild(document.createTextNode(" "));

  //Brisanje dodatog elementa
  // button.addEventListener("click", function () {
  //   var id = this.parentNode.dataset.id;
  //   if (confirm("Da li si siguran da želiš da obrišeš?")) {
  //     this.parentNode.parentNode.removeChild(this.parentNode);
  //   }
  // });
}
