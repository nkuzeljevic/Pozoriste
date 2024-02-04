const express = require("express");
const { sequelize, Predstava } = require("../../models");
const route = express.Router();
const BP = require("body-parser");

route.use(BP.urlencoded({ extended: false }));
route.use(express.json());
route.use(express.urlencoded({ extended: true }));

//GET koji vraca sve zapise iz baze (posto smo u modulu, vec se nalazimo u /admin/pozoriste)
route.get("/", async (req, res) => {
  try {
    const predstava = await Predstava.findAll();
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
    const insertovani = await Predstava.create(novi);
    return res.json(insertovani);
  } catch (err) {
    console.log(err);
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
