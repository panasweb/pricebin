import { createApp, provide } from 'vue'
import App from './App.vue'
import router from './router'
import store from '@/state/store'

console.log("Store", store);

createApp(App).provide('store', store).use(router).mount('#app')
