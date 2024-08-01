<template>
  <footer class="todo-footer">
    <div v-if="true">
      <span class="todo-count">合计：<strong>{{  }}</strong></span>
      <button @click="delAll" class="clear-completed">清空所有任务</button>
      <br>
      <button class="reset" @click="reset">重置</button>
    </div>

    <div v-else class="todo-null">
      空空如也
    </div>
  </footer>
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
    delAll() {
      this.$emit('delAll');
    },

    reset() {
      this.$emit('reset');
    }
  }
}
</script>

<style scoped>
footer {
  margin: 0 auto;
  width: 30%;
  border: 1px solid black;
}

div {
  margin: 10px auto;
}

.todo-count {
  margin-right: 30px;
}

.todo-null {
  width: 100%;
}

.reset {
  margin-top: 10px;
}
</style>