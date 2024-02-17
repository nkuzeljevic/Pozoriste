window.addEventListener("load", function () {
  document
    .getElementById("btnNovoPozoriste")
    .addEventListener("click", function () {
      console.log("Clicked btnNovoPozoriste");
      location.href = "/admin/pozorista/novo-pozoriste.html";
    });


  fetch("http://localhost:9000/admin/pozoriste")
    .then((response) => response.json())
    .then((pozorista) => {
      console.log(pozorista);
      const createTable = (theater) => {

        try {
          return `
        <br />
        <hr />
        <br />
        <div class="row">
        <h3>${theater.naziv}</h3>
          <div class="table-responsive">
            <table class="table table-striped">
                <tr>
                  <th>Opis</th>
                  <td>
                    <p>${theater.opis}</p>
                  </td>
                </tr>
                <tr>
                  <th>Adresa</th>
                  <td>${theater.adresa}</td>
                </tr>
                <tr>
                  <th>Telefon</th>
                  <td>${theater.telefon}</td>
                </tr>
                <tr>
                  <th>E-mail</th>
                  <td>${theater.email}</td>
                </tr>
                <tr>
                  <th>Predstave</th>
                  <td>
                    <ul class="list-group">
                        ${theater.predstave
                          .map((predstava) => {
                            return `<li class="list-group-item podlista">${predstava.naziv}</li>`;
                          })
                          .join("")}
                    </ul>
                  </td>
                </tr>
                <tr>
                  <th>
                    <a href="/admin/sale/sale.html" class="btn btn-secondary">Sale</a></th>
                  <td>
                    <ul class="list-group">
                      <li class="list-group-item">
                  ${theater.sale
                    .map((sala) => {
                      return `<li class="list-group-item podlista">${sala.naziv}</li>`;
                    })
                    .join("")}
                      </li>
                    </ul>                    
                  </td>
                </tr>
                <tr>
                  <th></th>
                  <td>
                    <a href="/admin/pozorista/izmeni-pozoriste.html?id=${
                      theater.id
                    }" class="btn btn-primary btn-sm float-end"
                      >Izmeni</a
                      >
                  </td>
                </tr>
            </table>
          </div>
          </div>
          `;
        } catch (error) {
          console.error(
            "Error fetching associated Predstava instances:",
            error
          );
        }
      };

      const mainContainer = document.querySelector(".container");
      pozorista.forEach((theater) => {
        const tableHTML = createTable(theater);
        mainContainer.insertAdjacentHTML("beforeend", tableHTML);
      });

      const styleLink = document.createElement("link");
      styleLink.rel = "stylesheet";
      styleLink.href = "/main.css";
      document.head.appendChild(styleLink);
    })

    .catch((error) => console.error("Error fetching data:", error));
});
