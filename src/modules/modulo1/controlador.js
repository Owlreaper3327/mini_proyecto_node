const db = require("../../DB/mysql");

const TABLA = "ejemplo";
//Insertar nombre de la tabla

function all() {
  return db.getAll(TABLA);
}

function get(id) {
  return db.getByID(TABLA, id);
}

module.exports = {
  all,
  get,
  
};