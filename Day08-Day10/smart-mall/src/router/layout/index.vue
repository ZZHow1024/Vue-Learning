<template>
  <div class="app-container">
    <router-view></router-view>
    <van-tabbar active-color="#0DC161" inactive-color="black" v-model="active" route>
      <van-tabbar-item to="/home" icon="wap-home">首页</van-tabbar-item>
      <van-tabbar-item to="/category" icon="wap-nav">分类页</van-tabbar-item>
      <van-tabbar-item to="/cart" icon="shopping-cart">购物车</van-tabbar-item>
      <van-tabbar-item to="/user" icon="user">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  name: 'LayoutIndex',
  data () {
    return {
      active: 0
    }
  }
}
</script>

<style lang="less" scoped>

</style>
