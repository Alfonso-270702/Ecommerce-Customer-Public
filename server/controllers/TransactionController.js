const { UserProduct, Product } = require('../models')

class TransactionController {
    static async updateProduct(req,res,next){
        try {
            let userProduct = await UserProduct.findAll({
                where: {
                    userId: req.userData.id,
                    status: false
                }
            })
            console.log(userProduct)
            for (let i = 0; i < userProduct.length; i++) {
                let userCheckOut = userProduct[i]
                let findProduct = await Product.findOne({
                    where:{
                        id: userCheckOut.productId
                    }, order: [['id', 'asc']]
                })
                // console.log(findProduct)
                let updatedStock = findProduct.stock - userCheckOut.quantity
                await Product.update({stock: updatedStock}, {where:{id: findProduct.id}})
                await UserProduct.update({status: true}, {where:{userId: req.userData.id, productId: findProduct.id}})
            }
            const listProduct = await Product.findAll()
            res.status(200).json(listProduct)
        } catch (error) {
           next(error) 
        }
    }
}

module.exports = TransactionController