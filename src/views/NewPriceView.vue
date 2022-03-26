<!-- Formulario para subir un precio a la base, sea para un producto existente o nuevo -->
<template>
    <form @submit.prevent="onSubmit">
        <div>
            <h3>Registrar Precio</h3>
        </div>
        <label for="product">Producto:</label>
        <input type="text" name="product" list="productName" />
        <datalist id="productName">
            <option v-for="p in productList" :value="p.name" :key="p.name">{{ p.name }}</option>
        </datalist>

        <label for="store">Tienda:</label>
        <input type="text" name="store" list="storeName" />
        <datalist id="storeName">
            <option v-for="s in storeList" :value="s.name" :key="s.name">{{ s.name }}</option>
        </datalist>
<!-- 
        <label for="confirmPassword">Confirma Contraseña:</label>
        <input type="confirmPassword" name="confirmPassword" required v-model="confirmPassword" />

        <div class="terms">
            <input name="terms" type="checkbox" v-model="acceptedTerms" />
            <label for="terms">Aceptar Términos y Condiciones</label>
        </div>
 -->

        <div class="submit">
            <button type="submit">Crear Cuenta</button>
        </div>
    </form>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue'
import Product from '@/types/Product'
import ProductType from '@/types/ProductType'
import { exampleProducts } from '../models/products'
import { exampleStores } from '@/models/stores'
import Store from '@/types/Store'
import Price from '@/types/Price'

export default defineComponent({
    setup() {

        const productList = ref<Product[]>([]);
        const storeList = ref<Store[]>([]);
        const amount = ref<number|null>(0);
        const where = ref<Store|null>(null);

        function fetchProducts() {
            productList.value = exampleProducts
        }

        function fetchStores() {
            storeList.value = exampleStores
        }

        function onSubmit() {
            console.log("New price")
            //const price = new Price();
        }

        onMounted(() => {
            fetchProducts();
            fetchStores();
        })

        return { productList, storeList, onSubmit }
    }
})
</script>

<style scoped>
</style>