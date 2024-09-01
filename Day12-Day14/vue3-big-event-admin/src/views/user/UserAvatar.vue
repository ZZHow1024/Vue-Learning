<script setup>
import { ref } from 'vue'
import PageContainer from '@/components/PageContainer.vue'
import { Plus, Upload } from '@element-plus/icons-vue'
import { useUserStore } from '@/stores/index.js'
import { userUpdateAvatarService } from '@/api/user.js'

// 头像 URL
const userStore = useUserStore()
const imgUrl = ref(userStore.user.user_pic)

// 选择图片
const uploadRef = ref()
const onSelectFile = (uploadFile) => {
  //imgUrl.value = URL.createObjectURL(uploadFile.raw)
  // 基于 FileReader 读取图片做预览
  const fileReader = new FileReader()
  fileReader.readAsDataURL(uploadFile.raw)
  fileReader.onload = () => {
    imgUrl.value = fileReader.result
  }
}

// 上传图片
const onUpload = async () => {
  await userUpdateAvatarService(imgUrl.value)
  await userStore.getUser()
  ElMessage.success('上传成功')
}
</script>

<template>
  <PageContainer title="更换头像">
    <el-upload
      ref="uploadRef"
      :auto-upload="false"
      class="avatar-uploader"
      :show-file-list="false"
      :on-change="onSelectFile"
      :on-success="handleAvatarSuccess"
    >
      <img v-if="imgUrl" :src="imgUrl" class="avatar" alt="用户头像预览" />
      <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
    </el-upload>
    <br />
    <el-button @click="uploadRef.$el.querySelector('input').click()" :icon="Plus" type="primary"
      >选择头像</el-button
    >
    <el-button @click="onUpload" :icon="Upload" type="success">上传头像</el-button>
  </PageContainer>
</template>

<style scoped>
.avatar-uploader {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
  width: 178px;
  height: 178px;
  display: block;

  .avatar {
    width: 178px;
    height: 178px;
  }

  :deep(.el-upload:hover) {
    border-color: var(--el-color-primary);
  }
  .el-icon.avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    text-align: center;
  }
}
</style>
