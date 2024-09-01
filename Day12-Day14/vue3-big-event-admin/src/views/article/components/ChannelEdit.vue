<script setup>
import { ref } from 'vue'
import { artAddChannelService, artEditChannelService } from '@/api/article.js'
import { ElMessage } from 'element-plus'

const dialogVisible = ref(false)
const open = (row) => {
  formModel.value = { ...row }
  dialogVisible.value = true
}
defineExpose({ open })

const formModel = ref({
  cate_name: '',
  cate_alias: ''
})
const rules = ref({
  cate_name: [
    {
      required: true,
      message: '分类名称不能为空',
      trigger: 'change'
    },
    {
      pattern: /\S{1,10}$/,
      message: '分类名需要为 1-10 个非空字符',
      trigger: 'blur'
    }
  ],
  cate_alias: [
    {
      required: true,
      message: '分类别名不能为空',
      trigger: 'change'
    },
    {
      pattern: /^[a-zA-Z0-9]{1,15}$/,
      message: '分类别名需要为 1-15 个字母或数字',
      trigger: 'blur'
    }
  ]
})

const formRef = ref()
const emit = defineEmits(['success'])
const onSubmit = async () => {
  await formRef.value.validate()
  const isEdit = formModel.value?.id
  if (isEdit) {
    await artEditChannelService(formModel.value)
    ElMessage.success('添加成功')
  } else {
    await artAddChannelService(formModel.value)
    ElMessage.success('修改成功')
  }
  dialogVisible.value = false
  emit('success')
}
</script>

<template>
  <el-dialog
    v-model="dialogVisible"
    :title="formModel.id ? '编辑分类' : '添加分类'"
    width="500"
    draggable
  >
    <el-form :model="formModel" :rules="rules" ref="formRef">
      <el-form-item label="分类名称" prop="cate_name">
        <el-input v-model="formModel.cate_name">请输入分类名称</el-input>
      </el-form-item>
      <el-form-item label="分类别名" prop="cate_alias">
        <el-input v-model="formModel.cate_alias" @keydown.enter="onSubmit">请输入分类名称</el-input>
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="onSubmit">确定</el-button>
      </div>
    </template>
  </el-dialog>
</template>
