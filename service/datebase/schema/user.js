const mongoose = require('mongoose')
const Schema = mongoose.Schema
let ObjectId = Schema.Types.ObjectId
const bcrypt = require('bcrypt')
const SALT_WORK_FACTOR = 10

// 创建用户Schema
const userSchema = new Schema({
  userId: ObjectId,
  userName: {unique: true, type: String},
  password: String,
  createAt: {type: Date, default: Date.now()},
  lastLoginAt: {type: Date, default: Date.now()}
}, {
  collection: 'user'
})

// 使用pre中间件在用户信息存储前进行密码加密
userSchema.pre('save', function (next) {
  // 进行加密（加盐）
  bcrypt.genSalt(SALT_WORK_FACTOR, (err, salt) => {
    if (err) return next(err)
    bcrypt.hash(this.password, salt, (err, hash) => {
      if (err) return next(err)
      this.password = hash
      next()
    })
  })
})

// 代码声明了一个实例方法，方法叫做comparePassword，然后传递两个参数，一个是客户端密码，一个是数据库取出来的密码。用bcrypt提供的compare方法就可以比对，最后包装成Promise返回就可以了。
userSchema.methods = {
  // 密码对比方法
  comparePassword (_password, password) {
    return new Promise((resolve, reject) => {
      bcrypt.compare(_password, password, (err, isMatch) => {
        if (!err) resolve(isMatch)
        else reject(err)
      })
    })
  }
}
// 发布模型
mongoose.model('User', userSchema)
