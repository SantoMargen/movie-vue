'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Bookmark extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Bookmark.belongsTo(models.Movie, { foreignKey: 'movieId' })
      Bookmark.belongsTo(models.Customer, { foreignKey: 'customerId' })

    }
  };
  Bookmark.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    movieId:{
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: "movieId is required",
        },
      },
    },
    customerId: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notNull: {
          msg: "userId is required",
        },
      },
    },
  }, {
    sequelize,
    modelName: 'Bookmark',
  });
  return Bookmark;
};