const Categories = require("../models/categories.models");
const Products = require("../models/products.models");

const createCategory = async (req, res) => {
  try {
    const { name } = req.query;
    const [category, created] = await Categories.findOrCreate({
      where: { name },
    });
    if (created) {
      res.status(200).send(category);
    } else {
      res.status(409).json({
        msg: `The category ${name} already exist`,
        category,
      });
    }
  } catch (error) {
    res.status(400).send(error);
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
  getAllCategories,
};
