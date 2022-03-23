import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LogIn from '../components/LogIn.vue'
import SignUp from '../components/SignUp.vue'

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
    path: '/onboarding',
    name: 'onboarding',
    component: SignUp,
  },
  {
    path: '/login',
    name: 'login',
    component: LogIn,
  },
  {
    path: '/asayo',
    name: 'testing',
    component: () => import('../views/TestingView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
