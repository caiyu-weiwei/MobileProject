<template>
  <div class="floor">
    <div class="floor_title">
        <p>
            <span>{{floorName.floorIndex}}F</span>
            <span>{{floorName.floorName}}</span>
        </p>
    </div>
    <div class="floor_anomaly">
    <div>
        <img class="floor_img" v-lazy="floor1_0.image">
    </div>
    <div>
        <div>
        <img class="floor_img" v-lazy="floor1_1.image">
        </div>
        <div>
        <img class="floor_img" v-lazy="floor1_2.image">
        </div>
    </div>
    </div>
    <div class="floor_normaly">
    <div v-for="(item, index) in floor1.slice(3)" :key="index">
        <img class="floor_img" v-lazy="item.image">
    </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      floor1_0: {},
      floor1_1: {},
      floor1_2: {}
    }
  },
  props: {
    floor1: {
      type: Array,
      default: function () {
        return []
      }
    },
    floorName: {
      type: Object,
      default: function () {
        return {}
      }
    }
  },
  created () {
    this.handleSouceData()
  },
  methods: {
    handleSouceData () {
      console.log(this.floor1)
      this.floor1_0 = this.floor1[0]
      this.floor1_1 = this.floor1[1]
      this.floor1_2 = this.floor1[2]
    }
  }
}
</script>

<style scoped>
.floor_title{
  width: 20rem;
}
.floor_title p{
  display:flex;
  justify-content: center;
  align-items: center;
}
.floor_title span{
  padding: .2rem;
  display: inline-block;
  font-size: 13px;
}
.floor_title span:first-child{
  border-radius: 1rem;
  color: #fff;
  background-color: #E50F7D;
}
.floor_title span:nth-child(2){
  color: #E50F7D;
}
.floor_anomaly{
  width: 20rem;
  background-color: #fff;
}
.floor_img{
  width: 100%;
}
.floor_anomaly{
  width: 20rem;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
}
.floor_anomaly div{
  width: 10rem;
  box-sizing: border-box;
  -webkit-box-sizing: border-box;
  border-bottom: 1px solid #ddd;
}
.floor_anomaly div:first-child{
  border-right: 1px solid #ddd;
}
.floor_normaly{
  width: 20rem;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}
.floor_normaly div{
  width: 10rem;
  box-sizing: border-box;
  -webkit-box-sizing: border-box;
}
.floor_normaly div:nth-child(odd){
  border-right: 1px solid #ddd;
}
</style>
