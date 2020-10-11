import Vue from 'vue'
import VueRouter from 'vue-router'

const Admin = () => import('../admin/Admin.vue')
const Login = () => import('../Login.vue')
const Account = () => import('../account/Account.vue')
const User = () => import('../user/User.vue')
const Statistic = () => import('../statistic/Statistic.vue')
const Advisor = () => import('../advisor/Advisor.vue')
const Design = () => import('../design/Design.vue')

Vue.use(VueRouter)

// 解决ElementUI导航栏中的vue-router在3.0版本以上重复点菜单报错问题
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

const routes = [
  { path: '/', redirect: '/login' },
  { path: '/login', component: Login },
  {
    path: '/admin', component: Admin, children: [
      { path: 'statistic', component: Statistic },
      { path: 'account', component: Account },
      { path: 'advisor', component: Advisor },
      { path: 'design', component: Design },
    ]
  },
  { path: '/user', component: User, children: [] }

]

const router = new VueRouter({
  routes
})

export default router