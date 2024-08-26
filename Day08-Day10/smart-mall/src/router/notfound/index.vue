<template>
  <div class="app-container">
    <div class="header-container">
      <h1 class="content">404 Not Found</h1>
    </div>
    <p>{{ time }}s 后跳转回上一页</p>
    <div class="button-container">
      <van-button @click="goBack">点击立即跳转</van-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NotFound',
  data () {
    return {
      time: 5,
      timer: null
    }
  },
  mounted () {
    this.timer = setInterval(() => {
      if ((--this.time) === 0) {
        clearInterval(this.timer)
        this.goBack()
      }
    }, 1000)
  },
  destroyed () {
    clearInterval(this.timer)
  },
  methods: {
    goBack () {
      this.$router.go(-1)
    }
  }
}
</script>

<style lang="less" scoped>
h1 {
  text-align: center;
  font-size: 50px;
}

p {
  text-align: center;
}

.button-container {
  text-align: center;
}
</style>
