<!-- Formulario para subir un precio a la base, sea para un producto existente o nuevo -->
<template>
    <form @submit.prevent="onSubmit">
        <div class="headline">
            <h2>Registrar Precio</h2>
        </div>

        <label for="product">Producto:</label>
        <input type="text" name="product" list="productName" v-model="product" />
        <datalist id="productName">
            <option v-for="p in productList" :value="p.name" :key="p.name">{{ p.name }}</option>
        </datalist>

        <label for="store">Tienda:</label>
        <input type="text" name="store" list="storeName" v-model="store" />
        <datalist id="storeName">
            <option v-for="s in storeList" :value="s.name" :key="s.name">{{ s.name }}</option>
        </datalist>
        <!-- Como evitar que value se vea en datalist? -->

        <label for="price">Precio:</label>
        <!-- Usar input-group-addon  -->
        <div class="input-group mb-3">
            <span class="input-group-text">MXN</span>
            <input
                v-model="amount"
                type="text"
                class="form-control"
                aria-label="Dollar amount (with dot and two decimal places)"
            />
        </div>

        <div class="submit">
            <button class="btn btn-primary w-100" type="submit">Registrar Precio</button>
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

        const amount = ref<string>('0.00');
        const storeInput = ref<string>('');
        const productInput = ref<string>(null);

        function fetchProducts() : void {
            productList.value = exampleProducts
        }

        function fetchStores() : void {
            storeList.value = exampleStores
        }

        async function onSubmit() : void {
            console.log("New price")
            const amt = Number.parseFloat(amount.value);
            
            if (Number.isNaN(amt)){
                console.error("Amount is not a number");
                return;
            }

            if (!storeInput.value) {
                console.error("No Store selected");
                return;
            }

            const product = Product.getProductByName(productInput.value);
            const store = Store.getStoreByName(storeInput.value);

            const price = new Price(amt, store, new Date(), 'MXN');

            await product.addOrUpdatePrice(price);

            console.log('New price');
            console.dir(price);
            // fetch the product and add the price to its list

        }

        onMounted(() => {
            fetchProducts();
            fetchStores();
        })

        return { amount, productInput, storeInput, productList, storeList, onSubmit }
    }
})
</script>

<style>
</style>