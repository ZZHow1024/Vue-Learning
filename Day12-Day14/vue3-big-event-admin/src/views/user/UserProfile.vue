<script setup>
import { ref } from 'vue'
import PageContainer from '@/components/PageContainer.vue'
import { useUserStore } from '@/stores/index.js'
import { userUpdateInfoService } from '@/api/user.js'

//用户数据
const {
  user: { id, username, nickname, email },
  getUser
} = useUserStore()

// 表单数据
const formModel = ref({
  id,
  username,
  nickname,
  email
})
const rules = ref({
  nickname: [
    { required: true, message: '请输入昵称', trigger: 'change' },
    { min: 2, max: 10, message: '昵称长度需要为 2-10 个字符', trigger: 'blur' },
    { pattern: /^\S*$/, message: '昵称需要为非空字符', trigger: 'blur' }
  ],
  email: [
    { required: true, message: '请输入邮箱', trigger: 'change' },
    { type: 'email', message: '请输入正确的邮箱', trigger: 'blur' }
  ]
})

// 提交用户资料
const formRef = ref()
const onSubmit = async () => {
  await formRef.value.validate()
  await userUpdateInfoService(formModel.value)
  getUser()
  ElMessage.success('修改成功')
}

// 重置表单
const onReset = () => {
  formRef.value.resetFields()
}
</script>

<template>
  <page-container title="基本资料">
    <!-- 表单 -->
    <el-form :model="formModel" :rules="rules" label-width="auto" ref="formRef">
      <el-form-item label="用户名：">
        <el-input v-model="formModel.username" disabled> </el-input>
      </el-form-item>
      <el-form-item label="昵称：" prop="nickname">
        <el-input v-model="formModel.nickname"></el-input>
      </el-form-item>
      <el-form-item label="邮箱：" prop="email">
        <el-input v-model="formModel.email"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onReset">重置</el-button>
        <el-button type="success" @click="onSubmit">确定修改</el-button>
      </el-form-item>
    </el-form>
  </page-container>
</template>

<style scoped></style>
