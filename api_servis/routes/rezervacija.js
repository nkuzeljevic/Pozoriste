const express = require("express");
const { sequelize, Rezervacija } = require("../../models");
const route = express.Router();
const BP = require("body-parser");

route.use(BP.urlencoded({ extended: false }));
route.use(express.json());
route.use(express.urlencoded({ extended: true }));

//GET koji vraca sve zapise iz baze (posto smo u modulu, vec se nalazimo u /admin/pozoriste)
route.get("/", async (req, res) => {
  try {
    const rezervacija = await Rezervacija.findAll();
    return res.json(rezervacija);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Greska pri citanju", data: err });
  }
});

//GET koji vraca po specificnom id-ju
route.get("/:id", async (req, res) => {
  try {
    const rezervacija = await Rezervacija.findByPk(req.params.id);
    return res.json(rezervacija);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Greska pri citanju", data: err });
  }
});

//POST sa podacima u body
route.post("/", async (req, res) => {
  try {
    const novi = {};
    novi.brojMesta = req.body.brojMesta;
    novi.status = req.body.status;
    novi.idPosetioca = req.body.idPosetioca;
    novi.idPredstave = req.body.idPredstave;
    const insertovani = await Rezervacija.create(novi);
    return res.json(insertovani);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Greska pri unosu", data: err });
  }
});

//PUT koji radi izmenu
route.put("/:id", async (req, res) => {
  try {
    const novi = await Rezervacija.findByPk(req.params.id);
    novi.brojMesta = req.body.brojMesta;
    novi.status = req.body.status;
    novi.idPosetioca = req.body.idPosetioca;
    novi.idPredstave = req.body.idPredstave;
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
    const rezervacija = await Rezervacija.findByPk(req.params.id);
    rezervacija.destroy();
    return res.json(rezervacija.id); //vraca id obrisanog
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Greska pri brisanju", data: err });
  }
});
module.exports = route;
