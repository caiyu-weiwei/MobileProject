const Router = require('koa-router')
// 引入mongose,这样就可以操作我们的Schema了
const mongoose = require('mongoose')
let router = new Router()

router.get('/', async (ctx) => {
  ctx.body = '这是用户操作首页'
})
// 注册api
router.post('/register', async (ctx) => {
  // 取得Model
  const User = mongoose.model('User')
  // 把从前端接收的POST数据封装成一个新的user对象
  let newUser = new User(ctx.request.body)
  // 用mongoose的save方法直接存储，然后判断是否成功，返回相应的结果
  await newUser.save().then(() => {
    // 成功返回200，并返回成功信息
    ctx.body = {
      code: 200,
      message: '注册成功'
    }
  }).catch((err) => {
    ctx.body = {
      code: 500,
      message: err
    }
  })
})
// 登录api
router.post('/login', async (ctx) => {
  // 得到前端传递过来的数据
  let userLogin = ctx.request.body
  console.log(userLogin)
  let { userName, password } = userLogin
  // 引进mongoose 中model
  const User = mongoose.model('User')
  // 查找用户是否存在，如何存在开始密码比对
  await User.findOne({userName: userName}).exec().then(async res => {
    if (res) {
      // 当用户名存在开始密码比对
      let newUser = new User()
      await newUser.comparePassword(password, res.password).then(isMatch => {
        // 返回比对结果
        ctx.body = {
          code: 200,
          message: isMatch
        }
      })
        .catch(err => {
          // 出现异常
          ctx.body = {
            code: 500,
            message: err
          }
        })
    } else {
      ctx.body = {
        code: 200,
        message: '用户名不存在'
      }
    }
  })
    .catch(err => {
      ctx.body = {
        code: 500,
        message: err
      }
    })
})
module.exports = router
