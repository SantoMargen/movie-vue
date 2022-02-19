const { History, User } = require("../models");

class ControllerHistory {
  static getAllHistory = async (req, res, next) => {
    try {
      const history = await History.findAll({
        include: [
          {
            model: User,
            attributes: {
              exclude: [
                "updatedAt",
                "id",
                "username",
                "password",
                "role",
                "phoneNumber",
                "address",
                "createdAt",
              ],
            },
          },
        ],
        attributes: {
          exclude: ["updatedAt"],
        },
        order: [["createdAt", "DESC"]],
      });

      res.status(200).json(history);
    } catch (err) {
      next(err);
    }
  };
}

module.exports = ControllerHistory;
