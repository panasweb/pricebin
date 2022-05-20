<template>
  <header>

    <nav class="navbar">
      <div class="container">
        <router-link to="/" class="navbar-brand">
          <img class="nav-link logo" src="./assets/Logo-Mini.svg" alt="Price Bin Logo">
        </router-link>
        <div class="nav-elements">
          <p @click="doLogout" v-show="loggedIn" class="nav-link logout-btn">Cerrar Sesión</p>
          <router-link to="/myproducts" v-show="loggedIn" class="nav-link">Mi Lista</router-link>
          <router-link to="/products" class="nav-link">Ver Productos</router-link>
          <router-link to="/prices/add" v-show="loggedIn" class="nav-link cta">Registrar Un Producto</router-link>
          <router-link to="/login" v-show="!loggedIn" class="nav-link">Ingresa a tu cuenta</router-link>
          <router-link to="/register" v-show="!loggedIn" class="nav-link cta">Únete a PriceBin</router-link>

        </div>
      </div>
    </nav>
  </header>

  <router-view />

</template>

<script setup lang="ts">
import { User } from 'firebase/auth';
import { User as MongoUser } from '@/types/interfaces/User'
import { inject, onBeforeMount, onMounted, ref } from 'vue'
import { auth, logOut } from '@/services/auth';
import IStore from './types/IStore';
import ProductManager from './models/ProductManager';
import UserManager from './models/UserManager';

const loggedIn = ref<boolean>(false);
const currentEmail = ref<string | null>(null);
const store: IStore | undefined = inject('store');

console.log("Store in App.vue")
console.dir(store);

onBeforeMount(() => {
  // Setup a listener that persists throughout component lifecycle
  auth.onAuthStateChanged(async (user: User | null) => {
    if (!user) {
      console.log("User not logged in");
      loggedIn.value = false;
      if (store?.setCurrentUser) {
        store.setCurrentUser(null);
      }

    } else {
      loggedIn.value = true;
      console.log("Logged in as", user.email);
      currentEmail.value = user.email;
      const currentUser = await UserManager.getByEmail(user.email!);
      if (store?.setCurrentUser) {
        store.setCurrentUser(currentUser);
      }
    }
  })
})

onMounted(() => {
  console.log("App.vue Mounted!");
})

async function doLogout() {
  const res = await logOut();
  console.log(res);
}

</script>
<style>
@import './styles/App.css';
</style>
