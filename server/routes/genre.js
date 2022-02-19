const express = require('express')
const router = express.Router()
const ControllerGenre = require('../controllers/controllerGenre')

router.get('/genres', ControllerGenre.getAllGenre)

module.exports = router