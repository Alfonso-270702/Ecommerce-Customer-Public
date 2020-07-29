const { User } = require('../models')
const { verifyToken }  =require('../helpers/jwt')

async function authentication(req,res,next){
    let { token } = req.headers
    try {
        if(!token) throw {msg: 'token not found',status: 400}
        else{
            let decoded = verifyToken(token)
            const user = await User.findOne({
                where:{
                    email: decoded.email,
                    role: decoded.role
                }
            })
            if(!user) throw {msg: 'authentication failed', status: 401 }
            else{
                req.userData = decoded
                next()
            }
        }
    } catch (error) {
        next(error)
    }
}

module.exports = authentication