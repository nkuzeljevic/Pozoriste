const express = require("express");
const router = express.Router();
const BP = require("body-parser");
const Joi = require("joi");
const fs = require("fs");

router.use(BP.urlencoded({ extended: false }));

//Dashboard
router.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "static", "admin", "index.html"));
});

//Pozoriste

router.get("/pozorista/novo-pozoriste.html", (req, res) => {
  res.sendFile(
    path.join(__dirname, "static", "pozorista", "novo-pozoriste.html")
  );
});

router.post("/novo-pozoriste", (req, res) => {
  const shema = Joi.object().keys({
    naziv: Joi.string().trim().min(5).max(25).required(),
    adresa: Joi.string().trim().min(5).max(35).required(),
    opis: Joi.string().trim().min(1).required(),
    email: Joi.string().email({ minDomainSegments: 2 }),
    telefon: Joi.string()
      .trim()
      .pattern(/^[0-9]{3}\/?[0-9]{6,7}$/)
      .required(),
    predstaveInput: Joi.string().trim().min(1).required(),
  });

  const { error, succ } = shema.validate(req.body);

  if (error) {
    // Redirect back to the form with error details
    res.redirect(
      "/pozorista/novo-pozoriste.html?error=" +
        encodeURIComponent(
          error.details.map((detail) => detail.message).join(", ")
        )
    );
  } else {
    //svaki novi red menjamo sa <br> posto npr opis moze da bude multiline
    req.body.opis.replace(/\r?\n|\r/g, "<br>");
    fs.appendFile(
      "novoPozoristeForma.txt",
      JSON.stringify(req.body) + "\n",
      function (err, succ) {
        res.send("Poruka je poslata, očekujte odgovor uskoro");
      }
    );

    // Process the successful form submission
    // res.send("Form submitted successfully");
  }

  console.log(req.body);
  // res.send(req.body);
});

router.get("/pozorista", (req, res) => {
  console.log("Request received for /admin/pozorista");
  const pozorista = [];

  fs.readFile("novoPozoristeForma.txt", "utf8", (err, data) => {
    if (err) {
      console.error("Error reading file:", err);
      res.status(500).send({ error: "Greška pri čitanju fajla" });
      return;
    }
    //else…
    const redovi = data.split("\n");

    for (let i = 0; i < redovi.length - 1; i++) {
      let obj = JSON.parse(redovi[i]);
      pozorista.push(obj);
    }
    console.log(pozorista);
    res.json(pozorista);
  });

  // res.send("sva pozorista");
});

//Sala
router.get("/sale", (req, res) => {
  console.log("Request received for /admin/sale");
  const sale = [];

  fs.readFile("novaSalaForma.txt", "utf8", (err, data) => {
    if (err) {
      console.error("Error reading file:", err);
      res.status(500).send({ error: "Greška pri čitanju fajla" });
      return;
    }
    //else…
    const redovi = data.split("\n");

    for (let i = 0; i < redovi.length - 1; i++) {
      try {
        let obj = JSON.parse(redovi[i]);
        sale.push(obj);
      } catch (parseError) {
        console.error("Error parsing line:", parseError);
        // Handle parsing error if needed
      }
    }
    console.log(sale);
    res.json(sale);
  });
});

router.get("/sale/nova-sala.html", (req, res) => {
  res.sendFile(path.join(__dirname, "static", "sale", "nova-sala.html"));
});

router.post("/nova-sala", (req, res) => {
  const shema = Joi.object().keys({
    naziv: Joi.string().trim().min(5).max(25).required(),
    izabranoPozoriste: Joi.string().trim().min(1).required(),
    brMesta: Joi.number().integer().min(1).required(),
  });

  const { error, succ } = shema.validate(req.body);

  if (error) {
    // Redirect back to the form with error details
    res.redirect(
      "/sale/nova-sala.html?error=" +
        encodeURIComponent(
          error.details.map((detail) => detail.message).join(", ")
        )
    );
  } else {
    // Get the selected text from the option, not the ID
    const selectedPozoriste = req.body.pozoriste;
    // const formData = {
    //   Naziv: req.body.naziv,
    //   Pozoriste: req.body.pozoriste,
    //   "Broj mesta": req.body.brMesta,
    // };
    // // Convert the object to JSON
    // const formDataJSON = JSON.stringify(formData);

    fs.appendFile(
      "novaSalaForma.txt",
      // JSON.stringify({
      //   Naziv: req.body.naziv,
      //   izabranoPozoriste: selectedPozoriste,
      //   "Broj mesta": req.body.brMesta,
      // }) + "\n",
      JSON.stringify(req.body) + "\n",
      function (err, succ) {
        res.send("Poruka je poslata, očekujte odgovor uskoro");
      }
    );
    // Process the successful form submission
    // res.send("Form submitted successfully");
  }

  // res.send(req.body);
  console.log(req.body);
});

