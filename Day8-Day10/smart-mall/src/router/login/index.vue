<template>
  <div class="app-container">
    <!-- 头部 -->
    <van-nav-bar
      title="登录"
      left-text="返回"
      right-text="刷新"
      left-arrow
      @click-left="onClickLeft"
      @click-right="onClickRight"
    />

    <!-- 公告 -->
    <div class="announcement">
      <p>项目仅用于演示，<strong>无需</strong>输入<strong>真实</strong>手机号。</p>
    </div>

    <!-- 主体 -->
    <div class="main-container">
      <div class="header-container">
        <div class="header-title">
          <h1>手机号登录</h1>
          <p>未注册的手机号登录后将自动注册</p>
        </div>
      </div>
      <div class="input-container">
        <!-- 输入手机号，调起手机号键盘 -->
        <van-field placeholder="单击填入" maxlength="11" required v-model.trim.number="tel" type="digit" label="手机号"/>
        <!-- 输入任意文本 -->
        <van-field placeholder="单击填入" maxlength="4" required label-class="code-text" v-model.trim="picCode" label="图形验证码">
          <template #right-icon>
            <img @click="getPicCode" v-if="picUrl" class="code-image" :src="picUrl" alt="code" width="104" height="33"/>
          </template>
        </van-field>
        <!-- 输入验证码 -->
        <van-field
          @keydown.enter="login"
          ref="smsCodeInput"
          placeholder="单击填入"
          required
          maxlength="6"
          v-model.trim.number="smsCode"
          type="digit"
          center
          clearable
          label="短信验证码">
          <template #button>
            <van-button @click="getCode" class="sms-btn" size="small" type="primary">
              {{ second === totalSecond ? '获取验证码' : second + '秒后重新获取' }}
            </van-button>
          </template>
        </van-field>
        <van-button @click="login" type="primary" class="login-btn">登录</van-button>
      </div>
    </div>
  </div>
</template>

<script>
import { codeLogin, getPicCode, getSmsCode } from '@/api/login'
import { Dialog } from 'vant'

export default {
  name: 'LoginIndex',
  created () {
    this.getPicCode()
  },
  destroyed () {
    // 离开页面清除倒计时
    clearInterval(this.timer)
  },
  data () {
    return {
      tel: '',
      picCode: '', // 用户输入的图形验证码
      picUrl: '', // 请求到的图形验证码
      picKey: '', // 请求传递的图形验证码唯一标识
      smsCode: '',
      totalSecond: 60, // 总秒数
      second: 60, // 当前秒数
      timer: null // 定时器 ID
    }
  },
  methods: {
    onClickLeft () {
      const backUrl = this.$route.query.backUrl || '/home'
      this.$router.replace(backUrl).then()
    },
    onClickRight () {
      window.location.reload()
    },
    async getPicCode () {
      const res = await getPicCode()
      this.picUrl = res.data.base64
      this.picKey = res.data.key
    },

    async getCode () {
      // 手机号和图形验证码校验
      if (!this.validFn()) {
        return
      }
      // 没有定时器且 totalSecond 和 second 一致（秒数归位）才可以倒计时
      if (!this.timer && this.second === this.totalSecond) {
        // 发送请求，获取手机验证码
        await getSmsCode(this.picCode, this.picKey, this.tel)
        this.$toast.success('获取短信验证码成功')
        setTimeout(() => {
          Dialog.alert({
            title: '手机验证码',
            message: '246810',
            confirmButtonColor: '#0DC161'
          }).then(() => {
            this.$refs.smsCodeInput.focus()
          })
        }, 1500)

        // 开启倒计时
        this.timer = setInterval(() => {
          if (--this.second <= 0) {
            clearInterval(this.timer)
            this.second = this.totalSecond
          }
        }, 1000)
      }
    },

    validFn () {
      // 手机号和图形验证码校验
      if (!/^1[3-9]\d{9}$/.test(this.tel)) {
        this.$toast.fail('请输入正确的手机号')
        return false
      } else if (!/^\w{4}$/.test(this.picCode)) {
        this.$toast.fail('请输入正确的图形验证码')
        return false
      }

      return true
    },

    async login () {
      // 校验手机号和图形验证码
      if (!this.validFn()) {
        return
      }

      if (!/^\d{6}$/.test(this.smsCode)) {
        this.$toast.fail('请输入正确的手机验证码')
        return
      }

      const loginRes = await codeLogin(this.tel.toString(), this.smsCode.toString())

      this.$store.commit('user/setUserInfo', loginRes.data)
      this.$toast.success('登录成功')

      const backUrl = this.$route.query.backUrl || '/home'
      this.$router.replace(backUrl).then()
    }
  }
}
</script>

<style lang="less" scoped>
// 导航条样式定制
.van-nav-bar {
  background-color: #0DC161;

  ::v-deep .van-nav-bar__left .van-icon {
    color: #fff;
  }

  ::v-deep .van-nav-bar__text {
    color: #fff;
  }

  ::v-deep .van-nav-bar__title {
    color: #fff;
  }
}

// 公告栏定制
.announcement {
  p {
    text-align: center;
    color: red;
  }
}

.app-container {
  .main-container {
    padding: 30px 30px;
  }

  .header-container {
    .header-title {
      width: 100%;
      height: 100px;
      margin: 30px 30px;
    }
  }

  .input-container {
    width: 100%;
    height: 200px;
    margin: 0 5px;

    .sms-btn {
      border-radius: 10px;
    }

    .login-btn {
      margin: 30px 10%;
      width: 80%;
      height: 50px;
      border-radius: 10px;
    }
  }
}
</style>
