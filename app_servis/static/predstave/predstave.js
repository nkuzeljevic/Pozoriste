window.addEventListener("load", function () {
  document
    .getElementById("btnNovaPredstava")
    .addEventListener("click", function () {
      console.log("Clicked btnNovaPredstava");
      location.href = "/predstave/nova-predstava.html";
    });

  fetch("/admin/predstave")
    .then((response) => response.json())
    .then((predstave) => {
      // Function to create a table based on theater data
      const createTable = (play) => {
        // Parse datum into a Date object
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

        // Parse glumciInput into an array
        const glumciArray = JSON.parse(play.glumciInput);
        return `

                <tr>
                  <td>
                    ${play.naziv}
                  </td>
                  <td>
                    ${play.izabranoPozoriste}
                  </td>
                  <td>
                    ${formattedDate}
                  </td>
                  <td>
                    ${play.vreme}h
                  </td>
                  <td>
                    ${play.sala}
                  </td>
                  <td>
                    ${play.cena} RSD
                  </td>
                  <td>
                    ${play.izabraniZanr}
                  </td>
                   <td>
                    ${glumciArray.join(", ")}
                  </td>
                  <td>
                  <a href="izmeni-predstavu.html" class="btn btn-primary btn-sm"
                    >Izmeni</a
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

      const tableBody = document.getElementById("predstave");
      predstave.forEach((play) => {
        const tableHTML = createTable(play);
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
