const route = require('express').Router()
const HomeController = require('../controllers/homeController')

route.post('/login',HomeController.login)
route.post('/register',HomeController.register)

module.exports = route