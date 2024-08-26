// 约定通用键名
const INFO_KEY = 'smart_mall_info'
const HISTORY_KEY = 'smart_mall_history_list'

const defaultObj = {
  token: '',
  userId: ''
}

// 获取个人信息
export const getInfo = () => {
  const result = localStorage.getItem(INFO_KEY)

  return result ? JSON.parse(result) : defaultObj
}

// 设置个人信息
export const setInfo = (obj) => {
  localStorage.setItem(INFO_KEY, JSON.stringify(obj))
}

// 移除个人信息
export const removeInfo = () => {
  localStorage.removeItem(INFO_KEY)
}

// 获取搜索历史
export const getHistoryList = () => {
  const res = localStorage.getItem(HISTORY_KEY)

  return res ? JSON.parse(res) : []
}

// 设置搜索历史
export const setHistoryList = (obj) => {
  localStorage.setItem(HISTORY_KEY, JSON.stringify(obj))
}

// 清除搜索历史
export const removeHistoryList = () => {
  localStorage.removeItem(HISTORY_KEY)
}
