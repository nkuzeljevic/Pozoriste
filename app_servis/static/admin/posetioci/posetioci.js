window.addEventListener("load", function () {
  fetch("http://localhost:9000/admin/posetilac")
    .then((response) => response.json())
    .then((posetioci) => {
      console.log(posetioci);
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
                  <a href="posetioci/izmeni-posetioca.html?id=${visitor.id}" class="btn btn-primary btn-sm"
                    >Izmeni</a
                  >
                  </td>
                </tr>
          `;
      };

      const tableBody = document.getElementById("posetilac");
      posetioci.forEach((visitor) => {
        const tableHTML = createTable(visitor);
        tableBody.insertAdjacentHTML("beforeend", tableHTML);
      });

      // Dynamically add the link to main.css
      const styleLink = document.createElement("link");
      styleLink.rel = "stylesheet";
      styleLink.href = "/main.css"; 
      document.head.appendChild(styleLink);
    })
    .catch((error) => console.error("Error fetching data:", error));
});
