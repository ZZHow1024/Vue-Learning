<template>
  <header class="todo-header">
    <h1>小黑记事本</h1>
    <div class="add-container">
      <label>
        <input @keydown.enter="add" v-model.trim="todoName" placeholder="请输入任务" class="new-todo">
      </label>
      <button @click="add" class="add">添加任务</button>
    </div>
  </header>
</template>

<script>
export default {
  data() {
    return {
      todoName: ''
    }
  },

  methods: {
    add() {
      if (this.todoName === '') {
        alert('请输入任务');
        return;
      }

      this.$emit('add', this.todoName);

      this.todoName = '';
    }
  }
}
</script>

<style scoped>
header {
  margin: 0 auto;
  width: 30%;
  border: 1px solid black;
}

.add-container {
  margin: 10px auto;
  width: 50%;
  display: flex; /* 使用 flexbox 布局 */
  justify-content: space-between; /* 将子元素两端对齐 */
  align-items: center; /* 垂直居中对齐 */
}
</style>