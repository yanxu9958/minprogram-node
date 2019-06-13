let Sequelize = require('sequelize')
// 连接数据库
let sequelize = new Sequelize('BMI', 'root', 'password', {
  host: 'localhost',
  dialect: 'mysql'
})

sequelize
  .authenticate() //连接测试
  .then(() => {
    console.log('mysql is Success')
  })
  .catch(err => {
    console.log(err)
  })
const User = sequelize.define(
  'pet',
  {
    id: {
      type: Sequelize.STRING(100),
      primaryKey: true,
      autoIncrement: true
    },
    name: Sequelize.STRING(100),
    gender: Sequelize.STRING(100),
    birth: Sequelize.STRING(100),
    createdAt: Sequelize.BIGINT,
    updatedAt: Sequelize.BIGINT,
    version: Sequelize.BIGINT
  },
  { timestamps: false }
)
module.exports = User
