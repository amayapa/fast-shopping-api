const express = require("express");
const {
  getAllOrders,
  getOrderById,
  createOrder,
} = require("../controllers/orders.controller");
const app = express();

app.get("/", getAllOrders);

app.get("/:orderId", getOrderById);

app.post("/", createOrder);

module.exports = app;
