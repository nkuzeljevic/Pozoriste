const express = require("express");
const path = require("path");
const BP = require("body-parser");

//uzimanje instance
const app = express();
//middleware
app.use(express.static(path.join(__dirname, "static")));

//rute
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "static", "index.html"));
});

app.use("/novo-pozoriste", BP.urlencoded({ extended: false }));
app.post("/novo-pozoriste", (req, res) => {
  console.log(req.body);
  res.send(req.body);
});

app.listen(8000);
