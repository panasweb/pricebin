import { createApp, provide } from 'vue'
import App from './App.vue'
import router from './router'
import store from '@/state/store'

createApp(App).use(router).provide('store', store).mount('#app')
