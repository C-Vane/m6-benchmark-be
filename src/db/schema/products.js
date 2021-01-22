module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define("product", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    brand: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    img: {
      type: DataTypes.STRING,
      allowNull: false,
      validator: {
        isUrl: true,
      },
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
  });

  Product.associate = (models) => {
    Product.belongsTo(models.Category, { allowNull: false });
    Product.hasMany(models.Cart);
    Product.belongsToMany(models.User, {
      through: { model: models.Cart, unique: false },
    });
  };

  return Product;
};
