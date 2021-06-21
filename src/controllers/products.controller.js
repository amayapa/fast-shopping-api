const Categories = require("../models/categories.models");
const Products = require("../models/products.models");

const getAllProducts = async (req, res) => {
  try {
    const products = await Products.findAll({
      include: [{ model: Categories, as: "categories" }],
    });
    if (products) {
      return res.status(200).json(products);
    }
  } catch (error) {
    res.status(400).send(error);
    throw error;
  }
};

const createProduct = async (req, res) => {
  const product = req.body || {};
  try {
    const createdProduct = await Products.create(product);
    if (createdProduct) {
      res.status(200).send(createdProduct);
    }
  } catch (error) {
    res.status(400).send(error);
    throw error;
  }
};

const bulkCreateProducts = async (req, res) => {
  const products = req.body || {};
  const newProducts = [];
  try {
    for (product of products) {
      const createdProduct = await Products.create(product, {
        include: {
          model: Categories,
          as: "categories",
        },
      });
      if (createdProduct) {
        newProducts.push(createdProduct);
      } else {
        newProducts.push("Creation error");
      }
    }
    res.status(200).send(createdProduct);
  } catch (error) {
    res.status(400).send(error);
    throw error;
  }
};

const updateProductsStock = async (req, res) => {
  const orderlines = req.body || {};
  try {
    const updatedProducts = [];
    for (const orderline of orderlines) {
      const updatedProduct = await Products.findOne({
        where: { id: orderline.productsId },
        attributes: ["id", "name", "stock"],
      });
      await updatedProduct.update({
        stock: updatedProduct.stock - orderline.quantity,
      });
      updatedProducts.push(updatedProduct);
    }
    return res.status(200).send(updatedProducts);
  } catch (error) {
    res.status(400).send(error);
    throw error;
  }
};

module.exports = {
  updateProductsStock,
  getAllProducts,
  createProduct,
  bulkCreateProducts,
};
