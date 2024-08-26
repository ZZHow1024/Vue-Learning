import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '@/utils/vant-ui'
import '@/styles/common.less'
import NoticeBoard from '@/components/NoticeBoard.vue'

Vue.config.productionTip = false

Vue.component('notice-board', NoticeBoard)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
