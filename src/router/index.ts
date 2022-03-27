import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LogIn from '../views/LogInView.vue'
import SignUp from '../views/SignUpView.vue'
import NewPrice from '../views/NewPriceView.vue'
import ProductListView from '../views/ProductListView.vue'

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
    name: 'Add Price',
    component: NewPrice,
    props: route => ({
      productName: route.query.productName,
      brandName: route.query.brandName,
      productType: route.query.productType,
      productId: route.query.productId
    })
  },
  {
    path: '/asayo',
    name: 'testing',
    component: () => import('../views/TestingView.vue')
  },
  {
    path: '/product/:id',
    name: 'product',
    component: () => import ('../views/ProductView.vue')
  },
  {
    path: '/myproducts',
    name: 'My products',
    component: () => import('../views/MyProductsView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
