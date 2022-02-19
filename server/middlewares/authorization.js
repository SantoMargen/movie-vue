const { Movie } = require("../models");

const authorization = async (req, res, next) => {
  try {
    const { role, id:userId } = req.user;
    const id = Number(req.params.id);
    if (!id) {
      throw { name: "InvalidMovieId" };
    }
    const movie = await Movie.findOne({ where: { id: id || null } });
    if (!movie) {
      throw { name: "NotFound" };
    }

    if (role !== "Admin") {
      if (userId !== movie.authorId) {
        throw { name: "Can'tAccess" };
      }
    }
    next();
  } catch (err) {
    next(err);
  }
};

module.exports = authorization;
