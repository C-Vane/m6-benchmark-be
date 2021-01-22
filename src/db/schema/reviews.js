module.exports = (sequelize, DataTypes) => {
  const Review = sequelize.define("review", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    comment: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    rate: {
      type: DataTypes.INTEGER,
      validator: {
        max: 5,
        min: 1,
      },
    },
  });
  Review.associate = (models) => {
    Review.belongsTo(models.Product, { allowNull: false });
    Review.belongsTo(models.User, { allowNull: false });
  };
  return Review;
};
