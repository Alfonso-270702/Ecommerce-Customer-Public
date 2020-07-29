const { UserProduct } = require('../models')

function authorization(req,res,next){
    let { id } = req.params
    UserProduct.findOne({
        where: {
            productId: id
        }
    })
    .then(data=>{
        if(!data) throw {msg: 'Product not found',status: 400}
        else if(data.userId === req.userData.id) next()
        else throw {msg: 'you are not authorize to do this action',status: 403}
    })
    .catch(err=>{
        next(err)
    })
}

module.exports = authorization