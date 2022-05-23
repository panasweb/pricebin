<template>
    <div>
        <p v-if="loggedIn">Logged in as {{ currentEmail }}</p>
        <p v-else>No current user</p>
        <div class="">
            <button>
                <span v-show="loggedIn" @click="doLogout">Log out</span>
                <span v-show="!loggedIn" @click="doLogin">Log in</span>
            </button>
        </div>
        <h1>Products CRUD</h1>
        <div class="">
            <RegisterPrice />
        </div>
        <div>
            Hello products
            <div class="price-container">
                <ProductCardSquare v-for="p in products" :key="p.name" :product="p" />
            </div>
            <n-button @click="setCurrency" color="#f76d66">
                <template #icon>
                    <n-icon>
                        <cash/>
                    </n-icon>
                    
                </template>
                Set currency
            </n-button>
        </div>

        <div>
            <h1>Currency converter</h1>
             <n-space vertical>
                <n-select v-model:value="currency" :options="CURRENCY_OPTIONS"/>
                <h1>{{currency}}</h1>
            </n-space>
        </div>
    </div>
</template>

<script setup lang="ts">
import {NSpace, NSelect, NButton, NIcon} from 'naive-ui';
import { CurrencyExchangeOutlined as cash } from '@vicons/material';
import { onBeforeMount, onMounted, ref } from 'vue';
import ProductManager from '@/models/ProductManager';
import UserManager from '@/models/UserManager';
import { auth, logIn, logOut } from '../services/auth';
import { Product } from '@/types/interfaces/Product';
import ProductCardSquare from '@/components/ProductCardSquare.vue';
import RegisterPrice from '@/components/RegisterPrice.vue';
import {CURRENCY_OPTIONS} from '../utils/constants';
import {inject} from 'vue';
import IStore from '@/types/IStore';
const store:IStore | undefined = inject("store")
const loggedIn = ref<boolean>(false);
const currentEmail = ref<string | null>(null);
const products = ref<Product[]>([]);
const currency = ref<string>(store!.currency);
async function fetchProducts() {
    let products_ = await ProductManager.getAll();
    products.value = products_;
}

onBeforeMount(() => {
    // Setup a listener that persists throughout component lifecycle
    auth.onAuthStateChanged((user) => {
        if (!user) {
            loggedIn.value = false;
        } else {
            loggedIn.value = true;
            currentEmail.value = user.email;
        }
    })
})

async function setCurrency(){
    let newCurrency = await UserManager.getCurrency(currency.value);
    if (store?.setCurrency){
        store.setCurrency(currency.value)
        store.setCurrencyRate(newCurrency)
        console.log("Currency rate",store.currencyRate)
    }
}



onMounted(async () => {

    await fetchProducts();
})

async function doLogout() {
    console.log('logging out...')
    const res = await logOut();
    console.log(res);
}

async function doLogin() {
    console.log('logging in...');
    const res = await logIn('ericjardon@hotmail.com', '123456');
    console.log(res);
}

</script>

<style scoped>
</style>