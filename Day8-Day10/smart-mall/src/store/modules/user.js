import { getInfo, removeInfo, setInfo } from '@/utils/storage'

export default {
  namespaced: true,
  state () {
    return {
      // 个人权证相关数据
      userInfo: getInfo()
    }
  },

  mutations: {
    setUserInfo (state, userInfo) {
      setInfo(userInfo)
      state.userInfo = userInfo
    },
    clearUserInfo (state) {
      removeInfo()
      state.userInfo = getInfo()
    }
  },

  actions: {
    // 退出登录
    logout (context) {
      // 个人信息重置
      context.commit('clearUserInfo')

      // 购物车信息重置
      context.commit('cart/clearCartList', null, { root: true })
    }
  },

  getters: {}
}
