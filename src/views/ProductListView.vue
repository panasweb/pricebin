<template>
    <div>
        <div class="search-container">
            <div class="search-label">
                <h4>Busca productos</h4>
            </div>
            <div class="searchMenu">
                <div class="filter">
                    <n-select placeholder="Cualquier tipo" :value="typeFilter" @update:value="changeHandler"
                        size="large" :options="TYPES_OPTIONS" />
                </div>
                <div class="search">
                    <n-input ref="searchInputRef" size="large" placeholder="Nombre de producto"
                        v-model:value="searchValue" :loading="isLoading" @keyup.enter="handleSearch">
                        <template #prefix>
                            <n-icon :component="SearchOutlined" />
                        </template>
                    </n-input>
                </div>

            </div>
        </div>
        <div v-if="showNoServer" class="price-container">
            Servidor dormido :P
        </div>
        <div v-else-if="showNoResults" class="price-container">
            No se encontraron resultados :P
        </div>
        <div v-else class="price-container">
            <ProductCardSquare v-for="p in products" :key="p.name" :product="p" />
        </div>
    </div>
</template>

<script setup lang="ts">
import { inject, onBeforeMount, onMounted, ref } from 'vue'
import ProductCardSquare from '../components/ProductCardSquare.vue'
import { Product } from '@/types/interfaces/Product';
import ProductManager from '@/models/ProductManager';
import { SearchOutlined } from '@vicons/material'
import { NSpace, NSelect, NInput, NIcon, SelectOption, InputInst } from "naive-ui"
import { TYPES_OPTIONS } from '../utils/constants';
import IStore from '@/types/IStore';

const store : IStore | undefined = inject('store');
const searchValue = ref<string>("");
const typeFilter = ref<string>('');
const searchInputRef = ref<InputInst | null>(null);
const isLoading = ref<boolean>(false);
const products = ref<Product[]>([]);
const showNoResults = ref<boolean>(false);
const showNoServer = ref<boolean>(false);

/* // typeFilter
function handleFilter(value: string, option: SelectOption) {
    console.log("Select changed!", value);
    typeFilter.value = value;
} */

async function fetchProducts() {
    isLoading.value = true;
    try {
        products.value = await ProductManager.getAll();
        showNoResults.value = products.value.length === 0;
    }
    catch (e) {
        console.error("Error fetching products", e);
        showNoServer.value = true;
    } finally {
        isLoading.value = false;
    }
}

function changeHandler(value: string, option: SelectOption) {
    typeFilter.value = value
    console.log("selected", value, "Next!");
    focusNext();
}

function focusNext() {
    searchInputRef.value?.focus();
    return;
}

async function handleSearch(e: Event) {
    isLoading.value = true;
    console.log("Search:", searchValue.value);
    console.log("typeFilter", typeFilter.value);
    products.value = await ProductManager.searchProducts(searchValue.value, typeFilter.value);
    isLoading.value = false;
}

function getLocation() {

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
        console.log("Latitude:", position.coords.latitude);
        console.log("Longitude:", position.coords.longitude);
        
        if (store?.setCurrentLocation) {
            store!.setCurrentLocation(position.coords.latitude, position.coords.longitude)
        }

    });

  } else { 
    console.log("Geolocation is not supported by this browser.");
  }
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

.searchMenu {
    display: grid;
    grid-template-areas:
        'filter search search search';
    gap: 10px;
}
.filter {
    grid-area:filter
}
.search {
    grid-area:search
}

@media(max-width:426px) {
    .searchMenu {
        grid-template-areas:
            'filter'
            'search';
    }

    .price-container {
        padding: 0;
        flex-direction: column;
        justify-content: center;
        flex-wrap: nowrap;
        align-items: center;
    }

}
</style>