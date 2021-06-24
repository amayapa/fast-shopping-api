const express = require("express");
const app = express();
const {
  createCategory,
  getAllCategories,
  bulkCreateCategories,
} = require("../controllers/categories.controller");

app.get("/", getAllCategories);

app.post("/", createCategory);

app.post("/bulk", bulkCreateCategories);

module.exports = app;
