const { Genre } = require("../models");

class ControllerGenre {
  static async getAllGenre(req, res, next) {
    try {
      const genre = await Genre.findAll({
        attributes: { exclude: ["createdAt", "updatedAt"] }
      });

      res.status(200).json(genre);
    } catch (err) {
      next(err);
    }
  }
}

module.exports = ControllerGenre;
