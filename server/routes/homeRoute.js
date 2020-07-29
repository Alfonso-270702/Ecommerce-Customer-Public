const route = require('express').Router()
const HomeController = require('../controllers/homeController')

route.post('/login',HomeController.login)

module.exports = route