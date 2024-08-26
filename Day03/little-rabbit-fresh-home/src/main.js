import Vue from 'vue'
import App from './App.vue'
import './styles/base.css' // css 样式重置
import './styles/common.css' // 公共全局样式
import './assets/iconfont/iconfont.css' // 字体图标的样式

import BaseGoodItem from "@/components/BaseGoodItem.vue"; // 好物展示框
import BaseBrandItem from "@/components/BaseBrandItem.vue"; //品牌展示框

Vue.component('BaseGoodItem', BaseGoodItem);
Vue.component('BaseGoodItem', BaseGoodItem);
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
