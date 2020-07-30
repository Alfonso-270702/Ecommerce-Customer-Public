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

        Product.findOne({where:{ id }})
          .then(data => {
              if(data === null) {
                throw { msg: 'Product not Found', status: 400}
              }
              else {
                if(data.stock <= 0) {
                   throw {msg: 'Stock empty, wait for admin to restock', status: 400} 
                }
                else{
                    return UserProduct.findAll({where:{productId: id, status: false}})
                }
              }
          })
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
            },include:{model:Product},order: [['id', 'ASC']]
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
                productId: id,
                status: false
            },include:{model:Product},order: [['id', 'ASC']]
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
                productId: id,
                status: false
            },include:{model:Product}
        })
        .then(data =>{
            res.status(200).json({msg: 'Successfully delete product from cart'})
        })
        .catch(err =>{
            next(err)
        })
    }
    static async plusButton(req,res,next){
        let { id } = req.params
        let userId  = req.userData.id
        let dataUser = await UserProduct.findOne({where: {userId, productId: id}})
        try {
            if(dataUser){
                let updatedQuantity = dataUser.quantity + 1
                let dataProduct = await Product.findOne({where:{id}})
                // console.log(dataProduct)
                if (dataProduct.stock < updatedQuantity){
                    throw {msg:'Stock is not enough', status: 400}
                }
                else{
                    await UserProduct.update({quantity: updatedQuantity},{where:{userId,productId: id}})
                    let showUpdatedCart = await UserProduct.findOne({where:{userId, productId: id}})
                    res.status(200).json(showUpdatedCart)
                }
            }
            else{
                throw {msg: 'Product Not Found, Please recheck your product', status: 400}
            }
        } catch (error) {
            next(error)
        }
    }
    static async minusButton(req,res,next){
        let { id } = req.params
        let userId  = req.userData.id
        UserProduct.findOne({where: {userId, productId: id}})
        .then(data => {
            if (data) {
                let updatedQuantity = ((data.quantity - 1 ) <= 0 ) ? 1 : (data.quantity - 1)
                console.log(updatedQuantity)
                return UserProduct.update({quantity: updatedQuantity},{where:{userId,productId:id}})
            }
            else {
                throw {msg: 'Product Not Found, Please recheck your product', status: 400}
            }
        })
        .then(data => {
            return UserProduct.findOne({ where: { userId, productId: id } })
        })
        .then(data =>{
            res.status(200).json(data)
        })
        .catch(err => {
            next(err)
        })
    }
}

module.exports = UserProductController