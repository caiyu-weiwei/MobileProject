<template>
  <div>
    <div class="goods-detail">
      <van-nav-bar
        title="商品详情"
      />
    </div>
    <div class="top-image">
      <img :src="goodsInfo.IMAGE1">
    </div>
    <div class="goods-name">{{goodsInfo.NAME}}</div>
    <div class="goods-price">价格：￥{{goodsInfo.PRESENT_PRICE | moneyFilter}}元</div>
    <div class="goods-tabs">
      <van-tabs swipeable sticky>
        <van-tab title="商品详情" v-html="goodsInfo.DETAIL"></van-tab>
        <van-tab title="评价">正在制作</van-tab>
      </van-tabs>
    </div>
    <div class="goods-cart">
      <div>
        <van-button size="large" type="primary" @click="handleAddGoodsToCart">加入购物车</van-button>
      </div>
      <div>
        <van-button size="large" type="danger">直接购买</van-button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import url from '@/serviceAPI.config.js'
import { toMoney } from '@/filter/moneyFilter'
export default {
  data () {
    return {
      goodsId: '',
      goodsInfo: {}
    }
  },
  created () {
    this.goodsId = this.$route.query.goodsId ? this.$route.query.goodsId : this.$route.query.detailId
    this.$nextTick(() => {
      this.getGoodsDetail()
    })
  },
  methods: {
    handleClickLeft () {
      this.$router.go(-1)
    },
    // 获取商品详情
    getGoodsDetail () {
      axios({
        url: url.goodsInfoDetail,
        method: 'post',
        data: {goodsId: this.goodsId}
      })
        .then(res => {
          console.log(res)
          if (res.data.code === 200 && res.data.message) {
            this.goodsInfo = res.data.message
          } else {
            this.$toast('服务器错误，数据获取失败')
          }
        })
        .catch(err => {
          this.$toast(err)
        })
    },
    // 添加购物车
    handleAddGoodsToCart () {
      let cartInfo = localStorage.cartInfo ? JSON.parse(localStorage.cartInfo) : []
      let isHaveGoods = cartInfo.filter(cart => cart.goodsId === this.goodsId)
      console.log('isHaveGoods', isHaveGoods)
      if (!isHaveGoods.length) {
        let newGoodsInfo = {
          goodsId: this.goodsInfo.ID,
          Name: this.goodsInfo.NAME,
          price: this.goodsInfo.PRESENT_PRICE,
          image: this.goodsInfo.IMAGE1,
          count: 1
        }
        cartInfo.push(newGoodsInfo)
        // 操作本地数据
        localStorage.cartInfo = JSON.stringify(cartInfo)
        this.$toast.success('添加成功')
      } else {
        this.$toast.success('已有此商品')
      }
      setTimeout(() => {
        this.$router.push({
          name: 'Cart',
          query: {}
        })
      }, 1000)
    }
  },
  filters: {
    moneyFilter (money) {
      return toMoney(money)
    }
  }
}
</script>

<style scoped>
.top-image img{
  width: 100%;
}
.goods-name{
  background-color: #fff;
}
.goods-price{
  background-color: #fff;
}
.goods-tabs{
  margin-bottom: 4rem;
}
.goods-cart{
  position: fixed;
  bottom:0px;
  left:0px;
  background-color: #FFF;
  width:100%;
  display: flex;
  flex-direction: row;
  flex-flow: nowrap;
}
.goods-cart > div{
  flex:1;
  padding:5px;
}
</style>
