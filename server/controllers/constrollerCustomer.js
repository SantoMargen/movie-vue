const { Customer, Movie, Genre, User, Bookmark } = require('../models');
const { OAuth2Client } = require('google-auth-library');
const { comparePassword } = require('../helpers/bcrypt');
const { createToken } = require('../helpers/jwt');
const { Op } = require('sequelize');
const { getPagination, pagingData } = require('../helpers/pagination');

class ControllerCustomer {
  static async registerCustomer(req, res, next) {
    try {
      const { username, email, password, phoneNumber, address } = req.body;
      const payload = {
        username,
        email,
        password,
        role: 'Customer',
        phoneNumber,
        address,
      };
      const user = await Customer.create(payload);
      res
        .status(201)
        .json({ id: user.id, email: user.email, username: user.username });
    } catch (err) {
      next(err);
    }
  }

  static async loginCustomer(req, res, next) {
    try {
      const { email, password } = req.body;
      if (!email) {
        throw { name: 'UserNotFound' };
      }
      if (!password) {
        throw { name: 'UserNotFound' };
      }
      const foundUser = await Customer.findOne({
        where: {
          email: email || null,
        },
      });

      const payload = {
        id: foundUser.id,
        email: foundUser.email,
        role: foundUser.role,
      };
      const token = createToken(payload);
      res.status(200).json({ access_token: token, role: payload.role });
    } catch (err) {
      next(err);
    }
  }

