<template>
  <header>

    <nav class="navbar">
      <div class="container">
        <router-link to="/" class="navbar-brand">
          <img class="nav-link logo" src="./assets/Logo-Mini.svg" alt="Price Bin Logo">
        </router-link> 
          <div class="nav-elements">
            <p @click="doLogout" v-show="loggedIn" class="nav-link logout-btn">Cerrar Sesión</p>
            <router-link to="/myproducts"  v-show="loggedIn" class="nav-link">Mi Lista</router-link>
            <router-link to="/products" class="nav-link">Ver Productos</router-link> 
            <router-link to="/prices/add" v-show="loggedIn" class="nav-link cta">Registrar Un Producto</router-link>  
            <router-link to="/login" v-show="!loggedIn" class="nav-link">Ingresa a tu cuenta</router-link> 
            <router-link to="/register"  v-show="!loggedIn" class="nav-link cta">Únete a PriceBin</router-link>
               
          </div>
      </div>
    </nav>
  </header>
  
  <router-view/>
  
</template>

<script lang="ts">
import { User } from 'firebase/auth';
import { defineComponent, onBeforeMount, ref } from 'vue'
import { auth, logOut } from '@/services/auth';

export default defineComponent({
  setup () {
      const loggedIn = ref<boolean>(false);
      const currentEmail = ref<string | null>(null);
    onBeforeMount(() => {
        // Setup a listener that persists throughout component lifecycle
        auth.onAuthStateChanged((user:User|null) => {
            if (!user) {
                console.log("User not logged in");
                loggedIn.value = false;
            } else {
                loggedIn.value = true;
                console.log("Logged in as", user.email);
                currentEmail.value = user.email;
            }
        })
    })
    async function doLogout() {
      const res = await logOut();
      console.log(res);
    }
    return { loggedIn, currentEmail, doLogout }
  }
})
</script>
<style>
@import './styles/App.css';
</style>
