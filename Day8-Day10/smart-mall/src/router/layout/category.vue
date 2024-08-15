<template>
  <div class="category">
    <!-- 分类 -->
    <van-nav-bar title="分类页" fixed/>

    <!-- 搜索框 -->
    <van-search
      readonly
      shape="round"
      background="#f1f1f2"
      placeholder="请输入搜索关键词"
      @click="$router.push('/search')"
    />

    <!-- 公告栏 -->
    <notice-board/>

    <!-- 分类列表 -->
    <div class="list-box">
      <div class="left">
        <ul>
          <li v-for="(item, index) in list" :key="item.category_id">
            <a :class="{ active: index === activeIndex }" @click="activeIndex = index"
               href="javascript:;">{{ item.name }}</a>
          </li>
        </ul>
      </div>
      <div class="right">
        <div @click="$router.push(`/searchlist?categoryId=${item.category_id}`)"
             v-for="item in list[activeIndex]?.children" :key="item.category_id" class="cate-goods">
          <img :src="item.image?.external_url" alt="">
          <p>{{ item.name }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getCategoryData } from '@/api/category'

export default {
  name: 'CategoryPage',
  created () {
    this.loading()
  },
  data () {
    return {
      list: [],
      activeIndex: 0
    }
  },
  methods: {
    async getCategoryList () {
      const { data: { list } } = await getCategoryData()
      this.list = list
    },
    loading () {
      this.getCategoryList()
    }
  }
}
</script>

<style lang="less" scoped>
.van-nav-bar {
  background-color: #0DC161;

  ::v-deep .van-nav-bar__left .van-icon {
    color: #fff;
  }

  ::v-deep .van-nav-bar__title {
    color: #fff;
  }
}

// 主题 padding
.category {
  padding-top: 100px;
  height: 100vh;

  .list-box {
    height: 680px;
    padding-bottom: 45px;
    display: flex;

    .left {
      width: 85px;
      height: 100%;
      background-color: #f3f3f3;
      overflow-y: auto;

      a {
        display: block;
        height: 45px;
        line-height: 45px;
        text-align: center;
        color: #444444;
        font-size: 12px;

        &.active {
          color: #0DC161;
          background-color: #fff;
        }
      }
    }

    .right {
      flex: 1;
      height: 100%;
      background-color: #ffffff;
      display: flex;
      flex-wrap: wrap;
      justify-content: flex-start;
      align-content: flex-start;
      padding: 10px 0;
      overflow-y: auto;

      .cate-goods {
        width: 33.3%;
        margin-bottom: 10px;

        img {
          width: 70px;
          height: 70px;
          display: block;
          margin: 5px auto;
        }

        p {
          text-align: center;
          font-size: 12px;
        }
      }
    }
  }
}

// 导航条样式定制
.van-nav-bar {
  z-index: 999;
}

// 搜索框样式定制
.van-search {
  position: fixed;
  width: 100%;
  top: 46px;
  z-index: 999;
}
</style>
