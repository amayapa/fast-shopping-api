const express = require("express");
const app = express();
const {
  updateProductsStock,
  getAllProducts,
  createProduct,
  bulkCreateProducts,
} = require("../controllers/products.controller");

app.get("/", getAllProducts);

app.post("/", createProduct);

app.post("/bulk", bulkCreateProducts);

app.put("/stock", updateProductsStock);

module.exports = app;
