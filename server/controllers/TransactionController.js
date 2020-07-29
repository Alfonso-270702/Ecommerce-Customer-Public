const { UserProduct, Product } = require('../models')
const removeProduct = require('../helpers/removeProduct')

class TransactionController {
    static async updateProduct(req,res,next){
        try {
            const userProduct = await UserProduct.findAll({
                where: {
                    userId: req.userData.id,
                    status: false
                }
            })
            for (let i = 0; i < userProduct.length; i++) {
                let userCheckOut = userProduct[i]
                // let findProduct = 100
                const findProduct = await Product.findOne({
                    where:{
                        id: userCheckOut.productId
                    }
                })
                console.log(userCheckOut)
                let updatedStock = findProduct.stock - userCheckOut.quantity
                await Product.update({
                    stock: updatedStock
                }, {where:{
                    id: findProduct.id
                }})
                await UserProduct.update({status: true}, {where:{userId: req.userData.id, productId: findProduct.id}})
            }
            const listProduct = await Product.findAll()
            res.send(listProduct)
        } catch (error) {
           next(error) 
        }
    }
}

module.exports = TransactionController