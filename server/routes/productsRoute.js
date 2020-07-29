const route = require('express').Router()
const ProductController = require('../controllers/productsController')
const authentication = require('../middleware/authentication')
const authorization = require('../middleware/authorization')

route.use(authentication)

route.post('/',ProductController.create)
route.get('/',ProductController.list)
route.put('/:id',authorization,ProductController.editOne)
route.delete('/:id',authorization,ProductController.deleteOne)

module.exports = route