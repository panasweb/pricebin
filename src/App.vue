<template>
<header>

  <nav class="navbar">
    <div class="container">
      <router-link to="/" class="navbar-brand">
        <img class="nav-link logo" src="./assets/Logo-Mini.svg" alt="Price Bin Logo">
      </router-link> 
        <div class="nav-elements">
          <router-link to="/products" class="nav-link">Ver Productos</router-link> 
          <router-link to="/login" v-if="!loggedIn" class="nav-link">Login</router-link> 
          <router-link to="/register"  v-if="!loggedIn" class="nav-link cta">Unete a PriceBin</router-link>
          <router-link to="/myproducts"  v-else class="nav-link cta">Ver mis productos</router-link>
        </div>
    </div>
  </nav>
</header>
    <router-view/>
  
</template>

<script lang="ts">
import { defineComponent, onBeforeMount, ref } from 'vue'
import {auth, logIn, logOut} from './firebase/auth';

export default defineComponent({
  setup () {
      const loggedIn = ref<boolean>(false);
      const currentEmail = ref<string | null>(null);
    onBeforeMount(() => {
        // Setup a listener that persists throughout component lifecycle
        auth.onAuthStateChanged(user => {
            if (!user) {
                loggedIn.value = false;
            } else {
                loggedIn.value = true;
                currentEmail.value = user.email;
            }
        })
    })
    return { loggedIn, currentEmail}
  }
})
</script>
<style>
@import './styles/App.css';
</style>
