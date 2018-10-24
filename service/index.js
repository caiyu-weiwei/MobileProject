const Koa = require('koa')
const app = new Koa()
const { connect, initSchemas } = require('./datebase/init.js')
const Router = require('koa-router')
const bodyParser = require('koa-bodyparser')
const cors = require('koa2-cors')
let user = require('./appApi/User.js')
let goods = require('./appApi/goods.js')

// 我们要接到前端发过来的请求，这时候需要安装koa-bodyparser中间件
app.use(bodyParser())

// 在koa2里解决跨域的中间件叫koa2-cors
app.use(cors())

// 装载所有子路由
let router = new Router()
router.use('/user', user.routes())
router.use('/goods', goods.routes())

// 加载路由中间件
app.use(router.routes())
app.use(router.allowedMethods())

// 立即执行函数
;(async () => {
  await connect()
  initSchemas()
})()

app.listen(3000, () => {
  console.log('port listen 3000')
})
