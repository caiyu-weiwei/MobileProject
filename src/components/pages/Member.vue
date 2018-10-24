<template>
  <div>
    <div class="member-navbar">
      <van-nav-bar
        title="会员中心"
      />
    </div>
    <div class="member-image"></div>
    <div class="member-login">
      <div>
        <van-button type="warning" @click="login">我要登录</van-button>
      </div>
      <div>
        <van-button type="primary" @click="register">我要注册</van-button>
      </div>
    </div>
    <div>
      <van-cell-group>
        <van-cell title="会员卡" is-link />
        <van-cell title="地址管理" is-link />
        <van-cell title="我的订单" is-link />
        <van-cell title="会员权限" is-link />
        <van-cell title="联系我们" is-link />
      </van-cell-group>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
    }
  },
  methods: {
    login () {
      this.$router.push({name: 'Login'})
    },
    register () {
      this.$router.push({name: 'Register'})
    }
  }
}
</script>

<style scoped>
.member-login{
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  background-color: #fff;
  padding: 10px;
  border-bottom: 1px solid #E4E7ED;
}
.member-login div{
  flex: 1;
  text-align: center;
}
</style>
