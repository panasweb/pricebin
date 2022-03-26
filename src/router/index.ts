import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LogIn from '../views/LogInView.vue'
import SignUp from '../views/SignUpView.vue'
import NewPrice from '../views/NewPriceView.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('../views/AboutView.vue')
  },
  {
    path: '/register',
    name: 'register',
    component: SignUp,
  },
  {
    path: '/login',
    name: 'login',
    component: LogIn,
  },
  {
    path: '/prices/add',
    name: 'Add Price',
    component: LogIn,
  },
  {
    path: '/asayo',
    name: 'testing',
    component: () => import('../views/TestingView.vue')
  },
  {
    path: '/product',
    name: 'product',
    component: () => import ('../views/ProductView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