//Predstave
router.get("/predstave", (req, res) => {
  console.log("Request received for /admin/predstave");
  const predstave = [];

  fs.readFile("novaPredstavaForma.txt", "utf8", (err, data) => {
    if (err) {
      console.error("Error reading file:", err);
      res.status(500).send({ error: "Greška pri čitanju fajla" });
      return;
    }
    //else…
    const redovi = data.split("\n");

    for (let i = 0; i < redovi.length - 1; i++) {
      try {
        let obj = JSON.parse(redovi[i]);
        predstave.push(obj);
      } catch (parseError) {
        console.error("Error parsing line:", parseError);
        // Handle parsing error if needed
      }
    }
    console.log(predstave);
    res.json(predstave);
  });

  // res.send("sva pozorista");
});

router.get("/predstave/nova-predstava.html", (req, res) => {
  res.sendFile(
    path.join(__dirname, "static", "predstave", "nova-predstava.html")
  );
});

router.post("/nova-predstava", (req, res) => {
  const shema = Joi.object().keys({
    naziv: Joi.string().trim().min(5).max(25).required(),
    datum: Joi.date().greater("now").required(),
    vreme: Joi.string()
      .regex(/^([01]\d|2[0-3]):([0-5]\d)$/)
      .required(),
    izabranoPozoriste: Joi.string().trim().min(1).required(),
    sala: Joi.string().trim().min(1).required(),
    zanr: Joi.string().trim().min(1).required(),
    glumciInput: Joi.string().trim().min(3).required(),
    cena: Joi.number().greater(0).required(),
  });

  const { error, succ } = shema.validate(req.body);

  if (error) {
    // Redirect back to the form with error details
    res.redirect(
      "/predstave/nova-predstava.html?error=" +
        encodeURIComponent(
          error.details.map((detail) => detail.message).join(", ")
        )
    );
  } else {
    //svaki novi red menjamo sa <br> posto npr opis moze da bude multiline
    // req.body.opis.replace(/\r?\n|\r/g, "<br>");
    fs.appendFile(
      "novaPredstavaForma.txt",
      JSON.stringify(req.body) + "\n",
      function (err, succ) {
        res.send("Poruka je poslata, očekujte odgovor uskoro");
      }
    );
    // Process the successful form submission
    // res.send("Form submitted successfully");
  }
  // res.send(req.body);
  console.log(req.body);
});

//Glumci
router.get("/glumci", (req, res) => {
  console.log("Request received for /admin/glumci");
  const glumci = [];

  fs.readFile("noviGlumacForma.txt", "utf8", (err, data) => {
    if (err) {
      console.error("Error reading file:", err);
      res.status(500).send({ error: "Greška pri čitanju fajla" });
      return;
    }
    //else…
    const redovi = data.split("\n");

    for (let i = 0; i < redovi.length - 1; i++) {
      let obj = JSON.parse(redovi[i]);
      glumci.push(obj);
    }
    console.log(glumci);
    res.json(glumci);
  });
});

router.get("/glumci/novi-glumac.html", (req, res) => {
  res.sendFile(path.join(__dirname, "static", "glumci", "novi-glumac.html"));
});

router.post("/novi-glumac", (req, res) => {
  const shema = Joi.object().keys({
    ime: Joi.string().trim().min(5).max(35).required(),
    opis: Joi.string().trim().min(1).required(),
    predstaveInput: Joi.string().trim().min(1).required(),
  });

  const { error, succ } = shema.validate(req.body);

  if (error) {
    // Redirect back to the form with error details
    res.redirect(
      "/glumci/novi-glumac.html?error=" +
        encodeURIComponent(
          error.details.map((detail) => detail.message).join(", ")
        )
    );
  } else {
    //svaki novi red menjamo sa <br> posto npr opis moze da bude multiline
    req.body.opis.replace(/\r?\n|\r/g, "<br>");
    fs.appendFile(
      "noviGlumacForma.txt",
      JSON.stringify(req.body) + "\n",
      function (err, succ) {
        res.send("Poruka je poslata, očekujte odgovor uskoro");
      }
    );
    // Process the successful form submission
    // res.send("Form submitted successfully");
  }
  // res.send(req.body);
  console.log(req.body);
});

//Rezervacije
router.get("/rezervacije/rezervacija.html", (req, res) => {
  res.sendFile(
    path.join(__dirname, "static", "rezervacije", "rezervacija.html")
  );
});

router.post("/rezervacija", (req, res) => {
  const shema = Joi.object().keys({
    rezervacija: Joi.string().empty("").required(),
  });

  const { error, succ } = shema.validate(req.body);

  if (error) {
    // Redirect back to the form with error details
    res.redirect(
      "/rezervacije/rezervacija.html?error=" +
        encodeURIComponent(
          error.details.map((detail) => detail.message).join(", ")
        )
    );
  } else {
    //svaki novi red menjamo sa <br> posto npr opis moze da bude multiline
    // req.body.opis.replace(/\r?\n|\r/g, "<br>");
    fs.appendFile(
      "novaRezervacijaForma.txt",
      JSON.stringify(req.body) + "\n",
      function (err, succ) {
        res.send("Poruka je poslata, očekujte odgovor uskoro");
      }
    );
    // Process the successful form submission
    // res.send("Form submitted successfully");
  }
  // res.send(req.body);
  console.log(req.body);
});

module.exports = router;
