window.addEventListener("load", function () {
  document.getElementById("forma").addEventListener("submit", function (event) {
    var imeElement = document.getElementById("ime");

    // Check if the input has the 'error' class
    if (imeElement.classList.contains("error")) {
      alert("Molimo ispravite greške pre čuvanja.");
      event.preventDefault(); // Prevent form submission
    }

    var spanovi = document.querySelectorAll("#unetePredstave > span.badge");
    var niz = [];
    for (let i = 0; i < spanovi.length; i++) {
      niz.push(spanovi[i].dataset.id);
    }
    var jsonString = JSON.stringify(niz);

    var predstaveInput = "predstaveInput";
    document.getElementById(predstaveInput).value = jsonString;
    console.log(document.getElementById(predstaveInput).value);
    // Continue with form submission if no errors
    return true;
  });

  document
    .getElementById("btnNazadGlumac")
    .addEventListener("click", function () {
      location.href = "/glumci/glumci.html";
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

  //Append span to the unetePredstave
  document.getElementById("unetePredstave").appendChild(span);

  //Da bi postojao razmak
  document
    .getElementById("unetePredstave")
    .appendChild(document.createTextNode(" "));

  //Brisanje dodatog elementa
  button.addEventListener("click", function () {
    var id = this.parentNode.dataset.id;
    if (confirm("Da li si siguran da želiš da obrišeš?")) {
      this.parentNode.parentNode.removeChild(this.parentNode);
    }
  });
}
