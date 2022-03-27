<!-- Formulario para subir un precio/producto/marca a la base, sea para un producto existente o nuevo -->
<template>
    <form @submit.prevent="onSubmit">
        <div class="headline">
            <h2>Registrar Precio</h2>
        </div>

        <label for="productType">Tipo:</label>
        <select name="productType" v-model="productTypeInput">
            <option value="Despensa"></option>
            <option value="Electrónicos"></option>
            <option value="Farmacia"></option>
            <option value="Baño y Limpieza"></option>
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

        <div class="submit">
            <button class="btn btn-primary w-100" type="submit">Registrar Precio</button>
        </div>
    </form>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue'
import {Product} from '@/types/Product'
import ProductType from '@/types/ProductType'
import { exampleProducts } from '../models/products'
import { exampleStores } from '@/models/stores'
import {exampleBrands} from '@/models/brands'
import Store from '@/types/Store'
import Price from '@/types/Price'
import Brand from '@/types/Brand'

export default defineComponent({
    setup() {

        const productList = ref<Product[]>([]);
        const storeList = ref<Store[]>([]);
        const brandList = ref<Brand[]>([]);

        const amount = ref<string>('0.00');
        const storeInput = ref<string>('');
        const productInput = ref<string>('');
        const brandInput = ref<string>('');
        const productTypeInput = ref<string>('');


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

            let storeName = storeInput.value.trim();
            let productName = productInput.value.trim();
            let brandName = brandInput.value.trim();

            let store = Store.getStoreByName(storeName);
            if (!store) {
                console.log("Store not found. Creating store...");
                store = new Store(storeName);
                // store.save()
            }

            // let product = Product.findProductByNameAndBrand(productName, brandName);
            // if (!product) {
            //     console.log("Store not found. Creating product...");
            //     // product = new Product(productName, brandName, 'Despensa', []);
            //     // store.save()
            // }


            const price = new Price(amt, store, new Date(), 'MXN');

            // product.addOrUpdatePrice(price);

            console.log('New price');
            console.dir(price);
            // fetch the product and add the price to its list

        }

        onMounted(() => {
            fetchProducts();
            fetchStores();
            fetchBrands();
        })

        return { amount, productInput, productTypeInput, brandInput, storeInput, 
        productList, storeList, brandList,
         onSubmit }
    }
})
</script>

<style>
</style>