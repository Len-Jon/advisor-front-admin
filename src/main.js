import Vue from 'vue'
import App from './App.vue'
import router from './components/router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';
import axios from 'axios'
// 引入echarts
import echarts from 'echarts'
Vue.prototype.$echarts = echarts

axios.defaults.baseURL = "api/"
axios.defaults.withCredentials = true;
axios.interceptors.response.use(value => value.data)
Vue.prototype.$http = axios

Vue.use(ElementUI)

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
