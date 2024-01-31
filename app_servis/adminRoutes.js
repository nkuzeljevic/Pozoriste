const express = require("express");
const router = express.Router();
const BP = require("body-parser");

router.use(BP.urlencoded({ extended: false }));

router.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "static", "admin", "index.html"));
});

router.post("/novo-pozoriste", (req, res) => {
  console.log(req.body);
  res.send(req.body);
});

router.post("/nova-sala", (req, res) => {
  res.send(req.body);
  console.log(req.body);
});

router.post("/nova-predstava", (req, res) => {
  res.send(req.body);
  console.log(req.body);
});

router.post("/novi-glumac", (req, res) => {
  res.send(req.body);
  console.log(req.body);
});

router.post("/rezervacija", (req, res) => {
  res.send(req.body);
  console.log(req.body);
});

module.exports = router;
