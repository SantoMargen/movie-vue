const { User } = require("../models");
const { OAuth2Client } = require("google-auth-library");
const { comparePassword } = require("../helpers/bcrypt");
const { createToken } = require("../helpers/jwt");

class ControllerUser {
  static async register(req, res, next) {
    try {
      const { username, email, password, phoneNumber, address } = req.body;
      const payload = {
        username,
        email,
        password,
        role: "Admin",
        phoneNumber,
        address,
      };
      const user = await User.create(payload);
      res
        .status(201)
        .json({ id: user.id, email: user.email, username: user.username });
    } catch (err) {
      next(err);
    }
  }
  static async login(req, res, next) {
    try {
      const { email, password } = req.body;
      const response = await User.findOne({ where: { email: email || null } });

      if (!response || !comparePassword(password, response.password)) {
        throw { name: "UserNotFound" };
      }
      const payload = {
        id: response.id,
        email: response.email,
        role: response.role,
        username: response.username,
      };
      const token = createToken(payload);
      res.status(200).json({
        access_token: token,
        role: payload.role,
        username: payload.username,
      });
    } catch (err) {
      next(err);
    }
  }
  static async loginGoogle(req, res, next) {
    try {
      const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
      const { id_token } = req.body;

      const ticket = await client.verifyIdToken({
        idToken: id_token,
        audience: process.env.GOOGLE_CLIENT_ID,
      });
      const payload = ticket.getPayload();
      const emailGoogle = payload.email;
      const nameGoogle = payload.name;
      const password = "password".toString(64) + "!@152";
  

      const [user, created] = await User.findOrCreate({
        where: { email: emailGoogle },
        defaults: {
          username: nameGoogle,
          email: emailGoogle,
          password: password + "!@152",
          role: "Staff",
          phoneNumber: "08765456543",
          address: "Jakarta",
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
}
module.exports = ControllerUser;
