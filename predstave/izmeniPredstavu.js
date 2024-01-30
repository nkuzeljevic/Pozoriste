window.addEventListener("load", function () {
  document
    .getElementById("btnNazadIzmeniPredstavu")
    .addEventListener("click", function () {
      location.href = "/predstave/predstave.html";
    });

  document.getElementById("datum").min = new Date().toISOString().split("T")[0];

  document.getElementById("forma").addEventListener("submit", function (event) {
    var nazivElement = document.getElementById("naziv");
    var pozoristeElement = document.getElementById("pozoriste");
    var salaElement = document.getElementById("sala");

    // Check if the input has the 'error' class
    if (
      nazivElement.classList.contains("error") ||
      pozoristeElement.classList.contains("error") ||
      salaElement.classList.contains("error")
    ) {
      alert("Molimo ispravite greške pre čuvanja.");
      event.preventDefault(); // Prevent form submission
    }

    // Continue with form submission if no errors
    return true;
  });
});
function validateInput(inputElement) {
  //   var validno = true;
  if (inputElement.value.length < 3) {
    // validno = false;
    inputElement.classList.add("error");
    inputElement.classList.remove("success");
  } else {
    inputElement.classList.add("success");
    inputElement.classList.remove("error");
  }
  //   return validno;
}
