<template>
    <div>
        <div class="search-container">
            <div class="search-label">
            <h4>Busca por nombre</h4>
            </div>
            <n-input size="large" placeholder="Nombre de producto:" 
            v-model:value="searchValue"
            :loading="isLoading"
            @keyup.enter="handleSearch" >
                <template #prefix>
                    <n-icon :component="SearchOutlined" />
                </template>
            </n-input>
        </div>
        <div class="price-container">
            <ProductCardSquare v-for="p in products" :key="p.name" :product="p" />
        </div>
    </div>
</template>

<script setup lang="ts">
import { onBeforeMount, onMounted, ref } from 'vue'
import ProductCardSquare from '../components/ProductCardSquare.vue'
import { Product } from '@/types/interfaces/Product';
import ProductManager from '@/models/ProductManager';
import { SearchOutlined } from '@vicons/material'
import {NInput, NIcon} from "naive-ui"

const searchValue = ref<string>("");
const isLoading = ref<boolean>(false);
const products = ref<Product[]>([]);

async function fetchProducts() {
    isLoading.value = true;
    products.value = await ProductManager.getAll();
    isLoading.value = false;
}

async function handleSearch(e: Event) {
    isLoading.value = true;
    console.log("Search:", searchValue.value);
    products.value = await ProductManager.searchProducts(searchValue.value);
    isLoading.value = false;
}

onBeforeMount(() => {
    fetchProducts();
})


</script>

<style>
.price-container {
    width: 100%;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    padding: 20px 80px;
}

.search-container {
    padding: 10vh 30vw;
}

.search-label {
    margin-bottom: 10px;
}

@media(max-width:426px) {
    .price-container {
        padding: 0;
        flex-direction: column;
        justify-content: center;
        flex-wrap: nowrap;
        align-items: center;
    }
}
</style>