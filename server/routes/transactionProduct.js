const route = require('express').Router()
const TransactionController = require('../controllers/TransactionController')
const authenticationUser = require('../middleware/authenticationUser')

route.use(authenticationUser)

route.post('/',TransactionController.updateProduct)

module.exports = route