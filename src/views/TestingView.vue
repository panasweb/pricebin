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
            <AddProduct />
        </div>
        <div>
            Hello products
            <div class="price-container">
                <ProductCardSquare v-for="p in products" :key="p.name" :product="p" />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { onBeforeMount, onMounted, ref } from 'vue'
import ProductManager from '@/models/ProductManager';
import { auth, logIn, logOut } from '../services/auth';
import { Product } from '@/types/interfaces/Product';
import ProductCardSquare from '@/components/ProductCardSquare.vue';
import AddProduct from '@/components/AddProduct.vue';

const loggedIn = ref<boolean>(false);
const currentEmail = ref<string | null>(null);
const products = ref<Product[]>([]);
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