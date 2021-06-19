const Categories = require("../models/categories.models");
const Products = require("../models/products.models");

const categoriesSeeder = async () => {
  await Categories.bulkCreate([
    { id: 1, name: "Electronics" },
    { id: 2, name: "Jewelery" },
    { id: 3, name: "Men's clothing" },
    { id: 4, name: "Women's clothing" },
  ]);
};

// This function create several relationships between categories and products
function categoy_productSeder() {
  for (let j = 4; j > 0; j--) {
    for (let i = 1; i < 21; i++) {
      if (i === j || j / i === 0) {
        continue;
      }
      Products.findByPk(i).then((product) => {
        Categories.findByPk(j).then((category) => {
          product.addCategory(category);
        });
      });
    }
  }
}

module.exports = { categoriesSeeder, categoy_productSeder };
