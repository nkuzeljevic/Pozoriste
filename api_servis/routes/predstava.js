const express = require("express");
const {
  sequelize,
  Predstava,
  Pozoriste,
  Sala,
  Zanr,
  Glumac,
  PredstavaGlumac,
} = require("../../models");
const route = express.Router();
const BP = require("body-parser");
const fs = require("fs");
const path = require("path");
const logStream = fs.createWriteStream(path.join(__dirname, "sequelize.log"), {
  flags: "a",
});

route.use(BP.urlencoded({ extended: false }));
route.use(express.json());
route.use(express.urlencoded({ extended: true }));

//GET koji vraca sve zapise iz baze (posto smo u modulu, vec se nalazimo u /admin/pozoriste)
route.get("/", async (req, res) => {
  try {
    const predstava = await Predstava.findAll({
      include: [
        {
          model: Pozoriste,
          as: "pozorista",
        },
        {
          model: Sala,
          as: "sale",
        },
        {
          model: Zanr,
          as: "zanr",
        },
        {
          model: PredstavaGlumac,
          include: [Glumac],
          as: "PredstavaGlumacs",
        },
      ],
    });
    return res.json(predstava);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Greska pri citanju", data: err });
  }
});

//GET koji vraca po specificnom id-ju
route.get("/:id", async (req, res) => {
  try {
    const predstava = await Predstava.findByPk(req.params.id);
    return res.json(predstava);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Greska pri citanju", data: err });
  }
});

//POST sa podacima u body
route.post("/", async (req, res) => {
  try {
    const novi = {};
    novi.naziv = req.body.naziv;
    novi.idPozorista = req.body.idPozorista;
    novi.datum = req.body.datum;
    novi.vreme = req.body.vreme;
    novi.idSale = req.body.idSale;
    novi.cena = req.body.cena;
    novi.idZanra = req.body.idZanra;
    novi.glumciInput = req.body.glumciInput;
    // Create a new Predstava or retrieve existing based on the name
    // const insertovani = await Predstava.findOrCreate({
    //   where: { naziv: novi.naziv },
    //   defaults: novi,
    // });
    const novaPredstava = await Predstava.create({
      naziv: novi.naziv,
      idPozorista: novi.idPozorista.id,
      datum: novi.datum,
      vreme: novi.vreme,
      idSale: novi.idSale.id,
      cena: novi.cena,
      idZanra: novi.idZanra.id,
    });

    //   await PredstavaGlumac.create({
    //     idPredstave: novaPredstava.id,
    //     idGlumca: glumciInput,
    //   });
    //   // const insertovani = await Predstava.create(novi);
    //   return res.json(novaPredstava);
    //   // return res.json({ id: insertovani.id });
    // } catch (err) {
    //   console.log(err);
    //   res.status(500).json({ error: "Greska pri unosu", data: err });
    // }
    try {
      await PredstavaGlumac.create({
        idPredstave: novaPredstava.id,
        idGlumca: glumciInput,
      });
      console.log("Record created successfully.");
      logStream.write(
        "Record created successfully.\n" + JSON.stringify(req.body)
      );
    } catch (error) {
      console.error("Error creating record:", error);
      logStream.write(`Error creating record: ${error}\n`);
    }
    // Create a new PredstavaGlumac association

    return res.json(novaPredstava);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Greska pri unosu", data: err });
  }
});

//PUT koji radi izmenu
route.put("/:id", async (req, res) => {
  try {
    const novi = await Predstava.findByPk(req.params.id);
    novi.naziv = req.body.naziv;
    novi.idPozorista = req.body.idPozorista;
    novi.datum = req.body.datum;
    novi.vreme = req.body.vreme;
    novi.idSale = req.body.idSale;
    novi.cena = req.body.cena;
    novi.idZanra = req.body.idZanra;
    novi.save();
    return res.json(novi);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Greska pri izmeni", data: err });
  }
});

//DELETE brise po prosledjenom id-ju
route.delete("/:id", async (req, res) => {
  try {
    const predstava = await Predstava.findByPk(req.params.id);
    predstava.destroy();
    return res.json(predstava.id); //vraca id obrisanog
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Greska pri brisanju", data: err });
  }
});
module.exports = route;
