module.exports = {
  app: {
    port: process.env.PORT || 2700,
    name: "Mi proimer proyecto de Node"
  },
  mysql: {
    host: process.env.MYSQL_HOST || "localhost",
    user: process.env.MYSQL_USER || "root",
    password: process.env.MYSQL_PASSWORD || "",
    database: process.env.MYSQL_DB || "base1",
  } 

}