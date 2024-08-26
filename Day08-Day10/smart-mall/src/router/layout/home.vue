<template>
  <div class="home">
    <!-- 导航条 -->
    <van-nav-bar title="智慧商城" fixed/>

    <!-- 搜索框 -->
    <van-search
      readonly
      shape="round"
      background="#f1f1f2"
      placeholder="搜索一下"
      @click="$router.push('/search')"
    />
    <!-- 公告栏 -->
    <notice-board/>
    <!-- 下垃刷新 -->
    <van-pull-refresh
      v-model="pullRefresh.isLoading"
      pulling-text="继续下拉↓"
      loosing-text="松开刷新↺"
      loading-text="正在载入"
      success-text="刷新成功"
      @refresh="loading">
      <!-- 轮播图 -->
      <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
        <van-swipe-item v-for="item in bannerList" :key="item.imgUrl">
          <img :src="item.imgUrl" :alt="item.imgName">
        </van-swipe-item>
      </van-swipe>

      <!-- 导航 -->
      <van-grid column-num="5" icon-size="40">
        <van-grid-item
          v-for="item in navList"
          :key="item.imgUrl"
          :icon="item.imgUrl"
          :text="item.text"
          @click="$router.push('/category')"
        />
      </van-grid>

      <!-- 主会场 -->
      <div class="main">
        <img src="@/assets/main.png" alt="">
      </div>

      <!-- 商品栏 -->
      <div class="guess">
        <p class="guess-title">—— 商品栏 ——</p>

        <div class="goods-list">
          <GoodsItem v-for="item in proList" :key="item.goods_id" :item="item"></GoodsItem>
        </div>
      </div>
    </van-pull-refresh>
  </div>
</template>

<script>
import GoodsItem from '@/components/GoodsItem.vue'
import { getHomeData } from '@/api/home'

export default {
  name: 'HomePage',

  data () {
    return {
      pullRefresh: {
        isLoading: false
      },
      bannerList: [], // 轮播图
      navList: [], // 导航栏
      proList: [] // 商品栏
    }
  },

  created () {
    this.loading()
  },

  components: {
    GoodsItem
  },

  methods: {
    async loading () {
      const { data: { pageData } } = await getHomeData()
      this.bannerList = pageData.items[1].data
      this.navList = pageData.items[3].data
      this.proList = pageData.items[6].data
      this.pullRefresh.isLoading = false
    }
  }
}
</script>

<style lang="less" scoped>
// 主题 padding
.home {
  padding-top: 45px;
}

// 导航条样式定制
.van-nav-bar {
  z-index: 999;
  background-color: #0DC161;

  ::v-deep .van-nav-bar__title {
    color: #fff;
  }
}

// 搜索框样式定制
.van-search {
  width: 100%;
  z-index: 999;
}

// 分类导航部分
.my-swipe .van-swipe-item {
  height: 185px;
  color: #fff;
  font-size: 20px;
  text-align: center;
  background-color: #39a9ed;
}

.my-swipe .van-swipe-item img {
  width: 100%;
  height: 185px;
}

// 主会场
.main img {
  display: block;
  width: 100%;
}

// 猜你喜欢
.guess {
  padding-bottom: 45px;

  .guess .guess-title {
    height: 40px;
    line-height: 40px;
    text-align: center;
  }
}

// 商品样式
.goods-list {
  background-color: #f6f6f6;
}
</style>
