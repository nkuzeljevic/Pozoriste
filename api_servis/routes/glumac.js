const express = require("express");
const {
  sequelize,
  Glumac,
  PredstavaGlumac,
  Predstava,
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
    const glumci = await Glumac.findAll({
      include: [
        {
          model: PredstavaGlumac,
          include: [Predstava],
          as: "PredstavaGlumacs",
        },
      ],
    });
    return res.json(glumci);
  } catch (err) {
    if (err.name === "SequelizeDatabaseError") {
      console.error("Database error:", err);
    } else {
      console.error(err);
    }
    res.status(500).json({ error: "Greska pri citanju", data: err });
    console.log(err);
    // res.status(500).json({ error: "Greska pri citanju", data: err });
  }
});

//GET koji vraca po specificnom id-ju
route.get("/:id", async (req, res) => {
  try {
    const glumac = await Glumac.findByPk(req.params.id, {
      include: [
        {
          model: PredstavaGlumac,
          include: [Predstava],
          as: "PredstavaGlumacs",
        },
      ],
    });
    return res.json(glumac);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Greska pri citanju", data: err });
  }
});

//POST sa podacima u body
route.post("/", async (req, res) => {
  console.log("Request Object:", req);
  const shema = Joi.object().keys({
    ime: Joi.string().trim().min(5).max(35).required(),
    opis: Joi.string().trim().min(1).required(),
    // izabranaPredstava: Joi.array()
    //   .items(
    //     Joi.object({
    //       id: Joi.string().trim().min(1).required(),
    //       name: Joi.string().trim().min(1).required(),
    //     })
    //   )
    //   .required(),
    izabranaPredstava: Joi.array().items(Joi.string().trim().min(1)).required(),
  });

  const { error, succ } = shema.validate(req.body);
  if (error) {
    console.error("Validation Error:", error);
    return res.status(400).json({
      error: error.details.map((detail) => detail.message).join(", "),
    });
  } else {
    try {
      // Extract data from the request
      const { ime, opis, izabranaPredstava } = req.body;
      logStream.write("from body: \n" + JSON.stringify(req.body));

      // Validate if izabranaPredstava is provided
      if (!izabranaPredstava || izabranaPredstava.length === 0) {
        return res
          .status(400)
          .json({ error: "Izabrana predstava nije pravilno poslata." });
      }

      // Create a new Glumac
      const noviGlumac = await Glumac.create({
        ime: ime,
        opis: opis,
      });
      try {
        // await PredstavaGlumac.create({
        //   idPredstave: izabranePredstave,
        //   idGlumca: noviGlumac.id,
        // Create PredstavaGlumac associations for each izabranaPredstava
        for (const izabrana of izabranaPredstava) {
          await PredstavaGlumac.create({
            idPredstave: izabrana,
            idGlumca: noviGlumac.id,
          });
          console.log("Record created successfully.");
          logStream.write(
            "Record created successfully." + JSON.stringify(req.body)
          );
        }
      } catch (error) {
        console.error("Error creating record:", error);
        logStream.write(`Error creating record: ${error}\n`);
      }
      // Create a new PredstavaGlumac association

      return res.json(noviGlumac);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Greska pri unosu", data: err });
    }
  }
});

//PUT koji radi izmenu
route.put("/:id", async (req, res) => {
  const shema = Joi.object().keys({
    ime: Joi.string().trim().min(5).max(35).required(),
    opis: Joi.string().trim().min(1).required(),
    izabranaPredstava: Joi.array().items(Joi.string().trim().min(1)).required(),
  });

  const { error } = shema.validate(req.body);

  if (error) {
    console.error("Validation Error:", error);
    return res.status(400).json({
      error: error.details.map((detail) => detail.message).join(", "),
    });
  }

  try {
    // Find the existing Glumac by ID
    const glumac = await Glumac.findByPk(req.params.id);

    if (!glumac) {
      return res.status(404).json({ error: "Glumac not found." });
    }

    // Update Glumac properties
    glumac.ime = req.body.ime;
    glumac.opis = req.body.opis;

    // Validate if izabranaPredstava is provided
    const izabranaPredstava = req.body.izabranaPredstava;

    if (!izabranaPredstava || izabranaPredstava.length === 0) {
      return res
        .status(400)
        .json({ error: "Izabrana predstava nije pravilno poslata." });
    }

    // Iterate through izabranaPredstava
    for (const idPredstave of izabranaPredstava) {
      // Check if the relationship already exists in PredstavaGlumac
      const existingRelationship = await PredstavaGlumac.findOne({
        where: { idPredstave: idPredstave, idGlumca: glumac.id },
      });

      // If the relationship doesn't exist, create it
      if (!existingRelationship) {
        await PredstavaGlumac.create({
          idPredstave: idPredstave,
          idGlumca: glumac.id,
        });
        console.log("New association created successfully.");
      }
    }

    // Save the updated Glumac
    await glumac.save();

    return res.json(glumac);
  } catch (err) {
    console.error("Error updating Glumac:", err);
    res.status(500).json({ error: "Greska pri izmeni", data: err });
  }
});

//DELETE brise po prosledjenom id-ju
route.delete("/:id", async (req, res) => {
  try {
    // Find the Glumac by id
    const glumac = await Glumac.findByPk(req.params.id);

    // Check if the Glumac exists
    if (!glumac) {
      return res
        .status(404)
        .json({ success: false, message: "Glumac not found." });
    }

    // Find and delete all associations in PredstavaGlumac for the given Glumac id
    await PredstavaGlumac.destroy({
      where: { idGlumca: req.params.id },
    });

    // Delete the Glumac
    await glumac.destroy();

    return res.json({
      success: true,
      message: "Glumac and associations deleted successfully.",
    });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ success: false, error: "Error deleting Glumac", data: err });
  }
});
// DELETE route to remove relationship between glumac and predstava
route.delete("/:glumacId/predstava/:predstavaId", async (req, res) => {
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
