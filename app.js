const express = require("express");
const app = express();
const { json, urlencoded } = require("body-parser");
const morgan = require("morgan");
const cors = require("cors");
const routes = require("./src/routes/index.js");

const sequelize = require("./src/db");

/* 
  Uncomment this and bottom code and at the same time set sync({force: true}) 
  to populate the db. Also you can use some express routes with postman or other software
*/

// const {
//   categoriesSeeder,
//   categoy_productSeder,
// } = require("./src/seeder/categories.js");
// const { productsSeeder } = require("./src/seeder/products.js");

const PORT = process.env.PORT || 4000;
app.name = "API";

app.use(json());
app.use(urlencoded({ extended: true }));

app.use(morgan("dev"));

const allowedOrigins = [
  "http://localhost:3000",
  "https://larts85.github.io",
  "https://larts85.github.io/fast-shopping-client",
];
const corsErrorMessage =
  "The CORS policy for this site does not allow access from the specified Origin.";

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true);
      if (allowedOrigins.indexOf(origin) === -1) {
        return callback(new Error(corsErrorMessage), false);
      }
      return callback(null, true);
    },
    credentials: true,
  })
);
app.use("/", routes);

sequelize
  .sync({ force: true })
  .then(() => {
    console.log("Connected successfully to Database");

    // categoriesSeeder();
    // productsSeeder();
    // categoy_productSeder();

    app.listen(PORT, () => {
      console.log(`Server is running on Port ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(`Error: ${error}`);
  });

module.exports = app;
