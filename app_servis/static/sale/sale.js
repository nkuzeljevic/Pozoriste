// window.addEventListener("load", function () {
//   document.getElementById("btnNovaSala").addEventListener("click", function () {
//     console.log("Clicked btnNovaSala");
//     location.href = "/sale/nova-sala.html";
//   });

//   fetch("/admin/sale")
//     .then((response) => response.json())
//     .then((sale) => {
//       // Function to create a table based on theater data
//       const createTable = (hall) => {
//         return `

//                 <tr>
//                   <td>
//                     ${hall.naziv}
//                   </td>
//                   <td>
//                     ${hall.pozoriste}
//                   </td>
//                   <td>
//                     ${hall.brMesta}
//                   </td>
//                   <td>
//                   <a href="izmeni-salu.html" class="btn btn-primary btn-sm"
//                     >Izmeni</a
//                   >
//                   </td>
//                 </tr>
//           `;
//       };
//       const updateTable = () => {
//         fetch("/admin/sale")
//           .then((response) => response.json())
//           .then((sale) => {
//             const tableBody = document.getElementById("sale");
//             tableBody.innerHTML = ""; // Clear existing table rows

//             sale.forEach((hall) => {
//               const tableHTML = createTable(hall);
//               tableBody.insertAdjacentHTML("beforeend", tableHTML);
//             });

//             // Dynamically add the link to main.css
//             const styleLink = document.createElement("link");
//             styleLink.rel = "stylesheet";
//             styleLink.href = "/main.css"; // Replace with the correct path to your main.css
//             document.head.appendChild(styleLink);
//           })
//           .catch((error) => console.error("Error fetching data:", error));
//       };
//       // const tableBody = document.getElementById("sale");
//       // sale.forEach((hall) => {
//       //   const tableHTML = createTable(hall);
//       //   // Append the new rows to the table body
//       //   tableBody.insertAdjacentHTML("beforeend", tableHTML);
//       // });
//       // // Dynamically add the link to main.css
//       // const styleLink = document.createElement("link");
//       // styleLink.rel = "stylesheet";
//       // styleLink.href = "/main.css"; // Replace with the correct path to your main.css
//       // document.head.appendChild(styleLink);
//     });
//   // .catch((error) => console.error("Error fetching data:", error));
//   updateTable();
// });
window.addEventListener("load", function () {
  document.getElementById("btnNovaSala").addEventListener("click", function () {
    console.log("Clicked btnNovaSala");
    location.href = "/sale/nova-sala.html";
  });

  const createTable = (hall) => {
    return `

                <tr>
                  <td>
                    ${hall.naziv}
                  </td>
                  <td>
                    ${hall.izabranoPozoriste}
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

  const updateTable = () => {
    fetch("/admin/sale")
      .then((response) => response.json())
      .then((sale) => {
        const tableBody = document.getElementById("sale");

        // Append the new rows to the existing ones
        sale.forEach((hall) => {
          const tableHTML = createTable(hall);
          tableBody.insertAdjacentHTML("beforeend", tableHTML);
        });

        // Dynamically add the link to main.css
        const styleLink = document.createElement("link");
        styleLink.rel = "stylesheet";
        styleLink.href = "/main.css"; // Replace with the correct path to your main.css
        document.head.appendChild(styleLink);
      })
      .catch((error) => console.error("Error fetching data:", error));
  };

  // Call the updateTable function when the page loads
  updateTable();
});
