window.addEventListener("load", function () {
  document
    .getElementById("btnNovoPozoriste")
    .addEventListener("click", function () {
      console.log("Clicked btnNovoPozoriste");
      location.href = "/admin/pozorista/novo-pozoriste.html";
    });

  // fetch('/admin/pozorista')
  //     .then(response => {
  // let data = response.json();
  // console.log(data);
  // for(let i=0; i<data.length; i++){
  //   let tr = document.createElement("tr");
  //   let td1 = document.createElement("td");
  //   td1.innerHTML = data[i].naziv;
  //   tr.appendChild(td1);
  //     //… ostatak
  //   document.getElementById("spisak").appendChild(tr);
  //   //data[i].kategorija
  //   //data[i].cena

  //   //ovde ide i pridruzivanje click eventa na <button>  Promena cene
  //   let btn = document.createElement("button");
  //   btn.addEventListener("click", function(){
  //   //..telo funkcije…
  //   });
  // }

  fetch("http://localhost:9000/admin/pozoriste")
    .then((response) => response.json())
    .then((pozorista) => {
      console.log(pozorista);
      // Function to create a table based on theater data
      const createTable = (theater) => {
        // const predstaveArray = JSON.parse(theater.predstaveInput);
        // const predstaveListItems = predstaveArray
        //   .map(
        //     (predstava) =>
        //       `<li class="list-group-item podlista">${predstava}</li>`
        //   )
        //   .join("");

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
      // Insert tables into the main container
      const mainContainer = document.querySelector(".container");
      pozorista.forEach((theater) => {
        const tableHTML = createTable(theater);
        mainContainer.insertAdjacentHTML("beforeend", tableHTML);
      });
      // Dynamically add the link to main.css
      const styleLink = document.createElement("link");
      styleLink.rel = "stylesheet";
      styleLink.href = "/main.css";
      document.head.appendChild(styleLink);
    })
    // .catch(error => console.error("Error fetching data:", error));

    //     })
    //     .catch(error => {
    //       console.error('Error:', error);
    //     });

    .catch((error) => console.error("Error fetching data:", error));
});