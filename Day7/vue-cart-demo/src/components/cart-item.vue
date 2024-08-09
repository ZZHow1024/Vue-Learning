<template>
  <div class="goods-container">
    <!-- 左侧图片区域 -->
    <div class="left">
      <img :src="item.thumb" class="avatar" alt="">
    </div>
    <!-- 右侧商品区域 -->
    <div class="right">
      <!-- 标题 -->
      <div class="title">{{ item.name }}</div>
      <div class="info">
        <!-- 单价 -->
        <span class="price">￥{{ item.price }}</span>
        <div class="btns">
          <!-- 按钮区域 -->
          <button :disabled="item.count <= 1" @click="btnClick(-1)" class="btn btn-light">-</button>
          <span class="count">{{ item.count }}</span>
          <button :disabled="item.count >= 10" @click="btnClick(1)" class="btn btn-light">+</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CartItem',
  methods: {
    btnClick (num) {
      const id = this.item.id
      const count = this.item.count + num

      this.$store.dispatch('cart/updateCount', {
        id,
        count
      })
    }
  },

  props: {
    item: {
      type: Object,
      required: true
    }
  }
}
</script>

<style lang="less" scoped>
button {
  cursor: pointer;
}

.goods-container {
  display: flex;
  padding: 10px;

  + .goods-container {
    border-top: 1px solid #f8f8f8;
  }

  .left {
    .avatar {
      width: 100px;
      height: 100px;
    }

    margin-right: 10px;
  }

  .right {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    flex: 1;

    .title {
      font-weight: bold;
    }

    .info {
      display: flex;
      justify-content: space-between;
      align-items: center;

      .price {
        color: red;
        font-weight: bold;
      }

      .btns {
        .count {
          display: inline-block;
          width: 30px;
          text-align: center;
        }
      }
    }
  }
}

.custom-control-label::before,
.custom-control-label::after {
  top: 3.6rem;
}
</style>
