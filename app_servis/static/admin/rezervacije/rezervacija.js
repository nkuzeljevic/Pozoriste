var id = null;
window.addEventListener("load", function () {
  var url = new URL(window.location.href);
  id = url.searchParams.get("id");

  fetch("http://localhost:9000/admin/rezervacija/" + id)
    .then((resp) => resp.json())
    .then((data) => {
      console.log(data);
      fetch("http://localhost:9000/admin/predstava/" + data.idPredstave)
        .then((response) => response.json())
        .then((predstavaData) => {

          document.getElementById("predstava").innerHTML = predstavaData.naziv;

          const reservationDate = new Date(predstavaData.datum);
          const formattedDate =
            reservationDate
              .toLocaleDateString("en-GB", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
              })
              .replace(/\//g, ".") + ".";

          document.getElementById(
            "vreme"
          ).innerHTML = `${predstavaData.vreme}, ${formattedDate}`;
          document.getElementById("cena").innerHTML = predstavaData.cena;
          fetch("http://localhost:9000/admin/sala/" + predstavaData.idSale)
            .then((response) => response.json())
            .then((salaData) => {
              document.getElementById("sala").innerHTML = salaData.naziv;
            });
        })
        .catch((err) => console.log(err));

      fetch("http://localhost:9000/admin/posetilac/" + data.idPosetioca)
        .then((response) => response.json())
        .then((posetilacData) => {
          document.getElementById("email").innerHTML = posetilacData.email;
        });

      document.getElementById("brojMesta").innerHTML = data.brojMesta;

      var selectElement = document.getElementById("status");
      var options = selectElement.options;

      for (var i = 0; i < options.length; i++) {
        if (options[i].text == data.status) {
          options[i].selected = true;
          break;
        }
      }
    })
    .catch((err) => console.log(err));

  document
    .getElementById("status")
    .addEventListener("change", function (event) {
      event.preventDefault();
      const selectElement = document.getElementById("status");
      const selectedOption = selectElement.options[selectElement.selectedIndex];

      const izmenjenaRezervacija = {
        brojMesta: document.getElementById("brojMesta").innerHTML,
        status: selectedOption.text,
        idPosetioca: document.getElementById("email").value,
        idPredstave: document.getElementById("predstava").value,
      };

      fetch("http://localhost:9000/admin/rezervacija/" + id, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(izmenjenaRezervacija),
      })
        .then((data) => {
          console.log("Fetched Predstava Data:", data);
          window.location.href = `/admin/rezervacije/rezervacije.html`;
        })
        .catch((err) => console.log(err));
    });

  document.getElementById("btnObrisi").addEventListener("click", function () {
    if (confirm("Potvrdi brisanje")) {
      fetch("http://localhost:9000/admin/rezervacija/" + id, {
        method: "DELETE",
      })
        .then((resp) => resp.json())
        .then((data) => {
          alert("Obrisan je zapis čiji je id: " + data);
          window.location.href = `/admin/rezervacije/rezervacije.html`;
        })
        .catch((err) => console.log(err));
    } else {
      return;
    }
  });
   document
    .getElementById("btnNazadRezervacija")
    .addEventListener("click", function () {
      location.href = "/admin/rezervacije/rezervacije.html";
    });
});
