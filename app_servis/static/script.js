
window.addEventListener("load", function () {
  // console.log("Window loaded");

  var btnNovoPozoriste = document.getElementById("btnNovoPozoriste");
  var btnNovaPredstava = document.getElementById("btnNovaPredstava");
  var btnNovaSala = document.getElementById("btnNovaSala");
  var btnNoviGlumac = document.getElementById("btnNoviGlumac");

  if (btnNovoPozoriste) {
    btnNovoPozoriste.addEventListener("click", function () {
      console.log("Clicked btnNovoPozoriste");
      location.href = "/pozorista/novo-pozoriste.html";
    });
  } else {
    // console.error("btnNovoPozoriste not found");
  }

  if (btnNovaPredstava) {
    btnNovaPredstava.addEventListener("click", function () {
      console.log("Clicked btnNovaPredstava");
      location.href = "/predstave/nova-predstava.html";
    });
  } else {
    // console.error("btnNovaPredstava not found");
  }

  if (btnNovaSala) {
    btnNovaSala.addEventListener("click", function () {
      console.log("Clicked btnNovaSala");
      location.href = "/sale/nova-sala.html";
    });
  } else {
    // console.error("btnNovaSala not found");
  }

  if (btnNoviGlumac) {
    btnNoviGlumac.addEventListener("click", function () {
      console.log("Clicked btnNoviGlumac");
      location.href = "/glumci/novi-glumac.html";
    });
  } else {
    // console.error("btnNoviGlumac not found");
  }
});
