<template>
  <div>
    <van-nav-bar
      title="用户登录"
      left-text="返回"
      left-arrow
      @click-left="handleClickLeft"
    />
    <div class="login-panel">
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
      <div class="login-button">
        <van-button type="primary" size="large" :loading="loading" @click="handleLogin">马上登录</van-button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import url from '@/serviceAPI.config.js'
export default {
  data () {
    return {
      userName: '',
      password: '',
      loading: false,
      usernameErrorMessage: '',
      passwordErrorMessage: ''
    }
  },
  created () {
    if (localStorage.userInfo) {
      this.$toast.success('您已经登录过了')
      this.$router.push('/Main')
    }
  },
  methods: {
    handleClickLeft () {
      this.$router.push('/Main')
    },
    handleLogin () {
      this.handleCheckInputForm() && this.axiosLogin()
    },
    axiosLogin () {
      this.loading = true
      axios({
        url: url.loginUser,
        method: 'post',
        data: {
          userName: this.userName,
          password: this.password
        }
      })
        .then(res => {
          // 移动端的应用有一个特殊的地方，就是当用户登录一次后，下次就不用登录了。这时候登录的信息是存储到了本地的LocalStorage里了。这个操作要等取得正确的登录状态以后再执行，也就是要在axios返回了登录成功结果以后执行。
          console.log(res)
          if (res.data.code === 200) {
            new Promise((resolve, reject) => {
              localStorage.userInfo = {userName: this.userName}
              setTimeout(() => resolve(), 500)
            }).then(() => {
              this.$toast.success('登录成功')
              this.$router.push('/Main')
            }).catch(err => {
              this.$toast.fail('登录状态保存失败')
              console.log(err)
            })
          } else {
            this.$toast.fail('登录失败')
            this.loading = false
          }
        })
        .catch(err => {
          console.log(err)
          this.$toast.fail('登录失败')
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
.login-panel{
  width: 96%;
  border-radius: .3rem;
  margin: 1.25rem auto;
  padding-bottom: 3.125rem;
}
.login-button{
  padding-top: .8rem;
}
</style>
