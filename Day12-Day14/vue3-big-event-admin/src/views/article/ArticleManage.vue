<script setup>
import { onMounted, ref } from 'vue'
import PageContainer from '@/components/PageContainer.vue'
import { Delete, Edit } from '@element-plus/icons-vue'
import ChannelSelect from './components/ChannelSelect.vue'
import { artDeleteService, artGetListService } from '@/api/article.js'
import { formatTime } from '@/utils/format.js'
import ArticleEdit from '@/views/article/components/ArticleEdit.vue'

// 文章列表
const loading = ref(false)
const articleList = ref([])
const total = ref(0)
const getArticleList = async () => {
  loading.value = true
  const res = await artGetListService(params.value)
  articleList.value = res.data
  total.value = res.total
  loading.value = false
}
onMounted(() => {
  getArticleList()
})

// 处理分页
const onSizeChange = (size) => {
  params.value.pagenum = 1
  params.value.pagesize = size
  getArticleList()
}
const onCurrentChange = (page) => {
  params.value.pagenum = page
  getArticleList()
}

// 搜索按钮
const onSearch = () => {
  params.value.pagenum = 1
  getArticleList()
}

// 重置按钮
const onReset = () => {
  if (params.value.cate_id === '' && params.value.state === '') return
  params.value.pagenum = 1
  params.value.cate_id = ''
  params.value.state = ''
  getArticleList()
}

const articleEditRef = ref()
// 添加文章
const onAddArticle = () => {
  articleEditRef.value.open({})
}
// 编辑文章
const onEditArticle = (row) => {
  articleEditRef.value.open(row)
}
// 添加/编辑文章成功
const onSuccess = (type) => {
  if (type === 'add') {
    params.value.pagenum = Math.ceil((total.value + 1) / params.value.pagesize)
  }
  getArticleList()
}

// 删除文章
const onDeleteArticle = async (row) => {
  ElMessageBox.confirm('即将删除该文章', '提示', {
    type: 'warning',
    confirmButtonText: '确认',
    cancelButtonText: '取消'
  })
    .then(async () => {
      await artDeleteService(row.id)
      ElMessage.success('删除成功')
      getArticleList()
    })
    .catch(() => {})
}

// 请求参数对象
const params = ref({
  pagenum: 1,
  pagesize: 5,
  cate_id: '',
  state: ''
})
</script>

<template>
  <page-container title="文章管理">
    <template #extra>
      <el-button type="primary" @click="onAddArticle">添加文章</el-button>
    </template>
    <!-- 表单区域 -->
    <el-form inline>
      <el-form-item label="文章分类">
        <channel-select @change="onSearch" v-model="params.cate_id" />
      </el-form-item>
      <el-form-item label="文章发布状态">
        <el-select @change="onSearch" clearable style="width: 100px" v-model="params.state">
          <el-option label="已发布" value="已发布"> </el-option>
          <el-option label="草稿" value="草稿"> </el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSearch">搜索</el-button>
        <el-button @click="onReset">重置</el-button>
      </el-form-item>
    </el-form>

    <!-- 表格区域 -->
    <el-table :data="articleList" v-loading="loading">
      <el-table-column label="文章标题" prop="title" align="center">
        <template #default="{ row }">
          <el-link @click="onEditArticle(row)" type="primary" :underline="false">
            {{ row.title }}
          </el-link>
        </template>
      </el-table-column>
      <el-table-column label="分类" prop="cate_name" align="center"></el-table-column>
      <el-table-column label="发表时间" prop="pub_date" align="center">
        <template #default="{ row }">
          {{ formatTime(row.pub_date) }}
        </template>
      </el-table-column>
      <el-table-column label="状态" prop="state" align="center"></el-table-column>
      <el-table-column label="操作" align="center">
        <template #default="{ row }">
          <el-button plain type="primary" :icon="Edit" @click="onEditArticle(row)"></el-button>
          <el-button plain type="danger" :icon="Delete" @click="onDeleteArticle(row)"></el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页区域 -->
    <el-pagination
      v-model:current-page="params.pagenum"
      v-model:page-size="params.pagesize"
      :page-sizes="[2, 3, 5, 10]"
      :background="true"
      layout="jumper, total, sizes, prev, pager, next"
      :total="total"
      @size-change="onSizeChange"
      @current-change="onCurrentChange"
      style="margin-top: 20px; justify-content: center"
    />

    <!-- 添加/编辑抽屉 -->
    <ArticleEdit @success="onSuccess" ref="articleEditRef" />
  </page-container>
</template>

<style scoped></style>
