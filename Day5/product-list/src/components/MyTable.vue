<template>
  <table>
    <thead>
    <tr>
      <slot name="title"></slot>
    </tr>
    <tr>
      <slot name="head"></slot>
    </tr>
    </thead>
    <tbody>
    <tr v-for="(item, index) in list" :key="item.id">
      <slot name="body" :item="item" :index="index"></slot>
    </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  props: {
    list: Array
  }
}
</script>

<style>
table {
  border-collapse: collapse; /* 将表格边框合并 */
  width: 100%; /* 使表格宽度占满容器 */
}

thead {
  background-color: rgba(0, 0, 0, 30%);
}

th, td {
  border: 1px solid black; /* 添加边框 */
  padding: 8px; /* 内边距 */
  text-align: center; /* 文本居中对齐 */
}
</style>