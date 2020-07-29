const route = require('express').Router()
const homeRoute = require('./homeRoute')
const homeRouteUser = require('./homeRouteUser')
const productsRoute = require('./productsRoute')
const userProductsRoute = require('./userProductsRoute')
const transactionProduct = require('./transactionProduct')

route.use('/',homeRoute)

route.use('/user',homeRouteUser)

route.use('/products',productsRoute)

route.use('/shops',userProductsRoute)

route.use('/payment',transactionProduct)

module.exports = route