<template>
  <div class="goods-info" @click="handleGoGoodsPage">
    <div>
      <img class="goods-img"  v-lazy="goodsInfo.image">
    </div>
    <p class="goods-name"> {{goodsInfo.name}} </p>
    <p class="goods-price"> ￥ {{goodsInfo.price | moneyFilter}} </p>
  </div>
</template>

<script>
import { toMoney } from '@/filter/moneyFilter'
export default {
  data () {
    return {}
  },
  props: {
    goodsInfo: {
      type: Object,
      default: function () {
        return {}
      }
    }
  },
  methods: {
    handleGoGoodsPage () {
      this.$router.push({
        name: 'Goods',
        query: {goodsId: this.goodsInfo.goodsId}
      })
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
.goods-info{
  width: 10rem;
}
.goods-img{
  width: 100%;
}
.goods-name{
  padding: 0 8px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
