const route = require('express').Router()
const userProductController = require('../controllers/userProduct')
const authenticationUser = require('../middleware/authenticationUser')
const authorizationUser = require('../middleware/authorizationUser')

route.get('/',userProductController.list)

route.use(authenticationUser)

route.post('/detail/:id',userProductController.addToCart)
route.get('/detail',userProductController.findAllCart)
route.put('/plus/:id',userProductController.plusButton)
route.put('/minus/:id',userProductController.minusButton)
route.put('/detail/:id',authorizationUser,userProductController.editCart)
route.delete('/detail/:id',authorizationUser,userProductController.deleteCart)


module.exports = route