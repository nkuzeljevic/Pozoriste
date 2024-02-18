var id = null;

window.addEventListener("load", function () {
  var url = new URL(window.location.href);
  id = url.searchParams.get("id");

  fetch("http://localhost:9000/admin/pozoriste/" + id) 
    .then((resp) => resp.json())
    .then((data) => {
      console.log(data); 
      document.getElementById("naziv").value = data.naziv;
      document.getElementById("adresa").value = data.adresa;
      document.getElementById("telefon").value = data.telefon;
      document.getElementById("email").value = data.email;
      document.getElementById("opis").value = data.opis;
    })
    .catch((err) => console.log(err));


  document.getElementById("forma").addEventListener("submit", function (event) {
    var nazivElement = document.getElementById("naziv");
    var adresaElement = document.getElementById("adresa");
    var phoneElement = document.getElementById("telefon");
    var emailElement = document.getElementById("email");

    if (
      nazivElement.classList.contains("error") ||
      adresaElement.classList.contains("error") ||
      phoneElement.classList.contains("error") ||
      emailElement.classList.contains("error")
    ) {
      alert("Molimo ispravite greške pre čuvanja.");
      event.preventDefault(); 
    }
    event.preventDefault();
    const izmeniPozoriste = {
      naziv: document.getElementById("naziv").value,
      adresa: document.getElementById("adresa").value,
      telefon: document.getElementById("telefon").value,
      email: document.getElementById("email").value,
      opis: document.getElementById("opis").value,
    };
    fetch("http://localhost:9000/admin/pozoriste/" + id, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(izmeniPozoriste),
    })
      .then(async (response) => {
        console.log("Response status:", response.status);
        if (!response.ok) {
          if (response.status === 400) {
            return response.text().then((errorMessage) => {
              const errorDetails = JSON.parse(errorMessage);

              if (
                errorDetails.error &&
                errorDetails.error.includes("telefon")
              ) {
                alert("Molimo unesite ispravan telefonski broj.");
              } else if (
                errorDetails.error &&
                errorDetails.error.includes("email")
              ) {
                alert("Molimo unesite ispravan email (qqq@qqq.com).");
              } else if (
                errorDetails.error &&
                errorDetails.error.includes("adresa")
              ) {
                alert("Adresa mora da ima barem 5 karaktera.");
              } else if (
                errorDetails.error &&
                errorDetails.error.includes("naziv")
              ) {
                alert("Naziv mora da ima barem 5 karaktera.");
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
        console.log("Fetched Predstava Data:", data);
        window.location.href = `/admin/pozorista/pozorista.html`;
      })
      .catch((err) => console.log(err));

    return true;
  });

  document
    .getElementById("btnNazadIzmeniPozoriste")
    .addEventListener("click", function () {
      location.href = "/admin/pozorista/pozorista.html";
    });

  document.getElementById("btnObrisi").addEventListener("click", function () {
    if (confirm("Potvrdi brisanje")) {
      fetch("http://localhost:9000/admin/pozoriste/" + id, { method: "DELETE" })
        .then((resp) => resp.json())
        .then((data) => {
          //response sadrzi samo id obrisanog
          alert("Obrisan je zapis čiji je id: " + data);
          window.location.href = `/admin/pozorista/pozorista.html`;
        })
        .catch((err) => console.log(err));
    } else {
      return;
    }
  });
});

function validatePhoneNumber(inputElement) {
  // Da ima izmedju 9 i 15 brojeva
  var phoneNumberPattern = /^\d{9,15}$/;

  if (phoneNumberPattern.test(inputElement.value)) {
    inputElement.classList.add("success");
    inputElement.classList.remove("error");
  } else {
    inputElement.classList.add("error");
    inputElement.classList.remove("success");
  }
}

function validateInput(inputElement) {
  if (inputElement.value.length < 3) {
    inputElement.classList.add("error");
    inputElement.classList.remove("success");
  } else {
    inputElement.classList.add("success");
    inputElement.classList.remove("error");
  }
}

function validateEmail(inputElement) {
  var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (emailPattern.test(inputElement.value)) {
    inputElement.classList.add("success");
    inputElement.classList.remove("error");
  } else {
    inputElement.classList.add("error");
    inputElement.classList.remove("success");
  }
}

