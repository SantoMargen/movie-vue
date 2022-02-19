const { User } = require("../models");
const { verifyToken } = require("../helpers/jwt");

const authentication = async (req, res, next) => {
  try {
    const { access_token } = req.headers;
    if (!access_token) {
      throw { name: "Unauthenticated" };
    }
    const payload = verifyToken(access_token);
    const foundUser = await User.findOne({
      where: { id: payload.id, email: payload.email },
    });
    if (!foundUser) {
      throw { name: "Authentication" };
    }
    req.user = {
      id: foundUser.id,
      email: foundUser.email,
      role: foundUser.role,
      username: foundUser.username,
    };
    next();
  } catch (err) {
    next(err);
  }
};

module.exports = authentication;
