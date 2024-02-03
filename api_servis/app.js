const express = require("express");

const app = express();

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

app.listen(9000, () => {
  console.log("Started server on localhost:9000");
});
