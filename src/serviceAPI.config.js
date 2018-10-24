const BASEURL = 'https://www.easy-mock.com/mock/5ba3607063cecc77087e2ecb/MobileProject/'
const LOCALURL = 'http://localhost:3000/'
const URL = {
  shoppingMallUrl: BASEURL + 'index',
  registerUser: LOCALURL + 'user/register', // 注册用户接口
  loginUser: LOCALURL + 'user/login', // 登录用户接口
  goodsInfoDetail: LOCALURL + 'goods/getDetailGoodsInfo', // 获取商品详情接口
  getCategoryList: LOCALURL + 'goods/getCategoryList', // 得到大类信息
  getCategorySubList: LOCALURL + 'goods/getCategorySubList', // 得到小类信息
  getGoodsListByCategorySubID: LOCALURL + 'goods/getGoodsListByCategorySubID' // 得到小类信息

}
module.exports = URL
