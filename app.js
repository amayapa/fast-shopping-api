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
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use("/", routes);

sequelize
  .sync({ force: false })
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
