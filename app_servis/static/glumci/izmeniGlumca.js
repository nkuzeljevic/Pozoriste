window.addEventListener("load", function () {
  //sadrzaj funkcije koja ce se pozvati kada browser proglasi stranicu ucitanom
  //tj DOM tree potpuno formiranim
  document.getElementById("forma").addEventListener("submit", function (event) {
    var imeElement = document.getElementById("ime");
    var predstavaElement = document.getElementById("predstave");

    // Check if the input has the 'error' class
    if (
      imeElement.classList.contains("error") ||
      predstavaElement.classList.contains("error")
    ) {
      alert("Molimo ispravite greške pre čuvanja.");
      event.preventDefault(); // Prevent form submission
    }

    // Continue with form submission if no errors
    return true;
  });

  document
    .getElementById("btnNazadIzmeniGlumca")
    .addEventListener("click", function () {
      location.href = "/glumci/glumci.html";
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
