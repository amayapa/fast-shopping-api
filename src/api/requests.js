const axios = require("axios");
const API_PATH = require(".");

const updateProductsStock = async (orderlines) => {
  const { data: updatedProducts } = await axios.put(
    `${API_PATH}/products/stock`,
    orderlines
  );
  return updatedProducts;
};

module.exports = {
  updateProductsStock,
};
