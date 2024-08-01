<template>
  <div id="app">
    <TodoHeader @add="handleAdd"></TodoHeader>
    <TodoMain :list="list" @del="handleDel"></TodoMain>
    <TodoFooter :list="list" @delAll="handleDel(-1)" @reset="handleReset"></TodoFooter>
  </div>
</template>

<script>
import TodoHeader from "@/components/TodoHeader.vue";
import TodoMain from "@/components/TodoMain.vue";
import TodoFooter from "@/components/TodoFooter.vue";

export default {
  data() {
    return {
      list: JSON.parse(localStorage.getItem("list")) || this.defaultList
    }
  },

  created() {
    this.defaultList = [
      {id: 1, name: '学习 Vue2'},
      {id: 2, name: '学习 Vue3'},
    ];
  },

  components: {
    TodoHeader,
    TodoMain,
    TodoFooter
  },

  methods: {
    handleAdd(todoName) {
      this.list.unshift({
        id: +new Date(),
        name: todoName
      });
    },

    handleDel(id) {
      if(id === -1)
        this.list = [];
      else
        this.list = this.list.filter(item => item.id !== id);
    },

    handleReset() {
      this.list = this.defaultList;
    }
  },

  watch: {
    list: {
      deep: true,
      handler() {
        window.localStorage.setItem('list', JSON.stringify(this.list));
      }
    }
  },

  mounted() {
    document.querySelector(".new-todo").focus();
  }
}
</script>

<style>
#app {
  text-align: center; /* 文本居中对齐 */
}

button {
  cursor: pointer;
}
</style>