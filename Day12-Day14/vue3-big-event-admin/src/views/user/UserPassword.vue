<script setup>
import { ref } from 'vue'
import PageContainer from '@/components/PageContainer.vue'
import { userUpdatePasswordService } from '@/api/user.js'
import { useUserStore } from '@/stores/index.js'
import { useRouter } from 'vue-router'

// 表单数据
const defaultForm = ref({
  old_pwd: '',
  new_pwd: '',
  re_pwd: ''
})
const formModel = ref({
  ...defaultForm.value
})
const rules = ref({
  old_pwd: [{ required: true, message: '请输入原始密码', trigger: 'change' }, {}],
  new_pwd: [
    { required: true, message: '密码不能为空', trigger: 'change' },
    {
      min: 6,
      max: 15,
      message: '密码长度需要为 6-15 个字符',
      trigger: 'blur'
    },
    { pattern: /^\S*$/, message: '密码需要为非空字符', trigger: 'blur' },
    {
      validator: (rule, value, callback) => {
        if (value === formModel.value.old_pwd) {
          callback(new Error('新密码与原始密码一致'))
        } else {
          callback()
        }
      },
      trigger: 'blur'
    }
  ],
  re_pwd: [
    { required: true, message: '请再次输入密码', trigger: 'change' },
    {
      min: 6,
      max: 15,
      message: '密码长度需要为 6-15 个字符',
      trigger: 'blur'
    },
    { pattern: /^\S*$/, message: '密码需要为非空字符', trigger: 'blur' },
    {
      validator: (rule, value, callback) => {
        if (value !== formModel.value.new_pwd) {
          callback(new Error('密码不一致'))
        } else if (value === formModel.value.old_pwd) {
          callback(new Error('新密码与原始密码一致'))
        } else {
          callback()
        }
      },
      trigger: 'blur'
    }
  ]
})
const formRef = ref()

// 提交表单
const userStore = useUserStore()
const router = useRouter()
const onSubmit = async () => {
  await formRef.value.validate()
  await userUpdatePasswordService(formModel.value)
  ElMessage.success('修改成功')
  userStore.setToken('')
  userStore.setUser({})
  await router.replace('/login')
}

// 重置表单
const onReset = () => {
  formRef.value.resetFields()
}
</script>

<template>
  <PageContainer title="重置密码">
    <el-form :model="formModel" :rules="rules" label-width="auto" ref="formRef">
      <el-form-item label="原始密码" prop="old_pwd">
        <el-input v-model="formModel.old_pwd"></el-input>
      </el-form-item>
      <el-form-item label="新密码" prop="new_pwd">
        <el-input v-model="formModel.new_pwd"></el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="re_pwd">
        <el-input v-model="formModel.re_pwd"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button @click="onReset" type="primary">重置</el-button>
        <el-button @click="onSubmit" type="success">修改密码</el-button>
      </el-form-item>
    </el-form>
  </PageContainer>
</template>

<style scoped></style>
