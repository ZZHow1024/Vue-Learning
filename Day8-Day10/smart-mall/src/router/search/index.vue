<template>
  <div class="search">
    <van-nav-bar title="商品搜索" left-arrow @click-left="$router.go(-1)"/>

    <van-search @keydown.enter="goSearch(search)" v-model.trim="search" show-action
                placeholder="请输入搜索关键词"
                clearable ref="input">
      <template #action>
        <div @click="goSearch(search)">搜索</div>
      </template>
    </van-search>

    <!-- 搜索历史 -->
    <div class="search-history" v-if="history.length > 0">
      <div class="title">
        <span>搜索历史</span>
        <van-icon @click="clearHistory" name="delete-o" size="16"/>
      </div>
      <div class="list">
        <div v-for="item in history" :key="item" @click="goSearch(item)" class="list-item">{{ item }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import { getHistoryList, setHistoryList, removeHistoryList } from '@/utils/storage'
import { Toast } from 'vant'

export default {
  name: 'SearchIndex',

  mounted () {
    this.$nextTick(() => {
      this.$refs.input.querySelector('input').focus()
    })
  },

  data () {
    return {
      search: '',
      history: getHistoryList()
    }
  },

  methods: {
    goSearch (key) {
      if (key.length <= 0) {
        Toast.fail('请输入搜索关键词')
        return
      }

      const index = this.history.indexOf(key)
      if (index !== -1) {
        this.history.splice(index, 1)
      }
      this.history.unshift(key)
      setHistoryList(this.history)

      // 跳转到搜索列表页
      this.$router.push(`/searchlist?search=${key}`)
    },

    clearHistory () {
      this.history = []

      removeHistoryList()
    }
  }
}
</script>

<style lang="less" scoped>
// 导航条样式定制
.van-nav-bar {
  z-index: 999;
  background-color: #0DC161;

  ::v-deep .van-nav-bar__left .van-icon {
    color: #fff;
  }

  ::v-deep .van-nav-bar__title {
    color: #fff;
  }
}

.search {
  .searchBtn {
    background-color: #0DC161;
    color: #fff;
  }

  ::v-deep .van-search__action {
    background-color: #0DC161;
    color: #fff;
    padding: 0 20px;
    border-radius: 0 5px 5px 0;
    margin-right: 10px;
  }

  ::v-deep .van-icon-arrow-left {
    color: #333;
  }

  .title {
    height: 40px;
    line-height: 40px;
    font-size: 14px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 15px;
  }

  .list {
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
    padding: 0 10px;
    gap: 5%;
  }

  .list-item {
    width: 30%;
    text-align: center;
    padding: 7px;
    line-height: 15px;
    border-radius: 50px;
    background: #fff;
    font-size: 13px;
    border: 1px solid #efefef;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    margin-bottom: 10px;
  }
}
</style>
