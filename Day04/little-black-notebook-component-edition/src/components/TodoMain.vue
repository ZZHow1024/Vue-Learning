<template>
  <section class="todo-main" v-if="this.list.length > 0">
    <ul class="todo-list">
      <li class="todo" v-for="(item, index) in list" :key="item.id">
        <div class="view">
          <span class="index">{{ index + 1 }}. <label>{{ item.name }}</label></span>
          <button class="destroy" @click="del(item.id)"> 删除</button>
        </div>
      </li>
    </ul>
  </section>
</template>

<script>
export default {
  props: {
    list: {
      type: Array,
      required: true
    }
  },

  methods: {
    del(id) {
      this.$emit('del', id);
    }
  }
}
</script>

<style scoped>
section {
  margin: 0 auto;
  width: 30%;
  border: 1px solid black;
}

ul {
  padding: 0;
  list-style: none; /* 移除默认的列表样式 */
  margin: 5px auto;
}

li {
  margin: 10px auto;
  padding: 0;
  text-align: left; /* 确保文本左对齐 */
}

.view {
  margin: 0 auto;
  width: 40%;
  display: flex; /* 使用 flexbox 布局 */
  justify-content: space-between; /* 将子元素两端对齐 */
  align-items: center; /* 垂直居中对齐 */
}
</style>