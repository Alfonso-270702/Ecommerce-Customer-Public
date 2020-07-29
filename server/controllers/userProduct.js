const { UserProduct, Product } = require('../models')
const convertRupiah = require('../helpers/rupiah')
const totalPriceCart = require('../helpers/totalPrice')
class UserProductController{
    static list(req,res,next){
        Product.findAll()
        .then(data=>{
            res.status(200).json(data)
        })
        .catch(err =>{
            next(err)
        })
    }
    static addToCart(req,res,next){
        const { id } = req.params
        UserProduct.findAll({
            where:{
                productId: id
            }
        },)
        .then(data=>{
            if(data.length === 0){
                return UserProduct.create({
                    productId: id,
                    userId: req.userData.id,
                    quantity: 1
                })
            }
            else if(data[0].length !== 0){
                return UserProduct.update({ quantity: data[0].quantity+1},{
                    where: {
                        productId: id
                    }
                })
            }
        })
        .then(data => {
            res.status(201).json(data)
        })
        .catch(err =>{
            next(err)
        })
    }
    static findAllCart(req,res,next){
        UserProduct.findAll({
            where:{
                userId: req.userData.id,
                status: false
            },include:{model:Product}
        })
        .then(data =>{
            let payment = convertRupiah(totalPriceCart(data))
            res.status(200).json({data, payment})
        })
        .catch(err=>{
            next(err)
        })
    }
    static editCart(req,res,next){
        const { id } = req.params
        const { quantity } = req.body
        UserProduct.update({quantity}, {
            where:{
                productId: id
            },include:{model:Product}
        })
        .then(data =>{
            res.status(200).json({msg: 'Success edit item'})
        })
        .catch(err=>{
            next(err)
        })
    }
    static deleteCart(req,res,next){
        const { id } = req.params
        UserProduct.destroy({
            where:{
                productId: id
            },include:{model:Product}
        })
        .then(data =>{
            res.status(200).json({msg: 'Successfully delete product from cart'})
        })
        .catch(err =>{
            next(err)
        })
    }
}

module.exports = UserProductController