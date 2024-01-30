window.addEventListener("load", function () {
  document
    .getElementById("btnNazadIzmeniSalu")
    .addEventListener("click", function () {
      location.href = "/sale/sale.html";
    });

  document.getElementById("forma").addEventListener("submit", function (event) {
    var nazivElement = document.getElementById("naziv");
    var pozoristeElement = document.getElementById("pozoriste");
    var brMestaElement = document.getElementById("brMesta");

    // Check if the input has the 'error' class
    if (
      nazivElement.classList.contains("error") ||
      pozoristeElement.classList.contains("error") ||
      brMestaElement.classList.contains("error")
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
