<template>
  <div>
    <div class="category-navbar">
      <van-nav-bar
        title="类别列表"
      />
    </div>
    <div>
      <van-row>
        <van-col span="6">
          <div id="left-nav">
            <ul>
              <li :class = "choseIndex === index ? 'category-active' : ''" v-for="(category, index) in categoryList" :key="index" @click="handleClickCategory(index, category)">{{ category.MALL_CATEGORY_NAME }}</li>
            </ul>
          </div>
        </van-col>
        <van-col span="18">
          <div class="right-list">
            <van-tabs v-model="active" @click="handleClickCategorySub">
              <van-tab v-for="(item, index) in categorySubList" :key="index" :title="item.MALL_SUB_NAME"></van-tab>
            </van-tabs>
          </div>
          <div id="subGoods-list">
            <van-pull-refresh v-model="isRefresh" @refresh="onRefresh">
              <van-list
                v-model="loading"
                :finished="finished"
                :offset="offset"
                @load="onLoad"
              >
                <div class="list-item" v-for="(item, index) in goodsList" :key="index" @click="handleGoGoodsInfo(item)">
                  <div class="list-item-img">
                    <img :src="item.IMAGE1" width="100%" :onerror="errorImg"/>
                  </div>
                  <div class="list-item-text">
                    <div>{{item.NAME}}</div>
                    <div>￥{{item.ORI_PRICE | moneyFilter}}</div>
                  </div>
                </div>
              </van-list>
            </van-pull-refresh>
          </div>
        </van-col>
      </van-row>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import url from '@/serviceAPI.config.js'
import {toMoney} from '@/filter/moneyFilter.js'
export default {
  data () {
    return {
      categoryList: {},
      choseIndex: 0,
      active: 0,
      categorySubList: [],
      categorySubId: '',
      goodsList: [],
      isRefresh: false,
      loading: false,
      finished: false,
      page: 1,
      errorImg: 'this.src="' + require('@/assets/images/errorimg.png') + '"',
      offset: 300
    }
  },
  created () {
    this.getCategoryList()
  },
  mounted () {
    let winHeight = document.documentElement.clientHeight
    document.getElementById('left-nav').style.height = winHeight - 46 - 50 + 'px'
    document.getElementById('subGoods-list').style.height = winHeight - 90 - 50 + 'px'
  },
  filters: {
    moneyFilter (money) {
      return toMoney(money)
    }
  },
  methods: {
    handleClickLeft () {
      this.$router.go(-1)
    },
    // 获取大类数据源
    getCategoryList () {
      axios({
        url: url.getCategoryList,
        method: 'get',
        data: {}
      })
        .then(res => {
          console.log(res)
          if (res.data.code === 200 && res.data.message) {
            this.categoryList = res.data.message
            this.getCategorySubListData(this.categoryList[0].ID)
          } else {
            this.$toast('服务器错误，数据取得失败')
          }
        })
    },
    // 点击大类别列表
    handleClickCategory (idx, category) {
      console.log(category)
      this.choseIndex = idx
      this.goodsList = []
      this.page = 1
      this.$nextTick(() => this.getCategorySubListData(category.ID))
    },
    // 根据大类ID读取小类类别列表
    getCategorySubListData (categoryId) {
      axios({
        url: url.getCategorySubList,
        method: 'post',
        data: {categoryId}
      })
        .then(res => {
          console.log(res)
          if (res.data.code === 200 && res.data.message) {
            this.active = 0
            this.categorySubList = res.data.message
            this.categorySubId = this.categorySubList[0].ID
            this.$nextTick(() => this.getGoodsList(this.categorySubId))
          }
        })
    },
    // 点击小类列表
    handleClickCategorySub (idx, categorySub) {
      console.log(categorySub)
      this.categorySubId = this.categorySubList[idx].ID
      this.goodsList = []
      this.page = 1
      this.$nextTick(() => this.getGoodsList(this.categorySubId))
    },
    // 根据小类ID获取对应列表
    getGoodsList (categorySubId) {
      axios({
        url: url.getGoodsListByCategorySubID,
        method: 'post',
        data: {categorySubId, page: this.page}
      })
        .then(res => {
          console.log(res)
          if (res.data.code === 200 && res.data.message.length) {
            this.page++
            this.goodsList = this.goodsList.concat(res.data.message)
          } else {
            this.finished = true
          }
          this.loading = false
          console.log('this.finished', this.finished)
        })
    },
    // 下拉刷新
    onRefresh () {
      this.finished = false
      this.isRefresh = false
      this.goodsList = []
      this.page = 1
      this.$nextTick(() => this.onLoad())
    },
    // 上拉加载
    onLoad () {
      setTimeout(() => {
        this.categorySubId = this.categorySubId ? this.categorySubId : this.categorySubList[0].ID
        this.$nextTick(() => this.getGoodsList(this.categorySubId))
      }, 1000)
    },
    // 点击商品列表跳转到商品详情
    handleGoGoodsInfo (item) {
      this.$router.push({
        name: 'Goods',
        query: {
          detailId: item.ID
        }
      })
    }
  }
}
</script>
<style scoped>
#left-nav{
  background-color: aliceblue;
}
#left-nav ul li {
  line-height: 2rem;
  border-bottom:1px solid #E4E7ED;
  padding:3px;
  font-size:0.8rem;
  text-align: center;
}
.category-active{
  background-color: #fff;
  color: #0089FF;
}
#subGoods-list{
  overflow: scroll;
}
.list-item{
  display: flex;
  flex-direction: row;
  background-color: #fff;
  border-bottom: 1px solid #f0f0f0;
  font-size: .8rem;
  padding: .3rem;
}
.list-item-img{
  flex:8;
}
.list-item-text{
  flex:16;
  margin-top:10px;
  margin-left:10px;
  color: #FF3E3B;
}
</style>
