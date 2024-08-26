import { Dialog } from 'vant'
import router from '@/router'

export default {
  // 编写 Vue 组件实例的配置项，通过一定语法，直接混入到组件内部
  methods: {
    loginConfirm () {
      if (!this.$store.getters.token) {
        Dialog.confirm({
          title: '尚未登录',
          message: '需要登录后加入购物车',
          confirmButtonText: '去登录',
          cancelButtonText: '稍后再说',
          confirmButtonColor: '#0DC161'
        })
          .then(() => {
            // on confirm
            router.replace({
              path: '/login',
              query: {
                backUrl: this.$route.fullPath
              }
            })
          })
          .catch(() => {
            // on cancel
          })
        return true
      }
      return false
    }
  }
}
