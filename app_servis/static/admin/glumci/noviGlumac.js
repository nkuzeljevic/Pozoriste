window.addEventListener("load", function () {
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

  const selectElementPredstave = document.getElementById("predstave");
  const hiddenInputPredstava = document.getElementById("izabranaPredstava");

 
  selectElementPredstave.addEventListener("change", function () {
    const selectedPredstavaId = selectElementPredstave.value;
    hiddenInputPredstava.value = selectedPredstavaId;
  });

  document.getElementById("forma").addEventListener("submit", function (event) {
    var imeElement = document.getElementById("ime");

    if (imeElement.classList.contains("error")) {
      alert("Molimo ispravite greške pre čuvanja.");
      event.preventDefault(); 
    }

    var spanovi = document.querySelectorAll("#unetePredstave > span.badge");
    var niz = [];
    for (let i = 0; i < spanovi.length; i++) {
      niz.push(spanovi[i].dataset.id);
    }

    event.preventDefault(); 

    const noviGlumac = {
      ime: document.getElementById("ime").value,
      opis: document.getElementById("opis").value,
      izabranaPredstava: niz,
    };
    console.log(JSON.stringify(niz));

    fetch("http://localhost:9000/admin/glumac", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(noviGlumac),
    })
      .then((response) => {
        if (!response.ok) {
          if (response.status === 400) {
            return response.text().then((errorMessage) => {
              const errorDetails = JSON.parse(errorMessage);

              if (errorDetails.error && errorDetails.error.includes("ime")) {
                alert("Ime mora da ima barem 5 karaktera.");
              }else if (errorDetails.error && errorDetails.error.includes("izabranaPredstava")){
                alert("Molimo izaberite predstavu");
              }
              else {
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
    .getElementById("btnNazadGlumac")
    .addEventListener("click", function () {
      location.href = "/admin/glumci/glumci.html";
    });

  document
    .getElementById("dodajPredstavu")
    .addEventListener("click", function () {
      var id = document.getElementById("predstave").value;
      if (!id) {
        alert("Unesi predstvu");
        return;
      }
      dodajPredstavu(id);
      document.getElementById("predstave").value = "";
    });

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
    "#predstave option[value='" + id + "']"
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

  button.addEventListener("click", function () {
    var id = this.parentNode.dataset.id;
    if (confirm("Da li si siguran da želiš da obrišeš?")) {
      this.parentNode.parentNode.removeChild(this.parentNode);
    }
  });
}