  static async googleLogin(req, res, next) {
    try {
      const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID_CUSTOMER);
      const { id_token } = req.body;
      console.log(id_token);

      const ticket = await client.verifyIdToken({
        idToken: id_token,
        audience: process.env.GOOGLE_CLIENT_ID_CUSTOMER,
      });
      const payload = ticket.getPayload();
      const emailGoogle = payload.email;
      const nameGoogle = payload.name;
      const password = 'password'.toString(64) + '!@152';

      const [user, created] = await Customer.findOrCreate({
        where: { email: emailGoogle },
        defaults: {
          username: nameGoogle,
          email: emailGoogle,
          password: password + '!@aman152',
          role: 'Customer',
          phoneNumber: '08765456543',
          address: 'Jakarta',
        },
      });

      const tokenPayload = {
        id: user.id,
        email: user.email,
        role: user.role,
        username: user.username,
      };

      const token = createToken(tokenPayload);
      if (created) {
        res.status(201).json({
          access_token: token,
          id: user.id,
          role: user.role,
          username: user.username,
        });
      } else {
        res.status(200).json({
          access_token: token,
          id: user.id,
          role: user.role,
          username: user.username,
        });
      }
    } catch (err) {
      next(err);
    }
  }

  static async getAllMovies(req, res, next) {
    try {
      const { page, size, rating, title } = req.query;
      const { limit, offset } = getPagination(page, size);
      let option = {
        where: {
          status: 'active',
        },
        include: [
          {
            model: Genre,
            attributes: { exclude: ['id', 'createdAt', 'updatedAt'] },
          },
          {
            model: User,
            attributes: {
              exclude: [
                'createdAt',
                'updatedAt',
                'id',
                'password',
                'address',
                'role',
                'phoneNumber',
                'email',
              ],
            },
          },
        ],
        limit,
        offset,
      };
      if (rating) {
        option.where['rating'] = {
          [Op.eq]: Number(rating),
        };
      }
      if (title) {
        option.where['title'] = {
          [Op.iLike]: `%${title}%`,
        };
      }

      const movieActive = await Movie.findAndCountAll(option);
      const activeMovieDataPagination = pagingData(movieActive, page, limit);
      if (activeMovieDataPagination.totalItems === 0) {
        throw { name: 'ActiveMovieNotFound' };
      }
      res.status(200).json(activeMovieDataPagination);
    } catch (err) {
      // console.log(err);
      next(err);
    }
  }

  static async detailMovie(req, res, next) {
    try {
      const movieId = Number(req.params.movieId);
      if (!movieId) {
        throw { name: 'MovieNotFound' };
      }
      const foundMovie = await Movie.findOne({
        where: { id: movieId },
        attributes: {
          exclude: ['createdAt', 'updatedAt'],
        },
        include: [
          {
            model: Genre,
            attributes: { exclude: ['id', 'createdAt', 'updatedAt'] },
          },
          {
            model: User,
            attributes: {
              exclude: [
                'createdAt',
                'updatedAt',
                'id',
                'password',
                'address',
                'role',
                'phoneNumber',
                'email',
              ],
            },
          },
        ],
      });
      if (!foundMovie) {
        throw { name: 'MovieNotFound' };
      }
      res.status(200).json(foundMovie);
    } catch (err) {
      console.log(err);
      next(err);
    }
  }

  static async addToBookmark(req, res, next) {
    try {
      const { id: customerId } = req.user;
      const movieId = Number(req.params.movieId);
      if (!movieId) {
        throw { name: 'MovieNotFound' };
      }

      const findMovie = await Movie.findOne({
        where: {
          id: movieId,
        },
        attributes: { exclude: ['createdAt', 'updatedAt'] },
      });
      if (!findMovie) {
        throw { name: 'MovieNotFound' };
      }

      if (movieId) {
        await Bookmark.create({
          customerId,
          movieId,
        });
      }
      res.status(201).json(findMovie);
    } catch (err) {
      next(err);
    }
  }

  static async getAllBookmark(req, res, next) {
    try {
      const { id } = req.user;
      const bookmarks = await Bookmark.findAll({
        attributes: { exclude: ['createdAt', 'updatedAt'] },
        where: {
          customerId: id,
        },
        include: [
          {
            model: Movie,
            attributes: { exclude: ['id', 'createdAt', 'updatedAt'] },
            include: [
              {
                model: User,
                attributes: {
                  exclude: [
                    'id',
                    'createdAt',
                    'updatedAt',
                    'email',
                    'password',
                    'role',
                    'phoneNumber',
                    'address',
                  ],
                },
              },
              {
                model: Genre,
                attributes: {
                  exclude: ['createdAt', 'updatedAt', 'id'],
                },
              },
            ],
          },
        ],
      });
      res.status(200).json(bookmarks);
    } catch (err) {
      console.log(err);
      next(err);
    }
  }
  static async detailBookmark(req, res, next) {
    try {
      const id = Number(req.params.bookmarkId);
      if (!id) {
        throw { name: 'BookmarkNotFound' };
      }
      const bookmarkDetail = await Bookmark.findOne({
        attributes: { exclude: ['createdAt', 'updatedAt'] },
        where: { id },
        include: [
          {
            model: Movie,
            attributes: { exclude: ['id', 'createdAt', 'updatedAt'] },
            include: [
              {
                model: User,
                attributes: {
                  exclude: [
                    'id',
                    'createdAt',
                    'updatedAt',
                    'email',
                    'password',
                    'role',
                    'phoneNumber',
                    'address',
                  ],
                },
              },
              {
                model: Genre,
                attributes: {
                  exclude: ['createdAt', 'updatedAt', 'id'],
                },
              },
            ],
          },
        ],
      });
      if (!bookmarkDetail) {
        throw { name: 'BookmarkNotFound' };
      }
      res.status(200).json(bookmarkDetail);
    } catch (err) {
      next(err);
    }
  }

  static async deleteBookmark(req, res, next) {
    try {
      const bookmarkId = Number(req.params.bookmarkId);
      if (!bookmarkId) {
        throw { name: 'BookmarkNotFound' };
      }
      await Bookmark.destroy({
        where: {
          id: bookmarkId,
        },
      });
      res.status(200).json({
        message: "You'r bookmark has been remove",
      });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = ControllerCustomer;
