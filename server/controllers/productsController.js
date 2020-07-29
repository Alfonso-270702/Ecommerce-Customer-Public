const { Product } = require('../models')

class ProductController{
    static create(req,res,next){
        const {name,image_url,price,stock} = req.body
        Product.create({name,image_url,price,stock})
        .then(data=>{
            res.status(201).json(data)
        })
        .catch(err=>{
            next(err)
        })
    }
    static list(req,res,next){
        Product.findAll()
        .then(data=>{
            res.status(200).json(data)
        })
        .catch(err=>{
            next(err)
        })
    }
    static editOne(req,res,next){
        const {id} = req.params
        const {name,image_url,price,stock} = req.body
        Product.update({name,image_url,price,stock},{where:{id}})
        .then(data=>{
            if(! data) throw {msg: 'ERROR! Not Found',status: 404}
            else res.status(200).json({msg: 'success edit product'})
            
        })
        .catch(err=>{
            next(err)
        })
    }
    static deleteOne(req,res,next){
        Product.destroy({
            where:{
                id: req.params.id
            }
        })
        .then(_=>{
            res.status(200).json({msg: 'success delete'})
        })
        .catch(err=>{
            next(err)
        })
    }
}

module.exports = ProductController