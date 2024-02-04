window.addEventListener("load", function () {
  fetch("http://localhost:9000/admin/posetilac")
    .then((response) => response.json())
    .then((posetioci) => {
      console.log(posetioci);
      // Function to create a table based on theater data
      const createTable = (visitor) => {
        return `

                <tr>
                  <td>
                    ${visitor.imePrezime}
                  </td>
                  <td>
                    ${visitor.email}
                  </td>
                  <td>
                     ${visitor.lozinka}
                  </td>
                  <td>
                     ${visitor.brojTelefona}
                  </td>
                  <td>
                     ${visitor.uloga}
                  </td>
                  <td>
                  <a href="izmeni-posetioca.html?id=${visitor.id}" class="btn btn-primary btn-sm"
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

      const tableBody = document.getElementById("posetilac");
      posetioci.forEach((visitor) => {
        const tableHTML = createTable(visitor);
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
