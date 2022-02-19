const express = require("express");
const router = express.Router();
const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const ControllerMovie = require("../controllers/controllerMovie");
const authorization = require("../middlewares/authorization");
const uploadImageKit = require("../middlewares/imagekitApi");

router.post(
  "/movies",
  upload.single("imgUrl"),
  uploadImageKit,
  ControllerMovie.addMovie
);
router.get("/movies", ControllerMovie.getAllMovies);
router.get("/movies/:id", authorization, ControllerMovie.getMoviesById);
router.put(
  "/movies/:id",
  authorization,
  upload.single("imgUrl"),
  uploadImageKit,
  ControllerMovie.editMovie
);
router.delete("/movies/:id", authorization, ControllerMovie.deleteMovie);

module.exports = router;
