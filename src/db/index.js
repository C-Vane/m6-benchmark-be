const { Sequelize, DataTypes } = require("sequelize");
const Review = require("./schema/reviews");
const Cart = require("./schema/carts");
const Category = require("./schema/categories");
const Product = require("./schema/products");
const User = require("./schema/users");
const sequelize = new Sequelize(process.env.PGDATABASE, process.env.PGUSER, process.env.PGPASSWORD, {
  host: process.env.PGHOST,
  dialect: "postgres",
});

const models = {
  Category: Category(sequelize, DataTypes),
  User: User(sequelize, DataTypes),
  Product: Product(sequelize, DataTypes),
  Review: Review(sequelize, DataTypes),
  Cart: Cart(sequelize, DataTypes),
};

Object.keys(models).forEach((modelName) => {
  if ("associate" in models[modelName]) {
    models[modelName].associate(models);
  }
});

//TO DO?
models.sequelize = sequelize;
models.Sequelize = Sequelize;

sequelize
  .authenticate()
  .then(() => console.log("Connection established"))
  .catch((e) => console.log("Connection failed ", e));

module.exports = models;
