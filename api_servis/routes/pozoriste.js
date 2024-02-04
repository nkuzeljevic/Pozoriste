const express = require("express");
const { sequelize, Pozoriste, Predstava, Sala } = require("../../models");
const route = express.Router();
const BP = require("body-parser");

route.use(BP.urlencoded({ extended: false }));
route.use(express.json());
route.use(express.urlencoded({ extended: true }));

//GET koji vraca sve zapise iz baze (posto smo u modulu, vec se nalazimo u /admin/pozoriste)
route.get("/", async (req, res) => {
  try {
    const pozoriste = await Pozoriste.findAll({
      include: [
        {
          model: Predstava,
          as: "predstave",
        },
        {
          model: Sala,
          as: "sale",
        },
      ],
    });
    console.log(pozoriste);
    return res.json(pozoriste);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Greska pri citanju", data: err });
  }
});

//GET koji vraca po specificnom id-ju
route.get("/:id", async (req, res) => {
  try {
    const pozoriste = await Pozoriste.findByPk(req.params.id);
    return res.json(pozoriste);
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
    novi.opis = req.body.opis;
    novi.adresa = req.body.adresa;
    novi.telefon = req.body.telefon;
    novi.email = req.body.email;
    const insertovani = await Pozoriste.create(novi);
    return res.json(insertovani);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Greska pri unosu", data: err });
  }
});

//PUT koji radi izmenu
route.put("/:id", async (req, res) => {
  try {
    const novi = await Pozoriste.findByPk(req.params.id);
    novi.naziv = req.body.naziv;
    novi.opis = req.body.opis;
    novi.adresa = req.body.adresa;
    novi.telefon = req.body.telefon;
    novi.email = req.body.email;
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
    const pozoriste = await Pozoriste.findByPk(req.params.id);
    pozoriste.destroy();
    return res.json(pozoriste.id); //vraca id obrisanog
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Greska pri brisanju", data: err });
  }
});
module.exports = route;
