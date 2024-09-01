<script setup>
import { ref, nextTick } from 'vue'
import ChannelSelect from '@/views/article/components/ChannelSelect.vue'
import { Plus } from '@element-plus/icons-vue'
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css'
import { artEditService, artGetDetailService, artPublishService } from '@/api/article.js'
import { ElMessage } from 'element-plus'
import { baseURL } from '@/utils/request.js'
import axios from 'axios'

// 表单数据
const defaultForm = ref({
  title: '', // 标题
  cate_id: '', // 分类 ID
  cover_img: '', // 封面图片
  content: '', //内容
  state: '' // 状态
})
const formModel = ref({
  ...defaultForm.value
})
const rules = {
  title: [
    { required: true, message: '标题不能为空', trigger: 'change' },
    {
      min: 2,
      max: 10,
      message: '标题的长度需要为 2-10 个字符',
      trigger: 'blur'
    },
    { pattern: /\S$/, message: '标题需要为非空字符', trigger: 'blur' }
  ],
  cate_id: [{ required: true, message: '请选择文章分类', trigger: 'change' }],
  cover_img: [{ required: true, message: '请选择文章封面', trigger: 'change' }],
  content: [{ required: true, message: '文章内容不能为空', trigger: 'change' }]
}

// 图片上传
const imgUrl = ref('')
const onSelectFile = (uploadFile) => {
  imgUrl.value = URL.createObjectURL(uploadFile.raw)
  formModel.value.cover_img = uploadFile.raw
}

// 发布文章
const formRef = ref()
const emit = defineEmits(['success'])
const onPublish = async (state) => {
  await formRef.value.validate()

  loading.value = true
  formModel.value.state = state
  const formData = new FormData()
  for (let key in formModel.value) {
    formData.append(key, formModel.value[key])
  }

  // 根据不同操作发送请求
  if (formModel.value.id) {
    // 编辑操作
    await artEditService(formData)
    ElMessage.success('修改成功')
    visibleDrawer.value = false
    emit('success', 'edit')
  } else {
    // 添加操作
    await artPublishService(formData)
    ElMessage.success('添加成功')
    visibleDrawer.value = false
    emit('success', 'add')
  }
  loading.value = false
}

// 控制抽屉
const loading = ref(false)
const visibleDrawer = ref(false)
const editorRef = ref()

const open = async (row) => {
  visibleDrawer.value = true
  await nextTick(() => {
    // 清空表单数据
    formRef.value.resetFields()
    imgUrl.value = ''

    editorRef.value.setHTML('')
  })

  if (row.id) {
    // 编辑文章
    loading.value = true
    const res = await artGetDetailService(row.id)
    formModel.value = res.data
    // 处理图片 URL
    imgUrl.value = baseURL + formModel.value.cover_img
    formModel.value.cover_img = await imageUrlToFile(imgUrl.value, formModel.value.cover_img)
    loading.value = false
  }
}

// 将网络图片地址转换为 File 对象
async function imageUrlToFile(url, fileName) {
  try {
    // 第一步：使用axios获取网络图片数据
    const response = await axios.get(url, { responseType: 'arraybuffer' })
    const imageData = response.data

    // 第二步：将图片数据转换为Blob对象
    const blob = new Blob([imageData], { type: response.headers['content-type'] })

    // 第三步：创建一个新的File对象
    const file = new File([blob], fileName, { type: blob.type })

    return file
  } catch (error) {
    ElMessage.error('将图片转换为 File 对象时发生错误:', error)
  }
}

defineExpose({
  open
})
</script>

<template>
  <!-- 抽屉 -->
  <el-drawer
    v-model="visibleDrawer"
    direction="rtl"
    size="50%"
    :title="formModel?.id ? '编辑文章' : '添加文章'"
  >
    <!-- 文章表单 -->
    <el-form
      v-loading="loading"
      :model="formModel"
      :rules="rules"
      ref="formRef"
      label-width="100px"
    >
      <el-form-item label="文章标题" prop="title">
        <el-input v-model="formModel.title" placeholder="请输入标题"></el-input>
      </el-form-item>
      <el-form-item label="文章分类" prop="cate_id">
        <channel-select v-model="formModel.cate_id" width="100%"></channel-select>
      </el-form-item>
      <el-form-item label="文章封面" prop="cover_img">
        <!-- 关闭 Element Plus 的自动上传，不需要配置 action 等参数 -->
        <!-- 本地预览图片，提交前无需上传图片 -->
        <!-- 语法：URL.createObjectURL(...) 创建本地预览的地址 -->
        <el-upload
          :auto-upload="false"
          class="avatar-uploader"
          :show-file-list="false"
          :on-change="onSelectFile"
          :on-success="handleAvatarSuccess"
        >
          <img v-if="imgUrl" :src="imgUrl" class="avatar" alt="文章封面预览" />
          <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
        </el-upload>
      </el-form-item>
      <el-form-item label="文章内容" prop="content">
        <div class="editor">
          <div class="editor">
            <quill-editor
              ref="editorRef"
              theme="snow"
              v-model:content="formModel.content"
              contentType="html"
            />
          </div>
        </div>
      </el-form-item>
      <el-form-item>
        <el-button @click="onPublish('已发布')" type="primary">发布</el-button>
        <el-button @click="onPublish('草稿')" type="info">草稿</el-button>
      </el-form-item>
    </el-form>
  </el-drawer>
</template>

<style lang="scss" scoped>
.avatar-uploader {
  :deep(.avatar) {
    width: 178px;
    height: 178px;
    display: block;
  }
  :deep(.el-upload) {
    border: 1px dashed var(--el-border-color);
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    transition: var(--el-transition-duration-fast);
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

.editor {
  width: 100%;
  :deep(.ql-editor) {
    min-height: 200px;
  }
}
</style>
