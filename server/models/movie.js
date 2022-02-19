"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Movie extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Movie.belongsTo(models.User, { foreignKey: "authorId" });
      Movie.belongsTo(models.Genre, { foreignKey: "genreId" });
      Movie.hasMany(models.History, { foreignKey: "movieId" });
      Movie.belongsToMany(models.Customer, {
        through: models.Bookmark,
        foreignKey: "movieId",
      });
    }
  }
  Movie.init(
    {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          notEmpty: {
            msg: "Title is required",
          },
          notNull: {
            msg: "Title is required",
          },
        },
      },
      synopsis: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Synopsis is required",
          },
          notNull: {
            msg: "Synopsis is required",
          },
        },
      },
      trailerUrl: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Trailer is required",
          },
          notNull: {
            msg: "Trailer is required",
          },
          isUrl: {
            msg: "TrailerUrl must be url format",
          },
        },
      },
      imgUrl: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "ImgUrl is required",
          },
          notNull: {
            msg: "ImgUrl is required",
          },
          isUrl: {
            msg: "ImgUrl must be url format",
          },
        },
      },
      rating: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Rating is required",
          },
          min: {
            args: [1],
            msg: "Rating minimal 1",
          },
          max: {
            args: [5],
            msg: "Max Rating 5",
          },
        },
      },
      status: {
        type: DataTypes.STRING,
      },
      authorId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: {
            msg: "AuthorId is required",
          },
        },
      },
      genreId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: {
            msg: "GenreId is required",
          },
        },
      },
    },
    {
      sequelize,
      modelName: "Movie",
    }
  );
  return Movie;
};
