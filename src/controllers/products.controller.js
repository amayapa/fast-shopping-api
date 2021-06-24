const { PRODUCT_EXISTS } = require("../constants");
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
  try {
    const product = req.body || {};
    const productExists = await Products.findOne({
      where: {
        name: product.name,
      },
    });
    if (productExists) {
      return res.status(409).send(PRODUCT_EXISTS);
    }
    const createdProduct = await Products.create(product);
    if (createdProduct) {
      product.categories.map((categoryId) => {
        createdProduct.addCategory(categoryId);
      });
      res.status(200).send(createdProduct);
    }
  } catch (error) {
    res.status(400).send(error);
    throw error;
  }
};

const bulkCreateProducts = async (req, res) => {
  try {
    const products = req.body || {};
    const createdProducts = await Products.bulkCreate(products);
    if (createdProducts) {
      createdProducts.map((product) => {
        const { categories } =
          products.find(({ name }) => name === product.name) || {};
        categories &&
          categories.map((categoryId) => {
            product.addCategory(categoryId);
          });
      });

      res.status(200).send(createdProducts);
    }
  } catch (error) {
    res.status(400).send(error.message);
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
