<!-- Formulario para subir un precio a la base, sea para un producto existente o nuevo -->
<template>
    <form @submit.prevent="onSubmit">
        <h3>Nuevo Precio</h3>
        <label for="email">Producto:</label>
        <input type="text" name="product" list="productName" />
        <datalist id="productName">
            <option v-for="p in productList" :value="p.name" :key="p.name">
                {{ p.name }}
            </option>
        </datalist>

        <!-- <label for="password">Contraseña:</label>
        <input type="password" name="password" required v-model="password" />

        <label for="confirmPassword">Confirma Contraseña:</label>
        <input type="confirmPassword" name="confirmPassword" required v-model="confirmPassword" />

        <div class="terms">
            <input name="terms" type="checkbox" v-model="acceptedTerms" />
            <label for="terms">Aceptar Términos y Condiciones</label>
        </div>-->
        <div class="submit">
            <button type="submit">Crear Cuenta</button>
        </div>
    </form>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import Product from '@/types/Product'
import ProductType from '@/types/ProductType'
import {exampleProducts} from '../models/products'

export default defineComponent({
    setup() {

        const productList = ref<Product[]>([]);

        function fetchProducts() {
            productList.value = exampleProducts
        }

        function onSubmit() {
            console.log("New price")
        }
        return {onSubmit}
    }
})
</script>

<style scoped>
</style>