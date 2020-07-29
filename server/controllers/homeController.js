const { User } = require('../models')
const { compare } = require('../helpers/bcrypt')
const { createToken } = require('../helpers/jwt')
class HomeController{
    static register(req,res,next){
        const {email,password} = req.body
        User.create({email,password})
        .then(data =>{
            res.status(201).json({id:data.id,email:data.email})
        })
        .catch(err=>{
            next(err)
        })
    }

    static login(req,res,next){
        const { email,password } = req.body
        User.findOne({
            where:{
                email
            }
        })
        .then(data=>{
            if(! data) throw {msg: 'No user found',status: 400}
            else{
                const hashedPassword = compare(password,data.password)
                if(hashedPassword){
                    const token = createToken({id: data.id,email: data.email,role: data.role})
                    res.status(200).json({msg: `successfully login`,email: data.email,role:data.role,token})
                }
                else{
                    throw {msg: 'email or password are wrong',status: 400}
                }
            }
        })
        .catch(err=>{
            next(err)
        })
    }
}

module.exports = HomeController