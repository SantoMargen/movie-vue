const express = require("express");
const ControllerCustomer = require("../controllers/constrollerCustomer");
const authenticationCustomer = require("../middlewares/authenticationCustomer");
const {
  authorizationCustomer,
  authorizationDeleteDetail,
} = require("../middlewares/authorizationCustomer");
const router = express.Router();

router.post("/register", ControllerCustomer.registerCustomer);
router.post("/login", ControllerCustomer.loginCustomer);
router.post("/google-login", ControllerCustomer.googleLogin);
router.get("/movies", ControllerCustomer.getAllMovies);
router.get("/movies/:movieId", ControllerCustomer.detailMovie);
router.post(
  "/bookmarks/:movieId",
  authenticationCustomer,
  authorizationCustomer,
  ControllerCustomer.addToBookmark
);
router.get(
  "/bookmarks",
  authenticationCustomer,
  authorizationCustomer,
  ControllerCustomer.getAllBookmark
);
router.get(
  "/bookmarks/:bookmarkId",
  authenticationCustomer,
  authorizationCustomer,
  authorizationDeleteDetail,
  ControllerCustomer.detailBookmark
);
router.delete(
  "/bookmarks/:bookmarkId",
  authenticationCustomer,
  authorizationCustomer,
  authorizationDeleteDetail,
  ControllerCustomer.deleteBookmark
);

module.exports = router;
