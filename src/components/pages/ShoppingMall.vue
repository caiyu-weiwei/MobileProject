<template>
  <div>
    <!-- search area -->
    <div class="search-bar">
      <van-row>
        <van-col span="3">
          <img class="location-icon" :src="locationIcon">
        </van-col>
        <van-col span="16">
          <input type="text" placeholder="查找" class="search-input">
        </van-col>
        <van-col span="5">
          <van-button size="mini">查找</van-button>
        </van-col>
    </van-row>
    </div>
    <!-- swiper area -->
    <div class="swipe-area">
      <van-swipe :autoplay="3000">
        <van-swipe-item v-for="(banner, index) in bannerArray" :key="index">
          <img class="swipe-image" v-lazy="banner.image">
        </van-swipe-item>
      </van-swipe>
    </div>
    <!-- 商品类型 -->
    <div class="products-type">
      <div class="products-type-item" v-for="(item, index) in category" :key="index">
        <img class="category-img" v-lazy="item.image">
        <span>{{item.mallCategoryName}}</span>
      </div>
    </div>
    <!-- 广告条 -->
    <div>
      <img class="advertes-picture" v-lazy="advertesPicture">
    </div>
    <!-- 商品推荐 -->
    <div class="recommend-area">
      <div class="recommend-title">
        商品推荐
      </div>
      <div class="recommend-body">
        <swiper :options="swiperOption">
          <swiper-slide v-for="(recommend, index) in recommendGoods" :key="index">
            <div class="recommend-item">
              <img class="recommend-img" v-lazy="recommend.image">
              <div>{{recommend.goodsName}}</div>
              <div>￥{{recommend.price | moneyFilter}}(￥{{recommend.mallPrice | moneyFilter}})</div>
            </div>
          </swiper-slide>
        </swiper>
      </div>
    </div>
    <!-- 楼层商品 -->
    <floor-component v-if="floor1.length" :floor1="floor1" :floorName="floor1Name"></floor-component>
    <floor-component v-if="floor2.length" :floor1="floor2" :floorName="floor2Name"></floor-component>
    <floor-component v-if="floor3.length" :floor1="floor3" :floorName="floor3Name"></floor-component>
    <!-- 热卖商品 -->
    <div class="hot-area">
      <div class="hot-title">热卖商品</div>
      <div class="hot-goods">
        <van-row>
          <van-col span="12" v-for="(item, index) in hotGoods" :key="index">
            <goods-info :goodsInfo="item"></goods-info>
          </van-col>
        </van-row>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import 'swiper/dist/css/swiper.css'
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import floorComponent from '../component/floorComponent'
import goodsInfo from '../component/goodsComponent'
import { toMoney } from '@/filter/moneyFilter'
import url from '@/serviceAPI.config'
export default {
  name: 'ShoppingMall',
  components: {
    swiper,
    swiperSlide,
    floorComponent,
    goodsInfo
  },
  data () {
    return {
      locationIcon: require('@/assets/images/location.png'),
      bannerArray: [],
      sourceDataUrl: url.shoppingMallUrl,
      category: [],
      advertesPicture: '',
      recommendGoods: [],
      swiperOption: {
        slidesPerView: 3
      },
      floor1: [],
      floor2: [],
      floor3: [],
      floorName: {},
      floor1Name: {},
      floor2Name: {},
      floor3Name: {},
      hotGoods: []
    }
  },
  created () {
    this.getSourceData()
  },
  methods: {
    getSourceData () {
      axios({
        method: 'get',
        url: this.sourceDataUrl,
        data: {}
      })
        .then(res => {
          console.log(res)
          if (res.status === 200) {
            this.bannerArray = res.data.data.slides
            this.category = res.data.data.category
            this.advertesPicture = res.data.data.advertesPicture.PICTURE_ADDRESS
            this.recommendGoods = res.data.data.recommend
            this.floor1 = res.data.data.floor1
            this.floor2 = res.data.data.floor2
            this.floor3 = res.data.data.floor3
            this.floorName = res.data.data.floorName
            this.floor1Name = {'floorName': this.floorName.floor1, 'floorIndex': 1}
            this.floor2Name = {'floorName': this.floorName.floor2, 'floorIndex': 2}
            this.floor3Name = {'floorName': this.floorName.floor3, 'floorIndex': 3}
            this.hotGoods = res.data.data.hotGoods
          }
        })
        .catch(err => {
          console.log(err)
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
.search-bar{
  height: 2.2rem;
  line-height: 2.2rem;
  background-color: #E50F7D;
  overflow: hidden;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 9999;
}
.location-icon{
  width: 80%;
  padding: .2rem 0 0 .2rem;
}
.search-input{
  width: 100%;
  height: 1.3rem;
  border: 0;
  border-bottom: 1px solid #ffffff;
  background-color: #E50F7D;
  color: #ffffff;
  font-size: .8rem;
}
.swipe-area{
  clear: both;
  max-height: 11rem;
  overflow: hidden;
  margin-top: 2.2rem;
}
.swipe-image{
  width: 100%;
}
.products-type{
  background-color: #fff;
  margin: .3rem;
  border-radius: .3rem;
  font-size: 14px;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
}
.products-type-item{
  flex: 1;
  padding: .3rem;
  font-size: 12px;
}
.category-img{
  width: 90%;
}
.advertes-picture{
  width: 100%;
}
.recommend-area{
  background-color: #fff;
  margin-top: .3rem;
}
.recommend-title{
  color: #EB5A4F;
  font-size: 14px;
  padding-left: .3rem;
  border: 1px solid #EFEFEF;
}
.recommend-body{
  font-size: 14px;
  border-bottom: 1px solid #EFEFEF;
}
.recommend-item{
  border-right: 1px solid #EFEFEF;
  text-align: center;
}
.recommend-img{
  width: 90%;
}
.hot-area{
  min-height: 130rem;
  text-align: center;
  font-size: 14px;
  color: #E50F7D;
  background-color: #fff;
}
.hot-title{
  padding: .5rem 0;
}
</style>
