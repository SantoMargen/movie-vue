const express = require('express')
const router = express.Router()
const ControllerUpdateStatus = require('../controllers/controllerUpdateStatus')
const authorizationPatch = require('../middlewares/authorizationStatus')

router.patch('/movies/status/:movieId', authorizationPatch, ControllerUpdateStatus.updateStatus)


module.exports = router