<template>
  <div id="app">
    <div class="main">
      <my-table :list="list">
        <template #title>
          <td colspan="4">商品列表</td>
        </template>
        <template #head>
          <td>编号</td>
          <td>图片</td>
          <td>名称</td>
          <td>标签（双击可编辑）</td>
        </template>
        <template #body="{item, index}">
          <td>{{ index + 1 }}</td>
          <td>{{ item.image }}</td>
          <td>{{ item.name }}</td>
          <td><MyTag v-model="item.tag"></MyTag></td>
        </template>
      </my-table>
    </div>
  </div>
</template>

<script>
import MyTable from "./components/MyTable";

export default {
  components: {
    MyTable
  },

  data() {
    return {
      list: [
        {id: 1, image: '1.jpg', name: 'Xiaomi SU7', tag: '新能源汽车'},
        {id: 2, image: '2.jpg', name: 'HUAWEI Pura 70', tag: '手机'},
        {id: 3, image: '3.jpg', name: 'MacBook Air 2024 13寸', tag: '笔记本电脑'}
      ]
    }
  }
}
</script>

<style>
</style>