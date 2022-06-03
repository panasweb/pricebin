<template>
  <n-message-provider>
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
            <div v-show="loggedIn">
              <router-link v-if="isVerified()" to="/prices/add" class="nav-link cta">Registrar Un Producto</router-link>
              <div v-else class="nav-link cta" style="cursor: pointer;" @click="doShowModal">Registrar Un Producto</div>
            </div>
            <router-link to="/login" v-show="!loggedIn" class="nav-link">Ingresa a tu cuenta</router-link>
            <router-link to="/register" v-show="!loggedIn" class="nav-link cta">Únete a PriceBin</router-link>
            <router-link to="/profile" v-show="loggedIn" class="nav-link img-container">
              <img :src="avatar" alt="Avatar">
            </router-link>
          </div>
        </div>
      </nav>
    </header>
    <UnverifiedUserModal v-model:show="showModal" @close="onCloseModal"/>
    <router-view />
  </n-message-provider>
</template>

<script setup lang="ts">
import { User } from 'firebase/auth';
import { inject, onBeforeMount, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router';
import { auth, logOut } from '@/services/auth';
import IStore from './types/IStore';
import UserManager from './models/UserManager';
import CurrencySelect from './components/CurrencySelect.vue';
import { NMessageProvider } from 'naive-ui';
import UnverifiedUserModal from './components/UnverifiedUserModal.vue';
import { DEFAULT_AVI } from '@/utils/constants';

const loggedIn = ref<boolean>(false);
const currentEmail = ref<string | null>(null);
const avatar = ref<string>(DEFAULT_AVI);
const store: IStore | undefined = inject('store');
const router = useRouter();
const showModal = ref(false);

console.log("Store in App.vue")
console.dir(store);

function isVerified(): boolean {
  return store?.currentUser?.verified || false;
}

function onCloseModal(): void {
  showModal.value = false
}

function doShowModal() {
  showModal.value = true;
}

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
      if(currentUser?.avatar) {
        avatar.value = currentUser.avatar;
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
  router.push({ name: "login" });
}

</script>
<style>
@import './styles/App.css';

.img-container{
    display: inline-block;
    padding: 0.5rem;
    border-radius: 50%;
    background-color: #ffffff;
}

.img-container img{
    width: 80%;
}
</style>
