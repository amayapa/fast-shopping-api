const { Sequelize } = require("sequelize");
const sequelize = require("../db");
const S = Sequelize;
const Products = require("./products.models");

const Orderlines = sequelize.define("orderlines", {
  id: {
    type: S.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  productsId: {
    type: S.INTEGER,
    allowNull: false,
  },
  orderId: {
    type: S.INTEGER,
    allowNull: false,
  },
  subTotal: {
    type: S.DECIMAL(9, 2),
    allowNull: false,
    validate: {
      notNull: {
        msg: "SubTotal is mandatory",
      },
      isDecimal: {
        msg: 'SubTotal must have decimals(cents), if it is an exact subTotal could be "00"',
      },
      min: {
        args: [0],
        msg: "SubTotal can't be less than 0,00",
      },
    },
  },
  quantity: {
    type: S.INTEGER,
    validate: {
      min: {
        args: [1],
        msg: "Quantity can't be less than 1",
      },
    },
  },
});

Orderlines.belongsTo(Products, { as: "products" });

module.exports = Orderlines;
