const User = require('./model')
async function findAll() {
  return User.findAll()
}
module.exports = {
  findAll
}
