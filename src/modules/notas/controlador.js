const db = require("../../DB/mysql");

const TABLA = "notas";
//Insertar nombre de la tabla

function all() {
  return db.getAll(TABLA);
}

function get(id) {
  return db.getByID(TABLA, id);
}

function add(data) {
  return db.add(TABLA, data);
}

function deleteById(id) {
  return db.deleteByID(TABLA, id);
}

module.exports = {
  all,
  get,
  add,
  deleteById,
  
};