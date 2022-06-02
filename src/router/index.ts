import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LogIn from '../views/LogInView.vue'
import SignUp from '../views/SignUpView.vue'
import RegisterPrice from '@/components/RegisterPrice.vue';
import NewProductView from '../views/NewProductView.vue'
import ProductListView from '../views/ProductListView.vue'
import NotFound from '../views/NotFoundView.vue'

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
    path: '/products',
    name: 'products',
    component: ProductListView
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
    name: 'add price',
    component: RegisterPrice,
    props: true,
  },
  {
    path: '/asayo',
    name: 'testing',
    component: () => import('../views/TestingView.vue')
  },
  {
    path: '/create/product',
    name: 'create Product',
    component: NewProductView
  },
  {
    path: '/product/:id',
    name: 'product',
    component: () => import ('../views/ProductView.vue')
  },
  {
    path: '/myproducts',
    name: 'my products',
    component: () => import('../views/MyProductsView.vue')
  },
  {
    path: '/profile',
    name: 'My Profile',
    component: () => import('../views/ProfileView.vue')
  },
  {	
    path: '/myproducts/history',
    name: 'get Lists',
    component: () => import('../views/MyPastLists.vue')
  },
  // catch-all
  {
    path:'/:catchAll(.*)',
    name:'404',
    component: NotFound,
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
