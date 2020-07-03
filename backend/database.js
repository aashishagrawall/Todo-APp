const mysql = require("mysql2");
const dbConnection = mysql
  .createPool({
    host: "localhost", // MYSQL HOST NAME
    user: "root", // MYSQL USERNAME
    password: "galaxyfit1", // MYSQL PASSWORD
    database: "todoapp", // MYSQL DB NAME
  })
  .promise();

module.exports = dbConnection;
