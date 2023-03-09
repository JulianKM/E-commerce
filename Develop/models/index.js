// import models
const Product = require('./Product');
const Category = require('./Category');
const Tag = require('./Tag');
const ProductTag = require('./ProductTag');

// Products belongsTo Category
Product.belongsTo(Category, {
  foreignKey: "category_id",
  onDelete: "CASCADA"
})

// Categories have many Products
Category.hasMany(Product, {
  // onDelete:"CASCADA"
})
// Products belongToMany Tags (through ProductTag)
Product.belongsToMany(Tag, {
  through: "ProductTag",
  foreignKey: "product_id",
  // onDelete:"CASCADA"
})
// Tags belongToMany Products (through ProductTag)
Tag.belongsToMany(Product, {
  through: "ProductTag",
  foreignKey: "tag_id",
  // onDelete:"CASCADA"
})

module.exports = {
  Product,
  Category,
  Tag,
  ProductTag,
};
