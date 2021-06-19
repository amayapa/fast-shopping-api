const express = require("express");
const app = express();
const {
  createCategory,
  getAllCategories,
} = require("../controllers/categories.controller");

app.get("/", getAllCategories);

app.post("/", createCategory);

module.exports = app;
