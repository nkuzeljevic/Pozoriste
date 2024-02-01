window.addEventListener("load", function () {
  document
    .getElementById("btnNoviGlumac")
    .addEventListener("click", function () {
      console.log("Clicked btnNoviGlumac");
      location.href = "/glumci/novi-glumac.html";
    });

  fetch("/admin/glumci")
    .then((response) => response.json())
    .then((glumci) => {
      // Function to create a table based on theater data
      const createTable = (actors) => {
        const predstaveArray = JSON.parse(actors.predstaveInput);
        const predstaveListItems = predstaveArray
          .map(
            (predstava) =>
              `<li class="list-group-item podlista">${predstava}</li>`
          )
          .join("");
        return `
    <div class="col-md-4 col-sm-12">
      <div class="mb-3 mt-3">
        <h3 class="ime">${actors.ime}</h3>
        <p class="form-control opis">${actors.opis}</p>
        <h5>Pozorišne predstave:</h5>
        <ul class="list-group lista">
          ${predstaveListItems}
        </ul>
        <br />
        <a href="izmeni-glumca.html" class="btn btn-primary btn-sm">Izmeni</a>
      </div>
    </div>
  `;
      };
      // Insert tables into the main container
      const mainContainer = document.querySelector(".container");
      let row = document.createElement("div");
      row.classList.add("row");

      glumci.forEach((actors, index) => {
        const tableHTML = createTable(actors);
        row.insertAdjacentHTML("beforeend", tableHTML);

        // If three actors are added or it's the last actor, append the row to the main container
        if ((index + 1) % 3 === 0 || index === glumci.length - 1) {
          mainContainer.appendChild(row);
          // Create a new row for the next set of actors
          row = document.createElement("div");
          row.classList.add("row");
        }
      });
      //Dynamically add the link to main.css
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
