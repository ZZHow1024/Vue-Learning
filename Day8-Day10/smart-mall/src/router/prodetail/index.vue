<template>
  <div class="prodetail">
    <van-nav-bar fixed title="商品详情页" left-arrow @click-left="$router.go(-1)"/>

    <!-- 下垃刷新 -->
    <van-pull-refresh
      v-model="pullRefresh.isLoading"
      pulling-text="继续下拉↓"
      loosing-text="松开刷新↺"
      loading-text="正在载入"
      success-text="刷新成功"
      @refresh="loading">
      <van-swipe :autoplay="3000" @change="onChange">
        <van-swipe-item v-for="image in images" :key="image.file_id">
          <img :src="image.external_url"/>
        </van-swipe-item>

        <template #indicator>
          <div class="custom-indicator">{{ current + 1 }} / {{ images.length }}</div>
        </template>
      </van-swipe>

      <!-- 商品说明 -->
      <div class="info">
        <div class="title">
          <div class="price">
            <span class="now">￥{{ productDetail.goods_price_min }}</span>
            <span class="oldprice">￥{{ productDetail.goods_price_max }}</span>
          </div>
          <div class="sellcount">已售{{ productDetail.goods_sales }}件</div>
        </div>
        <div class="msg text-ellipsis-2">
          {{ productDetail.goods_name }}
        </div>

        <div class="service">
          <div class="left-words">
            <span><van-icon name="passed"/>七天无理由退货</span>
            <span><van-icon name="passed"/>48小时发货</span>
          </div>
          <div class="right-icon">
            <van-icon name="arrow"/>
          </div>
        </div>
      </div>

      <!-- 商品评价 -->
      <div class="comment">
        <div class="comment-title">
          <div class="left">商品评价 ({{ productComments.total }}条)</div>
          <div class="right">查看更多
            <van-icon name="arrow"/>
          </div>
        </div>
        <div class="comment-list">
          <div class="comment-item" v-for="item in productComments.list" :key="item.comment_id">
            <div class="top">
              <img :src="item.user.avatar_url || defaultAvatar" alt="用户头像">
              <div class="name">{{ item.user.nick_name }}</div>
              <van-rate :size="16" :value="item.score / 2" color="#ffd21e" void-icon="star" void-color="#eee"/>
            </div>
            <div class="content">
              {{ item.content }}
            </div>
            <div class="time">
              {{ item.create_time }}
            </div>
          </div>
        </div>
      </div>

      <!-- 商品描述 -->
      <div class="desc" v-html="productDetail.content"></div>

      <!-- 底部 -->
      <div class="footer">
        <div @click="$router.push('/home')" class="icon-home">
          <van-icon name="wap-home-o"/>
          <span>首页</span>
        </div>
        <div @click="$router.push('/cart')" class="icon-cart">
          <span v-if="cartTotal > 0" class="num">{{ cartTotal }}</span>
          <van-icon name="shopping-cart-o"/>
          <span>购物车</span>
        </div>
        <div @click="addCart" class="btn-add">加入购物车</div>
        <div @click="buyProduct" class="btn-buy">立即购买</div>
      </div>

      <!-- 动作面板 -->
      <van-action-sheet v-model="actionSheet.show" :title="actionSheet.mode ? '立即购买' : '加入购物车'">
        <div class="product">
          <div class="product-title">
            <div class="left">
              <img :src="productDetail.goods_image" alt="商品图片">
            </div>
            <div class="right">
              <div class="price">
                <span>¥</span>
                <span class="nowprice">{{ productDetail.goods_price_min }}</span>
              </div>
              <div class="count">
                <span>库存</span>
                <span>{{ productDetail.stock_total }}</span>
              </div>
            </div>
          </div>
          <div class="num-box">
            <span>数量</span>
            <CountBox :stockTotal="productDetail.stock_total" v-model="addCount"/>
          </div>
          <div class="showbtn" v-if="productDetail.stock_total > 0">
            <div @click="addCartConfirm" class="btn" v-if="!actionSheet.mode">加入购物车</div>
            <div @click="buyProductConfirm" class="btn now" v-else>立刻购买</div>
          </div>
          <div class="btn-none" v-else>该商品已抢完</div>
        </div>
      </van-action-sheet>
    </van-pull-refresh>
  </div>
</template>

<script>
import { getProductComments, getProductDetail } from '@/api/product'
import defaultAvatar from '@/assets/default-avatar.png'
import CountBox from '@/components/CountBox.vue'
import { Toast } from 'vant'
import { addCart, getCartTotal } from '@/api/cart'
import loginConfirm from '@/mixins/loginConfirm'

