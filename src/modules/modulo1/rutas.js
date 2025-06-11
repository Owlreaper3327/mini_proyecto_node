const express = require("express");
const app = express.Router();
const controlador = require("./controlador");

app.get("/", (req, res) => {
  const todos = controlador.all()
  .then((items) =>{
    const obj = Object.values(items);
    res.status(200).render("ejemplo", {
    objetos: obj,
    tituloWeb: "Ejemplos",
     });
  })
});

app.get("/:id", (req, res) => {
  let id = req.params.id;
  const elem = controlador.get(id)
  .then((items) => {
    if(items) {
      res.status(200).send(items);
    } else {
        res.status(404).send("Elemento no encontrado");
    }
  })
});

module.exports = app;
