const bcrypt = require('bcryptjs')

const createPassword = (payload) => bcrypt.hashSync(payload,8)
const comparePassword = (password,hash) => bcrypt.compareSync(password,hash)

module.exports={createPassword,comparePassword}