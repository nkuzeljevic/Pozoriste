const express = require("express");
const cors = require("cors");
const app = express();

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
} = require("../models");
// app.use('/admin', express.static('public'));
const corsOptions = {
  origin: ["http://localhost:8000", "http://127.0.0.1:8000"],
};
app.use(cors(corsOptions));

app.get("/", (req, res) => {
  res.send("Hello from REST API service");
});

const pozoristeRoutes = require("./routes/pozoriste.js");
app.use("/admin/pozoriste", pozoristeRoutes);

const predstavaRoutes = require("./routes/predstava.js");
app.use("/admin/predstava", predstavaRoutes);

const posetilacRoutes = require("./routes/posetilac.js");
app.use("/admin/posetilac", posetilacRoutes);

const glumacRoutes = require("./routes/glumac.js");
app.use("/admin/glumac", glumacRoutes);

const salaRoutes = require("./routes/sala.js");
app.use("/admin/sala", salaRoutes);

const rezervacijaRoutes = require("./routes/rezervacija.js");
app.use("/admin/rezervacija", rezervacijaRoutes);

const zanrRoutes = require("./routes/zanr.js");
app.use("/admin/zanr", zanrRoutes);

app.listen({ port: 9000 }, async () => {
  console.log("Started server on localhost:9000");
  // await sequelize.sync({ force: true });
  console.log("DB synced");
});
