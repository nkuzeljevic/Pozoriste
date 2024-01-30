window.addEventListener("load", function () {
  // document.addEventListener("DOMContentLoaded", function () {

  // Initialize the hall options based on the default selected theater
  updateHallOptions();

  // Ako se promeni izabrano pozoriste da se pokrene iz pocetka
  document
    .getElementById("pozoriste")
    .addEventListener("change", updateHallOptions);

  document
    .getElementById("btnNazadPredstave")
    .addEventListener("click", function () {
      location.href = "/predstave/predstave.html";
    });

  //spreciti datume starije od danas
  document.getElementById("datum").min = new Date().toISOString().split("T")[0];

  document.getElementById("btnUnesi").addEventListener("click", function () {
    const formData = {
      naziv: document.getElementById("naziv").value,
      pozoriste: document.getElementById("pozoriste").value,
      datum: document.getElementById("datum").value,
      vreme: document.getElementById("vreme").value,
      sala: document.getElementById("sala").value,
      cena: document.getElementById("cena").value,
      brMesta: document.getElementById("brMesta").value,
    };

    if (validate(formData)) {
      console.log("Form data submitted:", formData);
      // Perform form submission or any other actions here
    } else {
      console.log("Form data validation failed.");
    }
  });

  var addedGenres = [];
  //Novi zanr
  document
    .getElementById("dodajNovZanr")
    .addEventListener("click", function () {
      var id = document.getElementById("novZanr").value;
      if (!id) {
        alert("Unesi žanr");
        return;
      }
      dodajZanr(id);
      addedGenres.push(id); // Keep track of added genres
      document.getElementById("novZanr").value = "";
      document.getElementById("zanr").value = id;
    });

  //Obrisi zanr
  document.getElementById("obrisiZanr").addEventListener("click", function () {
    var selectedGenre = document.getElementById("zanr").value;
    if (confirm("Da li si siguran da želiš da obrišeš?")) {
      if (selectedGenre) {
        removeOptionByValue(document.getElementById("zanr"), selectedGenre);

        // Remove the genre from the addedGenres array
        var index = addedGenres.indexOf(selectedGenre);
        if (index !== -1) {
          addedGenres.splice(index, 1);
        }
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

    //prevodjenje glumaca u json
    updateGlumciInput();
    // var spanovi = document.querySelectorAll("#unetiGlumci > span.badge");
    // var niz = [];
    // for (let i = 0; i < spanovi.length; i++) {
    //   niz.push(spanovi[i].dataset.id);
    // }
    // var jsonString = JSON.stringify(niz);

    // var glumciInput = "glumciInput";
    // document.getElementById(glumciInput).value = jsonString;
    // console.log(document.getElementById(glumciInput).value);
    // // Continue with form submission if no errors
    // return true;
  });
});

function updateHallOptions() {
  // Get the selected theater
  const selectedTheater = document.getElementById("pozoriste").value;

  // Get the hall select element
  const hallSelect = document.getElementById("sala");

  // Clear existing options
  hallSelect.innerHTML = "";

  // Add options based on the selected theater
  switch (selectedTheater) {
    case "atelje":
      addHallOption("Scena Petar Kralj");
      addHallOption("Scena Mire Trailović");
      break;
    case "bdp":
      addHallOption("Velika scena");
      addHallOption("Mala sala");
      break;
    case "jdp":
      addHallOption("Velika scena Ljuba Tadić");
      addHallOption("Scena Studio JDP");
      break;
    case "pozoristeNaTerazijama":
      addHallOption("Velika scena");
      addHallOption("Mala sala");
      break;
    case "zvezdaraTeatar":
      addHallOption("Scena Bata Stojković");
      addHallOption("Nova scena");
      break;

    // Default case (if no theater is selected)
    default:
      addHallOption("Izaberite pozorište");
  }
}

function addHallOption(optionText) {
  const option = document.createElement("option");
  option.text = optionText;
  document.getElementById("sala").add(option);
}

function dodajGlumca(id) {
  // Creating span element
  var span = document.createElement("span");
  span.classList.add("badge");
  span.classList.add("bg-secondary");
  span.dataset.id = id;
  span.innerHTML = id;

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

function dodajZanr(id) {
  // Creating span element
  var option = document.createElement("option");
  // option.dataset.value = id;
  option.value = id;
  option.innerHTML = id;

  //Append span to the unetePredstave
  document.getElementById("zanr").appendChild(option);
}
function removeOptionByValue(selectElement, value) {
  for (var i = 0; i < selectElement.options.length; i++) {
    if (selectElement.options[i].value === value) {
      selectElement.remove(i);
      break;
    }
  }
}

// document.addEventListener("DOMContentLoaded", function () {
//   document
//     .getElementById("btnNazadPredstave")
//     .addEventListener("click", function () {
//       location.href = "/predstave/predstave.html";
//     });
// });

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

function validate() {
  var nazivElement = document.getElementById("naziv");
  if (nazivElement.classList.contains("error")) {
    alert("Molimo ispravite greške pre čuvanja.");
    return false; // Prevent form submission
  }
  // Continue with form submission if no errors
  return true;
}
