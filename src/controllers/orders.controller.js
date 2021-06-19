const Orderlines = require("../models/orderlines.models");
const Orders = require("../models/orders.models");
const { ORDER_NOT_CREATED } = require("../constants");
const Products = require("../models/products.models");
const { updateProductsStock } = require("../api/requests");

const getAllOrders = async (req, res) => {
  Orders.findAll({
    include: {
      model: Orderlines,
      as: "orderlines",
      include: {
        model: Products,
        as: "products",
      },
    },
  })
    .then((orders) => res.status(200).send(orders))
    .catch((err) => {
      res.send(err);
      throw err;
    });
};

const getOrderById = async (req, res) => {
  const { orderId } = req.params;
  Orders.findByPk(orderId, {
    include: {
      model: Orderlines,
      as: "orderlines",
      include: {
        model: Products,
        as: "products",
      },
    },
  })
    .then((order) => res.status(200).send(order))
    .catch((err) => {
      res.status(400).send(err);
      throw err;
    });
};

const createOrder = async (req, res) => {
  const order = req.body || {};
  try {
    const createdOrder = await Orders.create(order, {
      include: {
        model: Orderlines,
        as: "orderlines",
      },
    });
    if (createdOrder) {
      const orderlines = createdOrder.get({ plain: true }).orderlines;
      await updateProductsStock(orderlines);
      return res.status(200).send(createdOrder);
    }
    return res.status(400).send(ORDER_NOT_CREATED);
  } catch (error) {
    res.status(400).send(error);
    throw error;
  }
};

module.exports = {
  getAllOrders,
  getOrderById,
  createOrder,
};
