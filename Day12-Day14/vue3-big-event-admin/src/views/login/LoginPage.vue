<script setup>
import { User, Lock } from '@element-plus/icons-vue'
import { ref, watch } from 'vue'
import { userLoginService, userRegisterService } from '@/api/user.js'
import { useUserStore } from '@/stores/index.js'
import { useRouter } from 'vue-router'

const form = ref()
const isRegister = ref(false)
const formModel = ref({
  username: '',
  password: '',
  repassword: ''
})
const rules = {
  username: [
    { required: true, message: '用户名不能为空', trigger: 'change' },
    {
      min: 5,
      max: 10,
      message: '用户名长度需要为 5-10 个字符',
      trigger: 'blur'
    },
    { pattern: /\S$/, message: '用户名需要为非空字符', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '密码不能为空', trigger: 'change' },
    {
      min: 6,
      max: 15,
      message: '密码长度需要为 6-15 个字符',
      trigger: 'blur'
    },
    { pattern: /\S*$/, message: '密码需要为非空字符', trigger: 'blur' }
  ],
  repassword: [
    { required: true, message: '确认密码不能为空', trigger: 'change' },
    {
      min: 6,
      max: 15,
      message: '密码长度需要为 6-15 个字符',
      trigger: 'blur'
    },
    { pattern: /^\S$/, message: '密码需要为非空字符', trigger: 'blur' },
    {
      validator: (rule, value, callback) => {
        // 判断 value 与 form 中收集的 password 是否一致
        if (value !== formModel.value.password) {
          callback(new Error('密码不一致')) // 校验失败
        } else {
          callback() //校验成功，callback 回调
        }
      },
      trigger: 'blur'
    }
  ]
}
const register = async () => {
  if (loading.value) return
  await form.value.validate()
  loading.value = true
  const res = await userRegisterService(formModel.value)
  if (res.code === 0) {
    ElMessage.success('注册成功')
    isRegister.value = false
  } else {
    ElMessage.error(res.message)
  }
  loading.value = false
}
const userStore = useUserStore()
const router = useRouter()
const loading = ref(false)
const login = async () => {
  if (loading.value) return
  await form.value.validate()
  loading.value = true
  const res = await userLoginService(formModel.value)

  if (res?.token) {
    userStore.setToken(res.token)
    ElMessage.success('登录成功')
    await router.replace('/')
  } else {
    ElMessage.error('登录失败')
  }
  loading.value = false
}
// 切换注册/登录时重置表单内容
watch(isRegister, () => {
  formModel.value = {
    username: '',
    password: '',
    repassword: ''
  }
})
</script>

<template>
  <el-row class="login-page">
    <el-col :span="12" class="bg"></el-col>
    <el-col :span="6" :offset="3" class="form">
      <div class="tips">项目来源：黑马程序员</div>
      <div class="tips" style="color: red">
        项目仅用于演示，<strong>无需</strong>输入真实手机号。
      </div>
      <!-- 注册相关表单 -->
      <el-form
        :rules="rules"
        :model="formModel"
        ref="form"
        size="large"
        autocomplete="off"
        v-if="isRegister"
      >
        <el-form-item>
          <h1>注册</h1>
        </el-form-item>
        <el-form-item prop="username">
          <el-input
            v-model="formModel.username"
            :prefix-icon="User"
            placeholder="请输入用户名"
          ></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            v-model="formModel.password"
            :prefix-icon="Lock"
            type="password"
            placeholder="请输入密码"
          ></el-input>
        </el-form-item>
        <el-form-item prop="repassword">
          <el-input
            @keydown.enter="register"
            v-model="formModel.repassword"
            :prefix-icon="Lock"
            type="password"
            placeholder="请输入再次密码"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button
            v-loading="loading"
            @click="register"
            class="button"
            type="primary"
            auto-insert-space
          >
            注册</el-button
          >
        </el-form-item>
        <el-form-item class="flex">
          <el-link type="info" :underline="false" @click="isRegister = false"> ← 返回</el-link>
        </el-form-item>
      </el-form>
      <!-- 登录相关表单 -->
      <el-form :model="formModel" :rules="rules" ref="form" size="large" autocomplete="off" v-else>
        <el-form-item>
          <h1>登录</h1>
        </el-form-item>
        <el-form-item prop="username">
          <el-input
            v-model="formModel.username"
            :prefix-icon="User"
            placeholder="请输入用户名"
          ></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            v-model="formModel.password"
            name="password"
            :prefix-icon="Lock"
            type="password"
            placeholder="请输入密码"
            @keydown.enter="login"
          ></el-input>
        </el-form-item>
        <el-form-item class="flex">
          <div class="flex">
            <el-checkbox>记住我</el-checkbox>
            <el-link type="primary" :underline="false">忘记密码？</el-link>
          </div>
        </el-form-item>
        <el-form-item>
          <el-button
            v-loading="loading"
            @click="login"
            class="button"
            type="primary"
            auto-insert-space
            >登录</el-button
          >
        </el-form-item>
        <el-form-item class="flex">
          <el-link type="info" :underline="false" @click="isRegister = true"> 注册 →</el-link>
        </el-form-item>
      </el-form>
    </el-col>
  </el-row>
</template>

<style lang="scss" scoped>
.tips {
  font-size: 25px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.login-page {
  height: 100vh;
  background-color: #fff;

  .bg {
    background:
      url('@/assets/logo2.png') no-repeat 60% center / 240px auto,
      url('@/assets/login_bg.jpg') no-repeat center / cover;
    border-radius: 0 20px 20px 0;
  }

  .form {
    display: flex;
    flex-direction: column;
    justify-content: center;
    user-select: none;

    .title {
      margin: 0 auto;
    }

    .button {
      width: 100%;
    }

    .flex {
      width: 100%;
      display: flex;
      justify-content: space-between;
    }
  }
}
</style>
