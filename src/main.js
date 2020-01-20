import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import FastClick from 'fastclick';

import toast from 'components/common/toast'

Vue.config.productionTip = false

// 实例化一个事件总线
Vue.prototype.$bus = new Vue()

//安装 toast 插件
Vue.use(toast)

//解决移动端300ms延迟
FastClick.attach(document.body)

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
