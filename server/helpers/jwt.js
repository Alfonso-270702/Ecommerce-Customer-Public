const jwt = require('jsonwebtoken')
const secretKey = 'akugtw'

function createToken(payload){
    return jwt.sign(payload, secretKey)
}

function verifyToken(token){
    return jwt.verify(token, secretKey)
}

module.exports = {createToken,verifyToken}