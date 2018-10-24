// 使用node的fs模块，可以轻松把文件读取到程序中，然后进行便利，把有用的数据提取出来，写入到一个新的数组中
const fs = require('fs')
fs.readFile('./data_json/goods.json', 'utf-8', (err, data) => {
  console.log(data)
  console.log(err)
  let newData = JSON.parse(data)
  let newPush = []
  let i = 0
  newData.RECORDS.map((value, index) => {
    if (value.IMAGE1 != null) {
      i++
      newPush.push(value.NAME)
    }
  })
  console.log(i)
  fs.writeFile('./data_json/newGoods.json', JSON.stringify(newPush), (err) => {
    if (err) console.log('写文件操作失败')
    else console.log('写文件操作成功')
  })
})
