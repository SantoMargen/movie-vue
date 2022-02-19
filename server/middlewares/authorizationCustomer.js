const { Bookmark } = require("../models");

const authorizationCustomer = async (req, res, next) => {
  try {
    const { role } = req.user;
    if (role !== "Customer") {
      throw { name: "NoPermission" };
    }
    next();
  } catch (err) {
    next(err);
  }
};

const authorizationDeleteDetail = async (req, res, next) => {
  try {
    const { role, id: customerId } = req.user;
    const bookmarkId = Number(req.params.bookmarkId);
    if (!bookmarkId) {
      throw { name: "BookmarkNotFound" };
    }
    const fondBookmark = await Bookmark.findOne({
      where: {
        id: bookmarkId,
      },
    });
    if (!fondBookmark) {
      throw { name: "NoFoundInData" };
    }

    if (role !== "Customer") {
      throw { name: "NoPermission" };
    } else if (fondBookmark.customerId !== customerId) {
      throw { name: "NotYour's" };
    }
    next();
  } catch (err) {
    next(err);
  }
};

module.exports = {
  authorizationCustomer,
  authorizationDeleteDetail,
};
