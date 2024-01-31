const express = require("express");
const path = require("path");
const BP = require("body-parser");

//uzimanje instance
const app = express();
//middleware
app.use(express.static(path.join(__dirname, "static")));
//globalni bodyparser za sve rute
app.use(BP.urlencoded({ extended: false }));

//rute
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "static", "index.html"));
});

// app.use("/novo-pozoriste", BP.urlencoded({ extended: false }));
app.post("/novo-pozoriste", (req, res) => {
  console.log(req.body);
  res.send(req.body);
});

app.post("/nova-sala", (req, res) => {
  res.send(req.body);
  console.log(req.body);
});

app.post("/nova-predstava", (req, res) => {
  res.send(req.body);
  console.log(req.body);
});

app.post("/novi-glumac", (req, res) => {
  res.send(req.body);
  console.log(req.body);
});

app.post("/rezervacija", (req, res) => {
  res.send(req.body);
  console.log(req.body);
});

app.listen(8000);
