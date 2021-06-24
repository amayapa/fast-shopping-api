const Categories = require("../models/categories.models");
const Products = require("../models/products.models");

const createCategory = async (req, res) => {
  const { name } = req.query;
  try {
    const newCategory = await Categories.create(name);
    if (newCategory) {
      res.status(200).send(newCategory);
    }
  } catch (error) {
    res.status(400).send(error);
    throw error;
  }
};

const bulkCreateCategories = async (req, res) => {
  try {
    const categories = req.body;
    const newCategories = await Categories.bulkCreate(categories);
    if (newCategories) {
      res.status(200).send(newCategories);
    }
  } catch (error) {
    res.status(400).send(error.message);
    throw error;
  }
};

const getAllCategories = async (req, res) => {
  try {
    const categories = await Categories.findAll({
      include: {
        model: Products,
        as: "products",
      },
    });
    if (categories) {
      res.status(200).send(categories);
    }
  } catch (error) {
    res.status(400).send(error);
    throw error;
  }
};

module.exports = {
  createCategory,
  bulkCreateCategories,
  getAllCategories,
};
