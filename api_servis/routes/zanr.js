const express = require("express");
const {
  sequelize,
  Glumac,
  Posetilac,
  Pozoriste,
  Predstava,
  PredstavaGlumac,
  Rezervacija,
  Sala,
  Zanr,
} = require("../../models");
const route = express.Router();
const BP = require("body-parser");
const Joi = require("joi");

route.use(BP.urlencoded({ extended: false }));
route.use(express.json());
route.use(express.urlencoded({ extended: true }));

//GET koji vraca sve zapise iz baze (posto smo u modulu, vec se nalazimo u /admin/pozoriste)
route.get("/", async (req, res) => {
  try {
    const zanr = await Zanr.findAll();
    return res.json(zanr);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Greska pri citanju", data: err });
  }
});

//GET koji vraca po specificnom id-ju
route.get("/:id", async (req, res) => {
  try {
    const zanr = await Zanr.findByPk(req.params.id);
    return res.json(zanr);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Greska pri citanju", data: err });
  }
});

//POST sa podacima u body
route.post("/", async (req, res) => {
  const shema = Joi.object().keys({
    naziv: Joi.string().trim().min(5).max(25).required(),
  });

  const { error, succ } = shema.validate(req.body);

  if (error) {
    console.error("Validation Error:", error);
    return res.status(400).json({
      // error: error.details.map((detail) => detail.message).join(", "),
      error: "Validation failed",
      details: error.details.map((detail) => ({
        field: detail.context.key,
        message: detail.message,
      })),
    });
  } else {
    try {
      const novi = {};
      novi.naziv = req.body.naziv;
      const insertovani = await Zanr.create(novi);
      return res.json(insertovani);
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: "Greska pri unosu", data: err });
    }
  }
});

//PUT koji radi izmenu
route.put("/:id", async (req, res) => {
  try {
    const novi = await Zanr.findByPk(req.params.id);
    novi.naziv = req.body.naziv;
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
    const zanr = await Zanr.findByPk(req.params.id);
    zanr.destroy();
    return res.json(zanr.id); //vraca id obrisanog
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Greska pri brisanju", data: err });
  }
});
module.exports = route;
