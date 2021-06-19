require("dotenv").config();
const { DB_PASSWORD } = process.env;

module.exports = {
  database: {
    username: "root",
    password: DB_PASSWORD,
    database: "fastshopping",
    host: "localhost",
    port: "3307",
  },
};
