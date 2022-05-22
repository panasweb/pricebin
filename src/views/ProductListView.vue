<template>
    <div>
        <div>
            <h3>Busca por Nombre:</h3>
            <n-input placeholder="Flash">
                <template #prefix>
                    <n-icon :component="PriceChangeFilled" />
                </template>
            </n-input>
        </div>
        <div class="price-container">
            <ProductCardSquare v-for="p in products" :key="p.name" :product="p" />
        </div>
    </div>
</template>

<script setup lang="ts">
import { defineComponent, onBeforeMount, onMounted, ref } from 'vue'
import ProductCardSquare from '../components/ProductCardSquare.vue'
import { Product } from '@/types/interfaces/Product';
import ProductManager from '@/models/ProductManager';
import { DeleteForeverRound, PriceChangeFilled } from '@vicons/material'
import {NInput, NIcon} from "naive-ui"

const products = ref<Product[]>([]);

async function fetchProducts() {
    products.value = await ProductManager.getAll();
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