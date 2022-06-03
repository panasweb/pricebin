<template>
    <div>
        <p v-if="loggedIn">Logged in as {{ currentEmail }}</p>
        <p v-else>No current user</p>
        <div v-show="loggedIn">
            <p>Is verified? {{isVerified()}}</p>
        </div>
        <div class="">
            <button>
                <span v-show="loggedIn" @click="doLogout">Log out</span>
                <span v-show="!loggedIn" @click="doLogin">Log in as ericjardon@hotmail.com</span>
            </button>
        </div>
        <div>
            <button @click="getAllUsers">Get users</button>
            <div v-for="(user, u) in users" :key="u"  class="row">
                <div class="dummy-container">
                    <div class="user-card">
                        <h1>{{user.email}}</h1>
                        <button @click="deleteUser(user)">X</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { NSpace, NSelect, NButton, NIcon } from 'naive-ui';
import { CurrencyExchangeOutlined as cash } from '@vicons/material';
import { User } from "../types/interfaces/User"
import { onBeforeMount, onMounted, ref } from 'vue';
import ProductManager from '@/models/ProductManager';
import UserManager from '@/models/UserManager';
import { auth, logIn, logOut } from '../services/auth';
import { Product } from '@/types/interfaces/Product';
import ProductCardSquare from '@/components/ProductCardSquare.vue';
import RegisterPrice from '@/components/RegisterPrice.vue';
import { CURRENCY_OPTIONS } from '../utils/constants';
import { inject } from 'vue';
import IStore from '@/types/IStore';
import CurrencySelect from '@/components/CurrencySelect.vue'

const store: IStore | undefined = inject("store")
const users = ref<User[]>([]);
const loggedIn = ref<boolean>(false);
const currentEmail = ref<string | null>(null);
const products = ref<Product[]>([]);
const currency = ref<string>(store!.currency);
async function fetchProducts() {
    let products_ = await ProductManager.getAll();
    products.value = products_;
}
function isVerified() : boolean {
  return store?.currentUser?.verified || false;
}
const showModal = ref<boolean>(true);
const toggleModal = () => {
  showModal.value = !showModal.value
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

async function getAllUsers(){
    users.value = await UserManager.getAll();
    console.log(users.value)
}

async function deleteUser(user){
    console.log(user._id)
    const deletedUser = await UserManager.deleteByID(user._id)
    console.log(deletedUser)
}

async function setCurrency() {
    let newCurrency = await UserManager.getCurrency(currency.value);
    if (store?.setCurrency && store?.setCurrencyRate) {
        store.setCurrency(currency.value)
        store.setCurrencyRate(newCurrency)
        console.log("Currency rate", store.currencyRate)
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

.dummy-container {
    height: 350px;
    width: 300px;
}

.user-card {
    position: absolute;
    width: 300px;
    height: auto;
    border-radius: 25px;
    background-color: white;
    box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
    margin-top: 10px;
    transition: all 0.2s ease-out;
}
</style>