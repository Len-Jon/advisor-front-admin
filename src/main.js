import Vue from 'vue'
import App from './App.vue'
import router from './components/router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';
import axios from 'axios'

axios.defaults.baseURL = "http://47.100.90.111:8088/"
axios.defaults.withCredentials = true;
axios.interceptors.response.use(value => value.data)
Vue.prototype.$http = axios

Vue.use(ElementUI)

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
