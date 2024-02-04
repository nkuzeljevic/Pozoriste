window.addEventListener("load", function () {
  fetch("http://localhost:9000/admin/rezervacija")
    .then((response) => response.json())
    .then((rezervacije) => {
      console.log(rezervacije);
      // Function to create a table based on theater data
      const createTable = (reservation) => {
        console.log("Reservation object:", reservation);
        const predstavaName = reservation.predstave
          ? reservation.predstave.naziv
          : "N/A";

        const datum = reservation.predstave
          ? reservation.predstave.datum
          : "N/A";
        // Parse datum into a Date object
        const playDate = new Date(datum);

        // // Format date as DD.MM.YYYY
        const formattedDate =
          playDate
            .toLocaleDateString("en-GB", {
              day: "2-digit",
              month: "2-digit",
              year: "numeric",
            })
            .replace(/\//g, ".") + ".";

        const vreme = reservation.predstave
          ? reservation.predstave.vreme
          : "N/A";

        const posetilacName = reservation.posetilac
          ? reservation.posetilac.email
          : "N/A"; // Corrected line

        const cena = reservation.predstave ? reservation.predstave.cena : "N/A";
        return `

                <tr>
                  <td>
                    ${predstavaName}
                  </td>
                  <td>
                    ${formattedDate}
                  </td>
                  <td>
                    ${vreme}h
                  </td>
                  <td>
                    ${posetilacName}
                  </td>
                  <td>
                    ${cena} RSD
                  </td>
                  <td>
                    ${reservation.status}
                  </td>
                  <td>
                  <a href="rezervacija.html?id=${reservation.id}" class="btn btn-primary btn-sm"
                    >Detalji</a
                  >
                  </td>
                </tr>
          `;
      };
      // Insert tables into the main container
      //   const mainContainer = document.querySelector(".container");
      //   pozorista.forEach((theater) => {
      //     const tableHTML = createTable(theater);
      //     mainContainer.insertAdjacentHTML("beforeend", tableHTML);

      const tableBody = document.getElementById("rezervacije");
      rezervacije.forEach((reservation) => {
        const tableHTML = createTable(reservation);
        // Append the new rows to the table body
        tableBody.insertAdjacentHTML("beforeend", tableHTML);
      });

      // Dynamically add the link to main.css
      const styleLink = document.createElement("link");
      styleLink.rel = "stylesheet";
      styleLink.href = "/main.css"; // Replace with the correct path to your main.css
      document.head.appendChild(styleLink);
    })
    // .catch(error => console.error("Error fetching data:", error));

    //     })
    //     .catch(error => {
    //       console.error('Error:', error);
    //     });
    .catch((error) => console.error("Error fetching data:", error));
});
