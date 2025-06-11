const express = require("express");
const app = express.Router();
const controlador = require("./controlador");

app.get("/", (req, res) => {
  const todos = controlador.all()
  .then((items) =>{
    const obj = Object.values(items);
    res.status(200).render("notas", {
      objetos: obj,
      tituloWeb: "Notas"
    });
  })
});
app.get("/crear", (req, res) => {
  res.render("agregarNota", {
    tituloWeb: "Crear Nota",
  })
});


app.get("/leer/:id", (req, res) => {
  let id = req.params.id;
  const elem = controlador.get(id)
  .then((items) => {
    const obj = JSON.parse(JSON.stringify(items));
    if(obj) {
      res.status(200).render("nota", {
        tituloWeb: "Detalles",
        objeto: obj[0],
      });
    } else {
        res.status(404).send("Elemento no encontrado");
    }
  })
});

app.get("/editar/:id", (req, res) => {
  const id = req.params.id;
  const elem = controlador.get(id)
  .then((items) => {
    const obj = JSON.parse(JSON.stringify(items));
    res.status(200).render("editarNotas", {
      tituloWeb: "Editar Notas",
      objeto : obj[0],
    })
  });
});

app.post("/editar/:id", (req, res) =>{ 
  console.log(req.body);
  const data = {
    id: req.params.id,
    titulo: req.body.titulo,
    contenido: req.body.contenido,
    fecha: new Date()
  }
  const elem = controlador.add(data)
  .then((item) => {
    res.status(200).redirect("/notas");
  });
});

app.post("/crear", (req, res) => {
  const obj = {
    id: 0,
    titulo: req.body.titulo,
    contenido: req.body.contenido,
    fecha: new Date(),
  }

  const elem = controlador.add(obj)
  .then((item) => {
    res.status(200).redirect("/notas");
  });
});

app.post("/eliminar/:id", (req, res) => {
  const id = req.params.id;

  const elem = controlador.deleteById(id)
  .then((item) => {
    res.status(200).redirect("/notas");
  })
});

module.exports = app;
