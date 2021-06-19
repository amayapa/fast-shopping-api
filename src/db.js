const { Sequelize } = require("sequelize");
const { database } = require("../config");

let sequelize;

if (process.env.CLEARDB_DATABASE_URL) {
  sequelize = new Sequelize(process.env.CLEARDB_DATABASE_URL, {
    dialect: "mysql",
  });
} else {
  sequelize = new Sequelize(
    `mysql://${database.username}:${database.password}@${database.host}:${database.port}/${database.database}`
  );
}

module.exports = sequelize;
