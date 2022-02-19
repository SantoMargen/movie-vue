const express = require('express')
const ControllerHistory = require('../controllers/controllerHistory')
const router = express.Router()


router.get('/histories', ControllerHistory.getAllHistory)

module.exports = router