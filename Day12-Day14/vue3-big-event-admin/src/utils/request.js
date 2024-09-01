import axios from 'axios'
import { useUserStore } from '@/stores/index.js'
import { ElMessage } from 'element-plus'
import router from '@/router/index.js'

const baseURL = 'https://big-event-vue-api-t.itheima.net'

const request = axios.create({
  baseURL,
  timeout: 10000
})

// 添加请求拦截器
request.interceptors.request.use(
  function (config) {
    // 在发送请求之前做些什么
    const userStore = useUserStore()
    if (userStore.token) {
      config.headers.Authorization = userStore.token
    }
    return config
  },
  function (error) {
    // 对请求错误做些什么
    return Promise.reject(error)
  }
)

// 添加响应拦截器
request.interceptors.response.use(
  function (response) {
    // 2xx 范围内的状态码都会触发该函数。
    // 对响应数据做点什么
    return response.data
  },
  function (error) {
    // 超出 2xx 范围的状态码都会触发该函数。
    // 对响应错误做点什么
    if (error.response?.status === 401) {
      router.push('/login')
    }

    ElMessage.error(error.response.data.message || '服务异常')
    return Promise.reject(error)
  }
)

export default request
export { baseURL }
