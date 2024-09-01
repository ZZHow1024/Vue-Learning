<script setup>
import { ref, onBeforeUnmount } from 'vue'
import { useRouter } from 'vue-router'

const count = ref(5)
const router = useRouter()
const interval = setInterval(() => {
  if (count.value-- === 1) {
    router.replace('/')
  }
}, 1000)
onBeforeUnmount(() => {
  clearInterval(interval)
})
</script>

<template>
  <div class="pageNotFound">
    <h1>404 Not Found.</h1>
    <br />
    {{ count }}s 后前往首页 <br /><br />
    <el-button @click="router.replace('/')">立即前往首页</el-button>
  </div>
</template>

<style scoped>
.pageNotFound {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  font-size: 30px;
}
</style>
