window.addEventListener("load", function () {
  document.getElementById("btnNovaSala").addEventListener("click", function () {
    console.log("Clicked btnNovaSala");
    location.href = "/admin/sale/nova-sala.html";
  });

  const createTable = (hall) => {
    const pozoristeName = hall.pozorista ? hall.pozorista.naziv : "N/A";
    return `

                <tr>
                  <td>
                    ${hall.naziv} 
                  </td>
                  <td>
                    ${pozoristeName}
                  </td>
                  <td>
                    ${hall.brojMesta}
                  </td>
                  <td>
                  <a href="/admin/sale/izmeni-salu.html?id=${hall.id}" class="btn btn-primary btn-sm"
                    >Izmeni</a
                  >
                  </td>
                </tr>
          `;
  };

  const updateTable = () => {
    fetch("http://localhost:9000/admin/sala")
      .then((response) => response.json())
      .then((sale) => {
        const tableBody = document.getElementById("sale");

        sale.forEach((hall) => {
          const tableHTML = createTable(hall);
          tableBody.insertAdjacentHTML("beforeend", tableHTML);
        });

        const styleLink = document.createElement("link");
        styleLink.rel = "stylesheet";
        styleLink.href = "/main.css"; 
        document.head.appendChild(styleLink);
      })
      .catch((error) => console.error("Error fetching data:", error));
  };

  updateTable();
});
