const { Sequelize } = require("sequelize");
const sequelize = require("../db");
const S = Sequelize;
const Categories = require("./categories.models");

const Products = sequelize.define("products", {
  id: {
    type: S.INTEGER,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
  },
  name: {
    type: S.STRING,
    allowNull: false,
    validate: {
      notNull: {
        msg: "Name is mandatory",
      },
      len: {
        arg: [5, 40],
        msg: "Descripción must have between 5 y 40 characters",
      },
    },
  },
  description: {
    type: S.TEXT,
    allowNull: false,
    validate: {
      notNull: {
        msg: "Description is mandatory",
      },
      len: {
        arg: [1, 255],
        msg: "Descripción must have between 20 y 255 characters",
      },
    },
  },
  price: {
    type: S.DECIMAL(9, 2),
    allowNull: false,
    validate: {
      notNull: {
        msg: "Price is mandatory",
      },
    },
  },
  stock: {
    type: S.INTEGER,
    allowNull: false,
    validate: {
      notNull: {
        msg: "Minimun stock is one",
      },
      isInt: {
        msg: "Stock must be an integer",
      },
      min: {
        args: [0],
        msg: "Minimun stock is one",
      },
    },
  },
});

Products.belongsToMany(Categories, { through: "category_product" });
Categories.belongsToMany(Products, { through: "category_product" });

module.exports = Products;
