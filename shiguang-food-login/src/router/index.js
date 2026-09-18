import { createRouter, createWebHashHistory } from 'vue-router'
import LoginView from '../views/LoginView.vue'
import RegisterView from '../views/RegisterView.vue'
import ForgotView from '../views/ForgotView.vue'
import HomeView from '../views/HomeView.vue'
import { isLoggedIn } from '../store.js'

const routes = [
  { path: '/', redirect: '/login' },
  { path: '/login', name: 'login', component: LoginView },
  { path: '/register', name: 'register', component: RegisterView },
  { path: '/forgot', name: 'forgot', component: ForgotView },
  { path: '/home', name: 'home', component: HomeView }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

// 路由守卫：未登录访问 /home 时跳回登录页
router.beforeEach((to) => {
  if (to.name === 'home' && !isLoggedIn()) {
    return { name: 'login' }
  }
})

export default router