export default {
  name: 'ProDetail',
  components: {
    CountBox
  },
  mixins: [loginConfirm],
  data () {
    return {
      images: [],
      current: 0,
      productDetail: {},
      productComments: {
        total: 0,
        list: []
      },
      actionSheet: {
        show: false,
        mode: 0 // 0 加入购物车，1 立即购买
      },
      pullRefresh: {
        isLoading: false
      },
      addCount: 1, // 数字框绑定的值
      cartTotal: 0, // 购物车总数
      defaultAvatar
    }
  },
  created () {
    this.loading()
  },
  methods: {
    onChange (index) {
      this.current = index
    },
    loading () {
      this.getDetail()
      this.getComments()
      this.getCartTotal()
    },
    async getDetail () {
      const { data: { detail } } = await getProductDetail(this.goodsId)
      this.productDetail = detail
      this.images = detail.goods_images
      this.pullRefresh.isLoading = false
    },
    async getComments () {
      const {
        data: {
          total,
          list
        }
      } = await getProductComments(this.goodsId, 2)
      this.productComments.total = total
      this.productComments.list = list
    },
    async getCartTotal () {
      const { data: { cartTotal } } = await getCartTotal()
      this.cartTotal = cartTotal
    },
    addCart () {
      this.actionSheet.mode = 0
      this.actionSheet.show = true
    },
    buyProduct () {
      this.actionSheet.mode = 1
      this.actionSheet.show = true
    },
    async addCartConfirm () {
      if (this.loginConfirm()) {
        return
      }

      const { data: { cartTotal } } = await addCart(this.goodsId, this.addCount, this.productDetail.skuList[0].goods_sku_id)
      this.cartTotal = cartTotal
      Toast.success('已加入购物车')
      this.actionSheet.show = false
    },
    buyProductConfirm () {
      if (this.loginConfirm()) {
        return
      }

      this.$router.push({
        path: '/pay',
        query: {
          mode: 'buyNow',
          goodsId: this.goodsId,
          goodsSkuId: this.productDetail.skuList[0].goods_sku_id,
          goodsNum: this.addCount
        }
      })
    }
  },
  computed: {
    goodsId () {
      return this.$route.params.id
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

.prodetail {
  padding-top: 46px;
  padding-bottom: 55px;
  max-width: 750px;

  ::v-deep .van-icon-arrow-left {
    color: #333;
  }

  img {
    display: block;
    width: 100%;
  }

  .custom-indicator {
    position: absolute;
    right: 10px;
    bottom: 10px;
    padding: 5px 10px;
    font-size: 12px;
    background: rgba(0, 0, 0, 0.1);
    border-radius: 15px;
  }

  .desc {
    width: 100%;
    overflow: scroll;

    ::v-deep img {
      display: block;
      width: 100% !important;
    }
  }

  .info {
    padding: 10px;
  }

  .title {
    display: flex;
    justify-content: space-between;

    .now {
      color: #fa2209;
      font-size: 20px;
    }

    .oldprice {
      color: #959595;
      font-size: 16px;
      text-decoration: line-through;
      margin-left: 5px;
    }

    .sellcount {
      color: #959595;
      font-size: 16px;
      position: relative;
      top: 4px;
    }
  }

  .msg {
    font-size: 16px;
    line-height: 24px;
    margin-top: 5px;
  }

  .service {
    display: flex;
    justify-content: space-between;
    line-height: 40px;
    margin-top: 10px;
    font-size: 16px;
    background-color: #fafafa;

    .left-words {
      span {
        margin-right: 10px;
      }

      .van-icon {
        margin-right: 4px;
        color: #fa2209;
      }
    }
  }

  .comment {
    padding: 10px;
  }

  .comment-title {
    display: flex;
    justify-content: space-between;

    .right {
      color: #959595;
    }
  }

  .content {
    word-wrap: break-word;
    overflow: hidden;
  }

  .comment-item {
    font-size: 16px;
    line-height: 30px;

    .top {
      height: 30px;
      display: flex;
      align-items: center;
      margin-top: 20px;

      img {
        width: 20px;
        height: 20px;
      }

      .name {
        margin: 0 10px;
      }
    }

    .time {
      color: #999;
    }
  }

  .footer {
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 55px;
    background-color: #fff;
    border-top: 1px solid #ccc;
    display: flex;
    justify-content: space-evenly;
    align-items: center;

    .icon-home, .icon-cart {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      font-size: 14px;

      .van-icon {
        font-size: 24px;
      }
    }

    .btn-add,
    .btn-buy {
      height: 36px;
      line-height: 36px;
      width: 120px;
      border-radius: 18px;
      background-color: #ffa900;
      text-align: center;
      color: #fff;
      font-size: 14px;
    }

    .btn-buy {
      background-color: #fe5630;
    }

    .icon-cart {
      position: relative;
      padding: 0 6px;

      .num {
        z-index: 999;
        position: absolute;
        top: -2px;
        right: 0;
        min-width: 16px;
        padding: 0 4px;
        color: #fff;
        text-align: center;
        background-color: #ee0a24;
        border-radius: 50%;
      }
    }
  }
}

.tips {
  padding: 10px;
}

// 动作面板
.product {
  .product-title {
    display: flex;

    .left {
      img {
        width: 90px;
        height: 90px;
      }

      margin: 10px;
    }

    .right {
      flex: 1;
      padding: 10px;

      .price {
        font-size: 14px;
        color: #fe560a;

        .nowprice {
          font-size: 24px;
          margin: 0 5px;
        }
      }
    }
  }

  .num-box {
    display: flex;
    justify-content: space-between;
    padding: 10px;
    align-items: center;
  }

  .btn, .btn-none {
    height: 40px;
    line-height: 40px;
    margin: 20px;
    border-radius: 20px;
    text-align: center;
    color: rgb(255, 255, 255);
    background-color: rgb(255, 148, 2);
  }

  .btn.now {
    background-color: #fe5630;
  }

  .btn-none {
    background-color: #cccccc;
  }
}
</style>
