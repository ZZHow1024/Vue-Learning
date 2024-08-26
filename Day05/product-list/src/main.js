import Vue from 'vue'
import App from './App.vue'

import MyTag from './components/MyTag.vue'

Vue.component('MyTag', MyTag)
Vue.config.productionTip = false
Vue.directive('focus', {
  "inserted" (el) {
    el.focus();
  }
});

new Vue({
  render: h => h(App),
}).$mount('#app')
