<script setup>
import PageContainer from '@/components/PageContainer.vue'
import { ref, onMounted } from 'vue'
import { artDeleteChannelService, artGetChannelsService } from '@/api/article.js'
import { Delete, Edit } from '@element-plus/icons-vue'
import ChannelEdit from '@/views/article/components/ChannelEdit.vue'
import { ElMessage } from 'element-plus'

const channelList = ref([])
const loading = ref(false)
const getChannelList = async () => {
  loading.value = true
  const res = await artGetChannelsService()
  channelList.value = res.data
  loading.value = false
}
onMounted(() => {
  getChannelList()
})

const dialog = ref()
const onEditChannel = (row) => {
  dialog.value.open(row)
}
const onAddChannel = () => {
  dialog.value.open({})
}
const handleSuccess = () => {
  getChannelList()
}

const onDeleteChannel = (row) => {
  ElMessageBox.confirm('即将删除该分类', '提示', {
    type: 'warning',
    confirmButtonText: '确认',
    cancelButtonText: '取消'
  })
    .then(async () => {
      await artDeleteChannelService(row.id)
      ElMessage.success('删除成功')
      getChannelList()
    })
    .catch(() => {})
}
</script>

<template>
  <ChannelEdit ref="dialog" @success="handleSuccess" />
  <page-container title="文章分类">
    <template #extra>
      <el-button type="primary" @click="onAddChannel"> 添加分类 </el-button>
    </template>
    <el-table
      v-loading="loading"
      :data="channelList"
      stripe
      style="width: 100%"
      header-align="center"
    >
      <el-table-column align="center" type="index" label="序号" width="100" />
      <el-table-column align="center" prop="cate_name" label="分类名称" />
      <el-table-column align="center" prop="cate_name" label="分类别名" />
      <el-table-column align="center" prop="address" label="操作" width="200">
        <template #default="{ row, $index }">
          <el-button type="primary" :icon="Edit" @click="onEditChannel(row, $index)" />
          <el-button type="danger" :icon="Delete" @click="onDeleteChannel(row, $index)" />
        </template>
      </el-table-column>

      <template #empty>
        <el-empty description="暂无数据" />
      </template>
    </el-table>
  </page-container>
</template>

<style lang="scss" scoped></style>
