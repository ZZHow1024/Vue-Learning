<template>
  <div class="order">
    <div class="head">
      <!-- 导航栏 -->
      <van-nav-bar title="我的订单" left-arrow @click-left="$router.go(-1)"/>

      <!-- 公告 -->
      <notice-board class="notice-board"/>

      <!-- 菜单 -->
      <van-tabs class="tabs" color="#0DC161" v-model="active">
        <van-tab name="all" title="全部"></van-tab>
        <van-tab name="payment" title="待支付"></van-tab>
        <van-tab name="delivery" title="待发货"></van-tab>
        <van-tab name="received" title="待收货"></van-tab>
        <van-tab name="comment" title="待评价"></van-tab>
      </van-tabs>
    </div>

    <div class="body">
      <!-- 下垃刷新 -->
      <van-pull-refresh
        v-model="pullRefresh.isLoading"
        pulling-text="继续下拉↓"
        loosing-text="松开刷新↺"
        loading-text="正在载入"
        success-text="刷新成功"
        @refresh="getOrderList">
        <OrderListItem v-for="item in list" :key="item.order_id" :item="item"></OrderListItem>
      </van-pull-refresh>
    </div>
  </div>
</template>

<script>
import OrderListItem from '@/components/OrderListItem.vue'
import { getMyOrderList } from '@/api/order'

export default {
  name: 'OrderPage',
  components: {
    OrderListItem
  },
  data () {
    return {
      pullRefresh: {
        isLoading: false
      },
      active: this.$route.query.dataType || 'all',
      page: 1,
      list: []
    }
  },
  methods: {
    async getOrderList () {
      const { data: { list } } = await getMyOrderList(this.active, this.page)
      list.data.forEach(item => {
        item.total_num = 0
        item.goods.forEach(goods => {
          item.total_num += goods.total_num
        })
      })
      this.list = list.data
      this.pullRefresh.isLoading = false
    }
  },
  watch: {
    active: {
      immediate: true,
      handler () {
        this.getOrderList()
      }
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

  ::v-deep .van-nav-bar__title {
    color: #fff;
  }
}

.head {
  position: fixed;
  width: 100%;
  top: 0;
  z-index: 999;
}

.body {
  position: relative;
  top: 115px;
}

.order {
  background-color: #fafafa;
}

.van-tabs {
  top: -1px;
}
</style>
