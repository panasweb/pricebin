<template>
  <header>

    <nav class="navbar">
      <div class="container">
        <router-link to="/" class="navbar-brand">
          <img class="nav-link logo" src="./assets/Logo-Mini.svg" alt="Price Bin Logo">
        </router-link>
        <div class="nav-elements">
          <!-- <n-space  vertical>
              <n-select v-model:value="currency" size="small" :options="CURRENCY_OPTIONS" :theme-overrides="selectThemeOverrides"/>
          </n-space>
          <n-button @click="setCurrency" size="small" color="#f76d66">
                <div>
                  <n-icon> <cash/> </n-icon>
                  Set currency
                </div>
          </n-button> -->
          <!-- <n-space vertical>
              <n-select v-model:value="currency" :options="CURRENCY_OPTIONS" color="#f76d66"/>
          </n-space>
          <n-button @click="setCurrency" color="#f76d66">
                <template #icon>
                    <n-icon>
                        <cash/>
                    </n-icon>     
                </template>
                Set currency
          </n-button> -->
          <CurrencySelect/>
        </div>
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
import {useRouter} from 'vue-router';
import { auth, logOut } from '@/services/auth';
import IStore from './types/IStore';
import UserManager from './models/UserManager';
import CurrencySelect from './components/CurrencySelect.vue';



const loggedIn = ref<boolean>(false);
const currentEmail = ref<string | null>(null);
const store: IStore | undefined = inject('store');
const router = useRouter();
const currency = ref<string>(store!.currency);

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
  router.push({ name: "login" });
}

async function setCurrency(){
  console.log("Changing currency")
    // let newCurrency = await UserManager.getCurrency(currency.value);
    // If currency is the same, ignore
    const currentCurrency = store?.currency || "MXN"
    if (currency.value === currentCurrency) {
      console.log("Same currency, no change");
      return;
    }

    const newCurrency = await UserManager.getCurrency(currency.value);
    if (store?.setCurrency && store?.setCurrencyRate){
        store.setCurrency(currency.value)
        store.setCurrencyRate(newCurrency)
        console.log("Currency rate",store.currencyRate)
    }
}

</script>
<style>
@import './styles/App.css';
</style>
