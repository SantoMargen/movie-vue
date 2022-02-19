const express = require("express");
const router = express.Router();
const ControllerUser = require("../controllers/controllerUser");

router.post("/register", ControllerUser.register);
router.post("/login", ControllerUser.login);
router.post("/login/google", ControllerUser.loginGoogle);

module.exports = router;
