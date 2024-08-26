<template>
  <div class="app-container">
    <!-- 导航条 -->
    <van-nav-bar title="我的" fixed/>
    <div class="user">
      <!-- 公告栏 -->
      <notice-board/>
      <!-- 下垃刷新 -->
      <van-pull-refresh
        v-model="pullRefresh.isLoading"
        pulling-text="继续下拉↓"
        loosing-text="松开刷新↺"
        loading-text="正在载入"
        success-text="刷新成功"
        @refresh="getUserInfoDetail">
        <div class="body">
          <div class="head-page" v-if="isLogin">
            <div class="head-img">
              <img src="@/assets/default-avatar.png" alt=""/>
            </div>
            <div class="info">
              <div class="mobile">{{ detail.mobile }}</div>
              <div class="vip">
                <van-icon name="diamond-o"/>
                普通会员
              </div>
            </div>
          </div>

          <div v-else class="head-page" @click="$router.push('/login')">
            <div class="head-img">
              <img src="@/assets/default-avatar.png" alt=""/>
            </div>
            <div class="info">
              <div class="mobile">未登录</div>
              <div class="words">点击登录账号</div>
            </div>
          </div>

          <div class="my-asset">
            <div class="asset-left">
              <div class="asset-left-item">
                <span>{{ detail.pay_money || 0 }}</span>
                <span>账户余额</span>
              </div>
              <div class="asset-left-item">
                <span>0</span>
                <span>积分</span>
              </div>
              <div class="asset-left-item">
                <span>0</span>
                <span>优惠券</span>
              </div>
            </div>
            <div class="asset-right">
              <div class="asset-right-item">
                <van-icon name="balance-pay"/>
                <span>我的钱包</span>
              </div>
            </div>
          </div>
          <div class="order-navbar">
            <div class="order-navbar-item" @click="$router.push('/myorder?dataType=all')">
              <van-icon name="balance-list-o"/>
              <span>全部订单</span>
            </div>
            <div class="order-navbar-item" @click="$router.push('/myorder?dataType=payment')">
              <van-icon name="clock-o"/>
              <span>待支付</span>
            </div>
            <div class="order-navbar-item" @click="$router.push('/myorder?dataType=delivery')">
              <van-icon name="logistics"/>
              <span>待发货</span>
            </div>
            <div class="order-navbar-item" @click="$router.push('/myorder?dataType=received')">
              <van-icon name="send-gift-o"/>
              <span>待收货</span>
            </div>
          </div>

          <div class="service">
            <div class="title">我的服务</div>
            <div class="content">
              <div class="content-item">
                <van-icon name="records"/>
                <span>收货地址</span>
              </div>
              <div class="content-item">
                <van-icon name="gift-o"/>
                <span>领券中心</span>
              </div>
              <div class="content-item">
                <van-icon name="gift-card-o"/>
                <span>优惠券</span>
              </div>
              <div class="content-item">
                <van-icon name="question-o"/>
                <span>我的帮助</span>
              </div>
              <div class="content-item">
                <van-icon name="balance-o"/>
                <span>我的积分</span>
              </div>
              <div class="content-item">
                <van-icon name="refund-o"/>
                <span>退换/售后</span>
              </div>
            </div>
          </div>

          <div class="logout-btn">
            <button v-if="isLogin" @click="logout">退出登录</button>
          </div>
        </div>
      </van-pull-refresh>
    </div>
  </div>
</template>

<script>
import { getUserInfoDetail } from '@/api/user.js'
import { Dialog } from 'vant'

export default {
  name: 'UserPage',
  data () {
    return {
      pullRefresh: {
        isLoading: false
      },
      detail: {}
    }
  },
  created () {
    if (this.isLogin) {
      this.getUserInfoDetail()
    }
  },
  computed: {
    isLogin () {
      return this.$store.getters.token
    }
  },
  methods: {
    async getUserInfoDetail () {
      if (this.isLogin) {
        const { data: { userInfo } } = await getUserInfoDetail()
        this.detail = userInfo
      }
      this.pullRefresh.isLoading = false
    },
    logout () {
      Dialog.confirm({
        title: '退出登录',
        message: '请确认是否退出登录',
        confirmButtonText: '退出登录',
        cancelButtonText: '取消',
        confirmButtonColor: '#0DC161'
      })
        .then(() => {
          // on confirm
          this.$store.dispatch('user/logout')
        })
        .catch(() => {
          // on cancel
        })
    }
  }
}
</script>

<style lang="less" scoped>
// 导航条样式定制
.van-nav-bar {
  background-color: #0DC161;

  ::v-deep .van-nav-bar__title {
    color: #fff;
  }
}

.user {
  position: relative;
  top: 46px;
  height: 750px;
  background-color: #f7f7f7;

  .body {
    height: 700px;
  }
}

.head-page {
  height: 130px;
  background: url("http://cba.itlike.com/public/mweb/static/background/user-header2.png");
  background-size: cover;
  display: flex;
  align-items: center;

  .head-img {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    overflow: hidden;
    margin: 0 10px;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
}

.info {
  .mobile {
    margin-bottom: 5px;
    color: #c59a46;
    font-size: 18px;
    font-weight: bold;
  }

  .vip {
    display: inline-block;
    background-color: #3c3c3c;
    padding: 3px 5px;
    border-radius: 5px;
    color: #e0d3b6;
    font-size: 14px;

    .van-icon {
      font-weight: bold;
      color: #ffb632;
    }
  }
}

.my-asset {
  display: flex;
  padding: 20px 0;
  font-size: 14px;
  background-color: #fff;

  .asset-left {
    display: flex;
    justify-content: space-evenly;
    flex: 3;

    .asset-left-item {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;

      span:first-child {
        margin-bottom: 5px;
        color: #ff0000;
        font-size: 16px;
      }
    }
  }

  .asset-right {
    flex: 1;

    .asset-right-item {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;

      .van-icon {
        font-size: 24px;
        margin-bottom: 5px;
      }
    }
  }
}

.order-navbar {
  display: flex;
  padding: 15px 0;
  margin: 10px;
  font-size: 14px;
  background-color: #fff;
  border-radius: 5px;

  .order-navbar-item {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 25%;

    .van-icon {
      font-size: 24px;
      margin-bottom: 5px;
    }
  }
}

.service {
  font-size: 14px;
  background-color: #fff;
  border-radius: 5px;
  margin: 10px;

  .title {
    height: 50px;
    line-height: 50px;
    padding: 0 15px;
    font-size: 16px;
  }

  .content {
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
    font-size: 14px;
    background-color: #fff;
    border-radius: 5px;

    .content-item {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      width: 25%;
      margin-bottom: 20px;

      .van-icon {
        font-size: 24px;
        margin-bottom: 5px;
        color: #ff3800;
      }
    }
  }
}

.logout-btn {
  button {
    width: 60%;
    margin: 10px auto;
    display: block;
    font-size: 13px;
    color: #616161;
    border-radius: 9px;
    border: 1px solid #dcdcdc;
    padding: 7px 0;
    text-align: center;
    background-color: #fafafa;
  }
}
</style>
