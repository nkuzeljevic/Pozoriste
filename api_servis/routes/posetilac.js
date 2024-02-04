const express = require("express");
const { sequelize, Posetilac } = require("../../models");
const route = express.Router();
const BP = require("body-parser");

route.use(BP.urlencoded({ extended: false }));
route.use(express.json());
route.use(express.urlencoded({ extended: true }));

//GET koji vraca sve zapise iz baze (posto smo u modulu, vec se nalazimo u /admin/pozoriste)
route.get("/", async (req, res) => {
  try {
    const posetioci = await Posetilac.findAll();
    return res.json(posetioci);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Greska pri citanju", data: err });
  }
});

//GET koji vraca po specificnom id-ju
route.get("/:id", async (req, res) => {
  try {
    const posetioci = await Posetilac.findByPk(req.params.id);
    return res.json(posetioci);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Greska pri citanju", data: err });
  }
});

//POST sa podacima u body
route.post("/", async (req, res) => {
  try {
    const novi = {};
    novi.imePrezime = req.body.imePrezime;
    novi.email = req.body.email;
    novi.lozinka = req.body.lozinka;
    novi.brojTelefona = req.body.brojTelefona;
    novi.uloga = req.body.uloga;
    const insertovani = await Posetilac.create(novi);
    return res.json(insertovani);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Greska pri unosu", data: err });
  }
});

//PUT koji radi izmenu
route.put("/:id", async (req, res) => {
  try {
    const posetioci = await Posetilac.findByPk(req.params.id);
    posetioci.imePrezime = req.body.imePrezime;
    posetioci.email = req.body.email;
    posetioci.lozinka = req.body.lozinka;
    posetioci.brojTelefona = req.body.brojTelefona;
    posetioci.uloga = req.body.uloga;
    posetioci.save();
    return res.json(posetioci);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Greska pri izmeni", data: err });
  }
});

//DELETE brise po prosledjenom id-ju
route.delete("/:id", async (req, res) => {
  try {
    const posetioci = await Posetilac.findByPk(req.params.id);
    posetioci.destroy();
    return res.json(posetioci.id); //vraca id obrisanog
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Greska pri brisanju", data: err });
  }
});
module.exports = route;
