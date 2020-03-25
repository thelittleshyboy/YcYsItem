// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import '@/style/index.css'
import ElementUI from 'element-ui'
import echarts from 'echarts/lib/echarts'
import 'echarts/lib/chart/line';
import 'element-ui/lib/theme-chalk/index.css'
import store from './store/store.js'
import * as filters from './filters/index' // global filters

Vue.use(ElementUI)
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})
Vue.config.productionTip = false
Vue.prototype.$echarts = echarts

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
