const jwt = require('jsonwebtoken')
const secret = process.env.token_secret

const createToken = (payload) => jwt.sign(payload,secret)
const compareToken = (token) => jwt.verify(token,secret)

module.exports={createToken,compareToken}