const express = require('express')
const router = express.Router()
const user = require('./user')
const movie = require('./movie')
const genre = require('./genre')
const status = require('./updateStatus')
const history = require('./history')
const customer = require('./customer')
const errorHandler = require('../middlewares/errorhandler')
const authentication = require('../middlewares/authentication')


router.use('/', user)
router.use('/customer', customer)
router.use(authentication)
router.use('/', movie)
router.use('/', genre)
router.use('/', status)
router.use('/', history)


router.use(errorHandler)
module.exports = router

