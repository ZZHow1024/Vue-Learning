import axios from 'axios'
import { Toast } from 'vant'
import store from '@/store'

const instance = axios.create({
  baseURL: 'https://smart-shop.itheima.net/index.php?s=/api',
  timeout: 5000,
  headers: { platform: 'H5' }
})

// 添加请求拦截器
instance.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  // 开启 loading 效果，禁止背景点击
  Toast.loading({
    message: '正在载入',
    forbidClick: true,
    loadingType: 'spinner',
    duration: 0
  })

  // 只要有 token，就在请求时携带 token，便于请求需要授权的接口
  const token = store.getters.token
  if (token) {
    config.headers['Access-Token'] = token
  }

  return config
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error)
})

// 添加响应拦截器
instance.interceptors.response.use(function (response) {
  // 2xx 范围内的状态码都会触发该函数。
  // 对响应数据做点什么
  // 统一处理状态码不是 200 的响应
  const res = response.data
  if (res.status !== 200) {
    Toast.fail(res.message)
    return Promise.reject(res.message)
  } else {
    // 正常情况，清除 loading 效果
    Toast.clear()
  }

  return response.data
}, function (error) {
  // 超出 2xx 范围的状态码都会触发该函数。
  // 对响应错误做点什么
  return Promise.reject(error)
})

export default instance
