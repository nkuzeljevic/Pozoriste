window.addEventListener("load", function () {
  document.getElementById("btnNovaSala").addEventListener("click", function () {
    console.log("Clicked btnNovaSala");
    location.href = "/sale/nova-sala.html";
  });

  fetch("/admin/sale")
    .then((response) => response.json())
    .then((sale) => {
      // Function to create a table based on theater data
      const createTable = (hall) => {
        return `

                <tr>
                  <td>
                    ${hall.naziv}
                  </td>
                  <td>
                    ${hall.pozoriste}
                  </td>
                  <td>
                    ${hall.brMesta}
                  </td>
                  <td>
                  <a href="izmeni-salu.html" class="btn btn-primary btn-sm"
                    >Izmeni</a
                  >
                  </td>
                </tr>
          `;
      };
      const tableBody = document.getElementById("sale");
      sale.forEach((hall) => {
        const tableHTML = createTable(hall);
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
