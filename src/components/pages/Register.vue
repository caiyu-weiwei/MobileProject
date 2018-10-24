<template>
  <div>
    <van-nav-bar
      title="用户注册"
      left-text="返回"
      left-arrow
      @click-left="handleGoBack"
    />
    <div class="register-panel">
      <van-field
        v-model="userName"
        required
        clearable
        label="用户名"
        placeholder="请输入用户名"
        :error-message="usernameErrorMessage"
      />
      <van-field
        v-model="password"
        type="password"
        label="密码"
        placeholder="请输入密码"
        required
        :error-message="passwordErrorMessage"
      />
      <div class="register-button">
        <van-button type="primary" size="large" :loading="loading" @click="handleRegister">马上注册</van-button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import url from '@/serviceAPI.config.js'
export default {
  name: 'Register',
  data () {
    return {
      userName: '',
      password: '',
      loading: false,
      usernameErrorMessage: '',
      passwordErrorMessage: ''
    }
  },
  methods: {
    handleGoBack () {
      this.$router.go(-1)
    },
    handleRegister () {
      this.handleCheckInputForm() && this.axiosRegister()
    },
    axiosRegister () {
      this.loading = true
      axios({
        url: url.registerUser,
        method: 'post',
        data: {
          userName: this.userName,
          password: this.password
        }
      })
        .then(res => {
          console.log(res)
          if (res.data.code === 200) {
            this.$toast.success('注册成功')
            this.$router.push('/Main')
          } else {
            this.$toast.fail('注册失败')
            this.loading = false
          }
        })
        .catch(err => {
          console.log(err)
          this.$toast.fail('注册失败')
          this.loading = false
        })
    },
    handleCheckInputForm () {
      let isOk = true
      if (this.userName.length < 5) {
        this.usernameErrorMessage = '用户名不能少于5位'
        isOk = false
      } else {
        this.usernameErrorMessage = ''
      }
      if (this.password.length < 6) {
        this.passwordErrorMessage = '密码不能少于6位'
        isOk = false
      } else {
        this.passwordErrorMessage = ''
      }
      return isOk
    }
  }
}
</script>

<style scoped>
.register-panel{
  width: 96%;
  border-radius: .3rem;
  margin: 1.25rem auto;
  padding-bottom: 3.125rem;
}
.register-button{
  padding-top: .8rem;
}
</style>
