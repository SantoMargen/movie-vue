const { verifyToken } = require("../helpers/jwt");
const { Customer } = require("../models");

const authenticationCustomer = async (req, res, next) => {
  try {
    const { access_token } = req.headers;
    const payload = verifyToken(access_token);

    const findCustomer = await Customer.findOne({
      where: {
        id: payload.id,
        email: payload.email,
      },
    });
    if (!findCustomer) {
      throw { name: "Authentication" };
    }
    req.user = {
      id: findCustomer.id,
      email: findCustomer.email,
      role: findCustomer.role,
    };
    next();
  } catch (err) {
    next(err);
  }
};

module.exports = authenticationCustomer;
