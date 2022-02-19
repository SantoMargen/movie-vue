const { Movie, History } = require("../models");

class ControllerUpdateStatus {
  static async updateStatus(req, res, next) {
    try {
      const  id  = req.params.movieId;
      const movie = await Movie.findByPk(id);
      if (!movie) {
        throw { name: "MovieNotFound" };
      }
      const status = req.body.status;


      const movieUpdateStatus = await Movie.update(
        {
          status,
        },
        {
          where: { id: id },
          returning: true,
        }
      );
      
      const patchmovie = movieUpdateStatus[1][0];
      console.log(patchmovie, "Admin yng sudah update status");

      if (patchmovie) {
        await History.create({
          name: patchmovie.title,
          movieId: movie.id,
          description: `Movie with Id ${patchmovie.id} has been updated from ${movie.status} into ${patchmovie.status}`,
          authorId: req.user.id,
        });
      }
      res.status(200).json(patchmovie);
    } catch (err) {
      next(err);
    }
  }
}

module.exports = ControllerUpdateStatus;
