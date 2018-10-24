<template>
  <div>
    <div class="cart-navbar">
      <van-nav-bar
        title="购物车"
        fixed
      />
    </div>
    <div class="cart-title">
      <van-button type="danger" size="small" @click="handleClearCart">清空购物车</van-button>
    </div>
    <div id="cart-detail">
      <!-- 显示购物车中的商品 -->
      <div class="cart-list">
        <div class="cart-row" v-for="(item, index) in cartInfo" :key="index">
          <div class="cart-img">
            <img :src="item.image" :onerror="errorImg" width="100%">
          </div>
          <div class="cart-text">
            <div class="goods-name">{{ item.Name }}</div>
            <div class="count-control">
              <van-stepper v-model="item.count" />
            </div>
          </div>
          <div class="cart-price">￥{{ item.price | moneyFilter }}</div>
          <div>X {{ item.count }}</div>
          <div class="allPrice">{{ item.price * item.count | moneyFilter }}</div>
        </div>
      </div>
    <!-- 商品总额 -->
      <div class="total-money">
        商品总价：￥{{ totalMoney }}
      </div>
    </div>
  </div>
</template>

<script>
import {toMoney} from '@/filter/moneyFilter.js'
export default {
  data () {
    return {
      cartInfo: [], // 购物车内的商品
      isEmpty: false, // 购物车是否为空，不为空则显示true，为空显示false
      errorImg: 'this.src="' + require('@/assets/images/errorimg.png') + '"'
    }
  },
  created () {
    this.getCartInfo()
  },
  mounted () {
    let winHeight = document.documentElement.clientHeight
    document.getElementById('cart-detail').style.height = winHeight - 46 - 43 - 50 + 'px'
  },
  methods: {
    // 点击返回按钮
    handleClickLeft () {
      this.$router.go(-1)
    },
    // 获取购物车的商品信息
    getCartInfo () {
      if (localStorage.cartInfo) this.cartInfo = JSON.parse(localStorage.cartInfo)
      this.isEmpty = this.cartInfo.length > 0
    },
    // 清空购物车
    handleClearCart () {
      localStorage.removeItem('cartInfo')
      this.cartInfo = []
      this.$toast.success('购物车清空成功')
    }
  },
  filters: {
    moneyFilter (money) {
      return toMoney(money)
    }
  },
  computed: {
    totalMoney () {
      let allMoney = 0
      this.cartInfo.map(cart => {
        allMoney += cart.price * cart.count
      })
      return allMoney
    }
  }
}
</script>

<style scoped>
.cart-title{
  height: 2rem;
  line-height: 2rem;
  background-color: #fff;
  border-bottom:1px solid #E4E7ED;
  padding:5px;
  text-align:right;
  margin-top: 46px;
}
#cart-detail{
  min-height: 130rem;
  background-color: #fff;
}
.cart-list{
  background-color: #fff;
}
.cart-row{
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  padding: .5rem;
  font-size: .85rem;
  border-bottom: 1px solid #E4E7ED;
}
.cart-img{
  flex: 6;
}
.cart-text{
  flex: 14;
  padding-left: 10px;
}
.count-control{
  padding-top: 10px;
}
.cart-price{
  flex: 4;
  text-align: right;
}
.allPrice{
  color: red;
  padding-left: .5rem;
}
.total-money{
  text-align: right;
  background-color: #fff;
  border-bottom:1px solid #E4E7ED;
  padding: 5px;
}
</style>
