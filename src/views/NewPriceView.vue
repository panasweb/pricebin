<!-- Formulario para subir un precio/producto/marca a la base, sea para un producto existente o nuevo -->
<template>
<div class="container">
    <form @submit.prevent="onSubmit">
        <div class="headline">
            <h2>Registrar un precio</h2>
        </div>

        <label for="productType">Tipo:</label>
        <select name="productType" v-model="productTypeInput">
            <option v-for="t in PRODUCT_TYPES" :value="t" :key="t">
                {{ t }}
            </option >
        </select>

        <label for="product">Producto:</label>
        <input type="text" name="product" list="productName" v-model="productInput" />
        <datalist id="productName">
            <option v-for="p in productList" :value="p.name" :key="p.name">{{ p.name }}</option>
        </datalist>

        <label for="brand">Marca:</label>
        <input type="text" name="brand" list="brandName" v-model="brandInput" />
        <datalist id="brandName">
            <option v-for="b in brandList" :value="b.name" :key="b.name">{{ b.name }}</option>
        </datalist>

        <label for="store">Tienda:</label>
        <input type="text" name="store" list="storeName" v-model="storeInput" />
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

        <FormAlert :msg="alertMsg" />

        <div class="submit">
            <button class="btn btn-primary w-100" type="submit">Registrar Precio</button>
        </div>
    </form>
    </div>
</template>

<script lang="ts">
import FormAlert from '../components/FormAlert.vue'
import { defineComponent, onBeforeMount, onMounted, ref } from 'vue'
import {Product} from '@/models/classes/Product'
import { PRODUCT_TYPES } from '@/utils/constants'
import { exampleProducts, findProductByNameAndBrand, addOrUpdatePrice } from '../models/exampleProducts'
import { exampleStores } from '@/models/exampleStores'
import {toObject} from '@/utils/serialize'
import {exampleBrands} from '@/models/exampleBrands'
import Store from '@/models/classes/Store'
import Price from '@/models/classes/Price'

import Brand from '@/types/Brand'
import ProductType from '@/types/ProductType'
import { useRouter, useRoute } from 'vue-router'

export default defineComponent({
    components: {
        FormAlert,
    },
    setup(props: any) {
        // DB data
        const productList = ref<Product[]>([]);
        const storeList = ref<Store[]>([]);
        const brandList = ref<Brand[]>([]);

        // Prefill from route params
        const route = useRoute();
        let prefill:any = null;
        
        if (route.params.prefill) {
            prefill = JSON.parse(route.params.prefill as string);
            console.log('prefill', prefill);
        } else {
            console.log("no prefill!");
        }

        // Form control
        const amount = ref<string>('0.00');
        const storeInput = ref<string>('');
        const productInput = ref<string>(prefill?.productName || '');
        const brandInput = ref<string>(prefill?.brandName || '');
        const productTypeInput = ref<ProductType>(prefill?.productType as ProductType || null);

        // Form Validation
        const alertMsg = ref<string>('');
        const router = useRouter();

        onMounted(() => {
            console.log("New price mounted!");
            fetchProducts();
            fetchStores();
            fetchBrands();
        })

        // Methods
        function redirect() {
            router.push('/products')
        }

        function fetchProducts() : void {
            productList.value = exampleProducts
        }

        function fetchStores() : void {
            storeList.value = exampleStores
        }
        
        function fetchBrands() : void {
            brandList.value = exampleBrands
        }

        function onSubmit() : void {
            alertMsg.value = '';

            console.log("New price")
            const amt = Number.parseFloat(amount.value);
            
            if (Number.isNaN(amt) || amt <= 0){
                console.error("Amount is not a number");
                alertMsg.value = "Ingresa un monto válido."
                return;
            }

            if (!storeInput.value) {
                console.error("No Store selected");
                alertMsg.value = "Selecciona el nombre de Tienda."
                return;
            }

            let storeName = storeInput.value.trim();
            let productName = productInput.value.trim();
            let brandName = brandInput.value.trim();

            console.log("look for store", storeName);
            let store = Store.getStoreByName(storeName);
            if (!store) {
                console.log("Store not found. Creating store...");
                store = new Store(storeName);
                toObject(store);
                // store.save()
            }

            let product = findProductByNameAndBrand(productName, brandName);
            if (!product) {
                console.log("Store not found. Creating product...");
                product = new Product(productName, brandName, productTypeInput.value!, []);
                // product = new Product(productName, brandName, 'Despensa', []);
                // store.save()
            }
            
            const price = new Price(amt, product.prices.length, store, new Date(), 'MXN');
            // price.save()
            addOrUpdatePrice(product, price);

            console.log("Finish, redirect to product.id", product.id!);
            toObject(product);
            // fetch the product and add the price to its list, redirect to product detail
        }

        return { amount, productInput, productTypeInput, brandInput, storeInput, 
        productList, storeList, brandList, PRODUCT_TYPES, alertMsg,
         onSubmit }
    }
})


</script>

<style>
</style>