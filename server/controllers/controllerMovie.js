const { Movie, Genre, User, History } = require("../models");
class ControllerMovie {
  static async addMovie(req, res, next) {
    try {
      const { title, synopsis, trailerUrl, rating, imgUrl, genreId } = req.body;
      const { id } = req.user;

      const payload = {
        title,
        synopsis,
        trailerUrl,
        imgUrl,
        rating: +rating,
        genreId: +genreId,
        authorId: +id,
      };

      const newMovie = await Movie.create(payload);

      if (newMovie) {
        await History.create({
          name: newMovie.title,
          description: `New movie with Id ${newMovie.id} has been created `,
          movieId: newMovie.id,
          authorId: req.user.id
        });
      }
      res.status(201).json(newMovie);
    } catch (err) {
      console.log(err);
      next(err);
    }
  }
  static async getAllMovies(req, res, next) {
    try {
      const allMovies = await Movie.findAll({
        attributes: {
          exclude: ["createdAt", "updatedAt", "authorId", "genreId"],
        },
        include: [
          {
            model: Genre,
            attributes: { exclude: ["id", "createdAt", "updatedAt"] },
          },
          {
            model: User,
            attributes: {
              exclude: [
                "createdAt",
                "updatedAt",
                "id",
                "password",
                "address",
                "role",
                "phoneNumber",
                "email",
              ],
            },
          },
        ],
      });
      res.status(200).json(allMovies);
    } catch (err) {
      next(err);
    }
  }
  static async getMoviesById(req, res, next) {
    try {
      const id = req.params.id;
 
      const result = await Movie.findByPk(id, {
        attributes: { exclude: ["createdAt", "updatedAt"] },
        include: [{
          model: Genre,
          attributes: { exclude: ["createdAt", "updatedAt"] }
        }]
      });
      if (!result) {
        throw { name: "NotFound" };
      }
      res.status(200).json(result);
    } catch (err) {
      next(err);
    }
  }
  static async editMovie(req, res, next) {
    try {
      const id = req.params.id

      const { title, synopsis, trailerUrl, imgUrl, rating, genreId } = req.body;
      const userId = req.user.id;
      const movie = await Movie.findByPk(id);
      if (!movie) {
        throw { name: "MovieNotFound" };
      }

      if (
        !title ||
        !synopsis ||
        !trailerUrl ||
        !imgUrl ||
        !rating ||
        !genreId
      ) {
        throw { name: "Empty" };
      }
      const payload = {
        title,
        synopsis,
        trailerUrl,
        imgUrl,
        rating,
        genreId,
        authorId: +userId,
      };
      const updateMovie = await Movie.update(payload, {
        where: { id },
        returning: true,
      });

      const updatedMovie = updateMovie[1][0];

      if (updatedMovie) {
        await History.create({
          name: updatedMovie.title,
          description: `New movie with Id ${updatedMovie.id} updated `,
          movieId: updatedMovie.id,
          authorId: req.user.id
        });
      }

      res.status(200).json(updateMovie[1][0]);
    } catch (err) {
      console.log(err);
      next(err);
    }
  }
  static async deleteMovie(req, res, next) {
    try {
      const id = req.params.id;
      const movie = await Movie.findByPk(id);

      if (!movie) {
        throw { name: "MovieNotFound" };
      }
      await Movie.destroy({ where: { id } });

      res
        .status(200)
        .json({ message: `movie ${movie.title} success to delete` });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = ControllerMovie;
