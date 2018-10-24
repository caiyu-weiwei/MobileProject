
const Router = require('koa-router')
let router = new Router()
const mongoose = require('mongoose')
const fs = require('fs')

// 所有的商品信息
router.get('/insertAllGoodsInfo', async (ctx) => {
  fs.readFile('./data_json/newGoods.json', 'utf-8', (err, data) => {
    let newData = JSON.parse(data)
    let saveCount = 0
    const Goods = mongoose.model('Goods')
    console.log('newData', newData)
    newData.map((value, index) => {
      let newGoods = new Goods(value)
      newGoods.save().then(() => {
        saveCount++
        console.log('成功', saveCount)
      }).catch(err => {
        console.log(err)
      })
    })
    console.log(err)
  })
  ctx.body = '开始导入数据'
})

// 所有的商品大类信息
router.get('/insertAllCategory', async (ctx) => {
  fs.readFile('./data_json/category.json', 'utf-8', (err, data) => {
    let newData = JSON.parse(data)
    let saveCount = 0
    const Category = mongoose.model('Category')
    newData.RECORDS.map((val, idx) => {
      let newCategory = new Category(val)
      newCategory.save().then(() => {
        console.log('成功', saveCount)
        saveCount++
      }).catch(err => {
        console.log(err)
      })
    })
    console.log(err)
  })
  ctx.body = '开始导入数据'
})

// 所有的商品子类
router.get('/insertAllCategorySub', async (ctx) => {
  fs.readFile('./data_json/category_sub.json', 'utf-8', (err, data) => {
    let newData = JSON.parse(data)
    let saveCount = 0
    const CategorySub = mongoose.model('CategorySub')
    newData.RECORDS.map((val, idx) => {
      let newCategorySub = new CategorySub(val)
      newCategorySub.save().then(() => {
        console.log('成功插入', saveCount)
        saveCount++
      }).catch(err => {
        console.log('失败插入', err)
      })
    })
    console.log(err)
  })
  ctx.body = '开始导入数据'
})
// 获取商品信息详情接口
// 我们先获得了从前端得到的参数goodsId，然后得到Goods模型，用模型的findOne方法查找数据，查找出来进行返回。
router.post('/getDetailGoodsInfo', async (ctx) => {
  let goodsId = ctx.request.body.goodsId
  const Goods = mongoose.model('Goods')
  await Goods.findOne({ID: goodsId}).exec().then(async (res) => {
    ctx.body = {
      code: 200,
      message: res
    }
  })
    .catch(err => {
      ctx.body = {
        code: 500,
        message: err
      }
    })
})
// 获取大类信息
router.get('/getCategoryList', async (ctx) => {
  const Category = mongoose.model('Category')
  await Category.find().exec().then(async res => {
    ctx.body = {
      code: 200,
      message: res
    }
  })
    .catch(err => {
      ctx.body = {
        code: 500,
        message: err
      }
    })
})

// 获取小类信息
router.post('/getCategorySubList', async (ctx) => {
  let categoryId = ctx.request.body.categoryId
  const CategorySub = mongoose.model('CategorySub')
  await CategorySub.find({MALL_CATEGORY_ID: categoryId}).exec().then(async res => {
    ctx.body = {
      code: 200,
      message: res
    }
  })
    .catch(err => {
      ctx.body = {
        code: 500,
        message: err
      }
    })
})
// 根据商品类别获取商品列表
router.post('/getGoodsListByCategorySubID', async (ctx) => {
  const Goods = mongoose.model('Goods')
  let categorySubId = ctx.request.body.categorySubId
  let page = ctx.request.body.page // 当前页数
  let num = 10 // 每页显示数量
  let start = (page - 1) * num // 开始位置
  await Goods.find({SUB_ID: categorySubId}).skip(start).limit(num).exec().then(async res => {
    ctx.body = {
      code: 200,
      message: res
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
