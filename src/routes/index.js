const { Router } = require("express");

const productRouter = require("./products.routes.js");
const ordersRouter = require("./orders.routes.js");
const categoriesRouter = require("./categories.routes.js");

const app = Router();

app.use("/products", productRouter);
app.use("/orders", ordersRouter);
app.use("/categories", categoriesRouter);

module.exports = app;
