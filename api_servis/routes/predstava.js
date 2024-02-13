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
const Joi = require("joi");
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
    const predstava = await Predstava.findByPk(req.params.id, {
      include: [
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

//POST sa podacima u body
route.post("/", async (req, res) => {
  const shema = Joi.object().keys({
    naziv: Joi.string().trim().min(5).max(25).required(),
    datum: Joi.date().greater("now").required(),
    vreme: Joi.string()
      .regex(/^([01]\d|2[0-3]):([0-5]\d)$/)
      .required(),
    izabranoPozoriste: Joi.string().trim().min(1).required(),
    izabranaSala: Joi.string().trim().min(1).required(),
    izabraniZanr: Joi.string().trim().min(1).required(),
    glumciInput: Joi.string().trim().min(1).required(),
    cena: Joi.number().greater(0).required(),
  });

  console.log("Before validation");
  const { error, succ } = shema.validate(req.body);
  console.log("After validation");

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
      novi.idPozorista = req.body.izabranoPozoriste;
      novi.datum = req.body.datum;
      novi.vreme = req.body.vreme;
      novi.idSale = req.body.izabranaSala;
      novi.cena = req.body.cena;
      novi.idZanra = req.body.izabraniZanr;
      novi.izabraniGlumci = req.body.glumciInput
        .split(",")
        .map((id) => id.trim()); // Create a new Predstava or retrieve existing based on the name
      // const insertovani = await Predstava.findOrCreate({
      //   where: { naziv: novi.naziv },
      //   defaults: novi,
      // });
      logStream.write("from body: \n" + JSON.stringify(req.body));
      // Validate if izabranaPredstava is provided
      if (!novi.izabraniGlumci || novi.izabraniGlumci.length === 0) {
        return res
          .status(400)
          .json({ error: "Izabrani glumci nisu pravilno poslati." });
      }
      // Validate if izabranaSala is provided
      if (!novi.idSale) {
        return res.status(400).json({ error: "Sala nije pravilno poslata." });
      }
      const novaPredstava = await Predstava.create({
        naziv: novi.naziv,
        idPozorista: novi.idPozorista,
        datum: novi.datum,
        vreme: novi.vreme,
        idSale: novi.idSale,
        cena: novi.cena,
        idZanra: novi.idZanra,
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
        for (const izabrani of novi.izabraniGlumci) {
          await PredstavaGlumac.create({
            idPredstave: novaPredstava.id,
            idGlumca: izabrani,
          });
          console.log("Record created successfully.");
          logStream.write(
            "Record created successfully." + JSON.stringify(req.body)
          );
        }
        // await PredstavaGlumac.create({
        //   idPredstave: novaPredstava.id,
        //   idGlumca: glumciInput,
        // });
        // console.log("Record created successfully.");
        // logStream.write(
        //   "Record created successfully.\n" + JSON.stringify(req.body)
        // );
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
  }
});

//PUT koji radi izmenu
route.put("/:id", async (req, res) => {
  const shema = Joi.object().keys({
    naziv: Joi.string().trim().min(5).max(25).required(),
    datum: Joi.date().greater("now").required(),
    vreme: Joi.string()
      .regex(/^([01]\d|2[0-3]):([0-5]\d)$/)
      .required(),
    izabranoPozoriste: Joi.string().trim().min(1).required(),
    izabranaSala: Joi.string().trim().min(1).required(),
    izabraniZanr: Joi.string().trim().min(1).required(),
    izabraniGlumac: Joi.array().items(Joi.string().trim().min(1)).required(),
    cena: Joi.number().greater(0).required(),
  });

  const { error, succ } = shema.validate(req.body);

  if (error) {
    console.error("Validation Error:", error);
    return res.status(400).json({
      error: error.details.map((detail) => detail.message).join(", "),
    });
  }
  try {
    const predstava = await Predstava.findByPk(req.params.id);

    if (!predstava) {
      return res.status(404).json({ error: "Predstava not found." });
    }
    predstava.naziv = req.body.naziv;
    predstava.idPozorista = req.body.izabranoPozoriste;
    predstava.datum = req.body.datum;
    predstava.vreme = req.body.vreme;
    predstava.idSale = req.body.izabranaSala;
    predstava.cena = req.body.cena;
    predstava.idZanra = req.body.izabraniZanr;

    const izabraniGlumac = req.body.izabraniGlumac;

    if (!izabraniGlumac || izabraniGlumac.length === 0) {
      return res
        .status(400)
        .json({ error: "Izabrani glumac nije pravilno poslat." });
    }

    // Iterate through izabranaPredstava
    for (const idGlumca of izabraniGlumac) {
      // Check if the relationship already exists in PredstavaGlumac
      const existingRelationship = await PredstavaGlumac.findOne({
        where: { idPredstave: predstava.id, idGlumca: idGlumca },
      });

      // If the relationship doesn't exist, create it
      if (!existingRelationship) {
        await PredstavaGlumac.create({
          idPredstave: predstava.id,
          idGlumca: idGlumca,
        });
        console.log("New association created successfully.");
      }
    }
    await predstava.save();

    return res.json(predstava);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Greska pri izmeni", data: err });
  }
});

//DELETE brise po prosledjenom id-ju
route.delete("/:id", async (req, res) => {
  try {
    const predstava = await Predstava.findByPk(req.params.id);

    // Check if the predstava exists
    if (!predstava) {
      return res
        .status(404)
        .json({ success: false, message: "Predstava not found." });
    }

    // Find and delete all associations in PredstavaGlumac for the given Glumac id
    await PredstavaGlumac.destroy({
      where: { idPredstave: req.params.id },
    });
    await predstava.destroy();
    return res.json(predstava.id); //vraca id obrisanog
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Greska pri brisanju", data: err });
  }
});

// DELETE route to remove relationship between glumac and predstava
route.delete("/:predstavaId/glumac/:glumacId", async (req, res) => {
  try {
    const { glumacId, predstavaId } = req.params;
    // Log the generated SQL query to the console
    const deleteQuery = `DELETE FROM PredstavaGlumacs WHERE idGlumca = ${glumacId} AND idPredstave = ${predstavaId}`;
    console.log("Generated SQL query:", deleteQuery);

    // Check if the relationship exists
    const predstavaGlumac = await PredstavaGlumac.findOne({
      where: {
        idGlumca: glumacId,
        idPredstave: predstavaId,
      },
    });

    if (!predstavaGlumac) {
      return res.status(404).json({ error: "Relacija nije pronađena." });
    }

    // Delete the relationship
    await predstavaGlumac.destroy();

    return res.json({ success: true });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Greska pri brisanju relacije", data: err });
  }
});
module.exports = route;
