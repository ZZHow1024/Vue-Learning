<template>
  <div class="search">
    <van-nav-bar fixed title="商品列表" left-arrow @click-left="$router.go(-1)"/>

    <!-- 下拉刷新 -->
    <van-pull-refresh
      v-model="pullRefresh.isLoading"
      pulling-text="继续下拉↓"
      loosing-text="松开刷新↺"
      loading-text="正在载入"
      success-text="刷新成功"
      @refresh="search">
      <van-search
        readonly
        shape="round"
        background="#ffffff"
        :value="goodsName"
        show-action
        @click="$router.push('/search')"
      >
        <template #action>
          <van-icon @click="actionSheet.show = true" class="tool" name="apps-o"/>
        </template>
      </van-search>

      <!-- 排序选项按钮 -->
      <div class="sort-btns">
        <div :class="{'sort-item': true, 'active-btn': sortType === 'all'}" @click="changeSortType('all')">综合</div>
        <div :class="{'sort-item': true, 'active-btn': sortType === 'sales'}" @click="changeSortType('sales')">销量
        </div>
        <div :class="{'sort-item': true, 'active-btn': sortType === 'price'}" @click="changeSortType('price')">
          价格{{ sortType === 'price' ? sortPrice ? '↓' : '↑' : '' }}
        </div>
      </div>

      <div class="action-sheet">
        <van-action-sheet
          v-model="actionSheet.show"
          :actions="actionSheet.actions"
          cancel-text="取消"
          close-on-click-action
          @select="changeSortPrice"
        />
      </div>

      <div class="goods-list">
        <GoodsItem v-for="item in goodsList" :key="item.goods_id" :item="item"></GoodsItem>
        <div v-if="goodsListEmpty.show" class="goods-list-empty">空空如也 :(</div>
      </div>
    </van-pull-refresh>
  </div>
</template>

<script>
import GoodsItem from '@/components/GoodsItem.vue'
import { getProducts } from '@/api/product'

export default {
  name: 'SearchIndex',
  components: {
    GoodsItem
  },
  created () {
    if (!this.goodsName && !this.categoryId) {
      this.$router.go(-1)
    }

    this.search()
  },
  data () {
    return {
      actionSheet: {
        show: false,
        actions: [{ name: '价格从低到高' }, { name: '价格从高到低' }]
      },
      goodsListEmpty: {
        show: false
      },
      pullRefresh: {
        isLoading: false
      },
      page: 1,
      sortType: 'all',
      sortPrice: 0,
      goodsList: []
    }
  },
  computed: {
    goodsName () {
      return this.$route.query.search
    },
    categoryId () {
      return this.$route.query.categoryId
    }
  },
  methods: {
    async search () {
      this.goodsListEmpty.show = false
      const res = await getProducts({
        categoryId: this.categoryId,
        goodsName: this.goodsName,
        page: this.page,
        sortType: this.sortType,
        sortPrice: this.sortPrice
      })
      if (res.data.list.data.length > 0) {
        this.goodsList = res.data.list.data
      } else {
        this.goodsListEmpty.show = true
      }
      this.pullRefresh.isLoading = false
    },

    changeSortType (type) {
      if (this.sortType !== type) {
        this.sortType = type
        this.search()
      } else if (this.sortType === 'price') {
        this.changeSortPrice(this.sortPrice ? this.actionSheet.actions[0] : this.actionSheet.actions[1])
      }
    },
    changeSortPrice (item) {
      this.sortPrice = item.name === '价格从低到高' ? 0 : 1
      if (this.sortType !== 'price') {
        this.sortType = 'price'
      }
      this.search()
    }
  }
}
</script>

<style lang="less" scoped>
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
  padding-top: 46px;

  ::v-deep .van-icon-arrow-left {
    color: #333;
  }

  .tool {
    font-size: 24px;
    height: 40px;
    line-height: 40px;
  }

  .sort-btns {
    display: flex;
    height: 36px;
    line-height: 36px;
    color: #999999;

    .sort-item {
      text-align: center;
      flex: 1;
      font-size: 16px;
    }
  }

  // 商品样式
  .goods-list {
    background-color: #f6f6f6;
    min-height: 667.57px;

    .goods-list-empty {
      padding-top: 50px;
      text-align: center;
    }
  }

  // 按钮被选中
  .active-btn {
    color: black;
    font-weight: bold;
  }
}
</style>
