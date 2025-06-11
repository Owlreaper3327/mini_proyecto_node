const mysql = require("mysql");
const config = require("../config");

const dbconfig = {
  host: config.mysql.host,
  user: config.mysql.user,
  password: config.mysql.password,
  database: config.mysql.database,
}

let connection;

function conMysql() {
  connection = mysql.createConnection(dbconfig);

  connection.connect((err) => {
    if(err) {
      console.log(`[db error]`, err);
      setTimeout(conMysql, 200);
    }
    else {
      console.log("DB conectada!");
    }
  });

  connection.on(`error`, err =>{
    console.log("[db err]", err);
    if (err.code === "PROTOCOL_CONNECTION_LOST") {
      conMysql();
    }
    else {
      throw err;
    }
  });
}

conMysql();

function getAll(tabla) {
  return new Promise((resolve, reject) => {
    connection.query(`SELECT * FROM ${tabla};`, (error, result) => {
      if(error) return reject(error);
      resolve(result);
    });
  });
}

function getByID(tabla, id) {
  return new Promise((resolve, reject) => {
    connection.query(`SELECT * FROM ${tabla} WHERE id = ?`, id, (error, result) => {
      if(error) return reject(error);
      resolve(result);
    });
  })
}

function insert(tabla, data) {
  return new Promise((resolve, reject) => {
    connection.query(`INSERT INTO ${tabla} SET ?`, data, (error, result) => {
      if(error) return reject(error);
      resolve(result);
    });
  })
}

function update(tabla, data) {
  return new Promise((resolve, reject) => {
    connection.query(`UPDATE ${tabla} SET ? WHERE id = ?`, [data, data.id], (error, result) => {
      if(error) return reject(error);
      resolve(result);
    });
  }) 
}

function add(tabla, data) {
  if(data && data.id == 0) {
    return insert(tabla, data);
  }
  else {
    return update(tabla, data);
  }
}

function deleteByID(tabla, id) {
  return new Promise((resolve, reject) => {
    connection.query(`DELETE FROM ${tabla} WHERE id = ?`, id, (error, result) => {
      if(error) return reject(error);
      resolve(result);
    });
  })
}

module.exports = {
  getAll,
  getByID,
  add,
  deleteByID,
}