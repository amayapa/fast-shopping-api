const { DataTypes } = require("sequelize");
const sequelize = require("../db");
const Orderlines = require("./orderlines.models");

const Orders = sequelize.define("orders", {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  total: {
    type: DataTypes.DECIMAL(9, 2),
    allowNull: false,
    validate: {
      notNull: {
        msg: "Total is mandatory",
      },
      isDecimal: {
        msg: 'Total must have decimals(cents), if it is an exact subTotal could be "00"',
      },
      min: {
        args: [0],
        msg: "Total can't be less than 0,00",
      },
    },
  },
});

Orders.hasMany(Orderlines, { as: "orderlines" });

module.exports = Orders;
