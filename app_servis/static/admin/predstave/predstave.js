window.addEventListener("load", function () {
  document
    .getElementById("btnNovaPredstava")
    .addEventListener("click", function () {
      console.log("Clicked btnNovaPredstava");
      location.href = "/admin/predstave/nova-predstava.html";
    });

  fetch("http://localhost:9000/admin/predstava")
    .then((response) => response.json())
    .then((predstave) => {
      console.log(predstave);
      const createTable = (play) => {
        const playDate = new Date(play.datum);

        // Format date as DD.MM.YYYY
        const formattedDate =
          playDate
            .toLocaleDateString("en-GB", {
              day: "2-digit",
              month: "2-digit",
              year: "numeric",
            })
            .replace(/\//g, ".") + ".";

        const pozoristeName = play.pozorista ? play.pozorista.naziv : "N/A";
        const salaName = play.sale ? play.sale.naziv : "N/A";
        const zanrNames = play.zanr
          ? Array.isArray(play.zanr)
            ? play.zanr.map((zanr) => zanr.naziv).join(", ")
            : play.zanr.naziv
          : "N/A";

        const glumacNames = play.PredstavaGlumacs
          ? play.PredstavaGlumacs.map((pg) =>
              pg.Glumac ? pg.Glumac.ime : "N/A"
            ).join(", ")
          : "N/A";

        return `

                <tr>
                  <td>
                    ${play.naziv}
                  </td>
                  <td>
                    ${pozoristeName}
                  </td>
                  <td>
                    ${formattedDate}
                  </td>
                  <td>
                    ${play.vreme}h
                  </td>
                  <td>
                    ${salaName}
                  </td>
                  <td>
                    ${play.cena} RSD
                  </td>
                  <td>
                     ${zanrNames}
                  </td>
                   <td>
                    ${glumacNames}
                  </td>
                  <td>
                  <a href="/admin/predstave/izmeni-predstavu.html?id=${play.id}" class="btn btn-primary btn-sm"
                    >Izmeni</a
                  >
                  </td>
                </tr>
          `;
      };

      const tableBody = document.getElementById("predstave");
      predstave.forEach((play) => {
        const tableHTML = createTable(play);
        tableBody.insertAdjacentHTML("beforeend", tableHTML);
      });

      const styleLink = document.createElement("link");
      styleLink.rel = "stylesheet";
      styleLink.href = "/main.css"; 
      document.head.appendChild(styleLink);
    })
    .catch((error) => console.error("Error fetching data:", error));
});
