<template>
  <!-- 公告 -->
  <div class="announcement">
    <p>项目仅用于演示，商品不会真实发货。</p>
  </div>
</template>

<script>
export default {
  name: 'NoticeBoard'
}
</script>

<style lang="less" scoped>
// 公告栏定制
.announcement {
  background-color: #fafafa;
  p {
    text-align: center;
    color: red;
  }
}
</style>
