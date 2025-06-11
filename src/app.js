const express = require("express");
const config = require("./config");
const path = require("path");
require("ejs");

const app = express();
const modulo1 = require("./modules/modulo1/rutas");
const notas = require("./modules/notas/rutas");

//configuración
app.set("port", config.app.port);
app.set("appName", config.app.name);
app.set("view engine", "ejs");
app.use(express.urlencoded({extended: true}));
app.set("views", path.join(__dirname, "views"));
//rutas
app.get("/", (req, res) => {
  res.render("home", {
    tituloWeb: "Landing Page"
  });
});


app.use("/notas", notas);
app.use("/ejemplo", modulo1);

app.use("/public/css", express.static("./src/public/css", {
  setHeaders: (res) => res.set("Content-type", "text/css")
}));


module.exports = app;