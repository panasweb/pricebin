<!-- Formulario para subir un precio/producto/marca a la base, sea para un producto existente o nuevo -->
<template>
<div class="container">
    <form @submit.prevent="onSubmit">
        <div class="headline">
            <h2>Añadir producto</h2>
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
            <option v-for="p in productList" :v-if =" p.type = productTypeInput" :value="p.name" :key="p.name">{{ p.name }}</option>
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
        <div class="quantity-wrapper">
            <div class="more-less-button" v-on:click="quantity -= 1">-</div>
            <input type="number" v-model="quantity" placeholder="1" style="text-align: center;"/>
            <div class="more-less-button" v-on:click="quantity += 1">+</div>
        </div>
        
        <FormAlert :msg="alertMsg" />

        <div class="submit">
            <button class="btn btn-primary w-100" type="submit">Añadir producto</button>
        </div>
    </form>
    </div>
</template>

<script lang="ts">
import FormAlert from '../components/FormAlert.vue'
import { defineComponent, onBeforeMount, onMounted, ref } from 'vue'
import {Product} from '@/models/classes/Product'
import { PRODUCT_TYPES } from '@/utils/constants'
import { exampleProducts,  findProductByNameAndBrand, addProduct, addMyProduct } from '../models/exampleProducts'
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



        // Form control
        const quantity = ref<number>(1);
        const amount = ref<string>('0.00');
        const storeInput = ref<string>('');
        const productInput = ref<string>('');
        const brandInput = ref<string>( '');
        const productTypeInput = ref<ProductType>(null);

        // Form Validation
        const alertMsg = ref<string>('');
        const router = useRouter();

        // Hooks
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

            console.log("New product")
            const amt = Number.parseFloat(amount.value);
            if (Number.isNaN(amt)){
                console.error("Amount is not a number");
                alertMsg.value = "Ingresa un monto válido."
                return;
            }

            if (!storeInput.value) {
                console.error("No Store selected");
                alertMsg.value = "Selecciona el nombre de Tienda."
                return;
            }

            if (!quantity.value || quantity.value <= 0) {
                console.error("No Store selected");
                alertMsg.value = "Selecciona el número de productos."
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
                console.log("Product not found. Creating product...");
                const price = new Price(amt, 0, store, new Date(), 'MXN');
                product = new Product(productName, brandName, productTypeInput.value!, [price]);
                addProduct(product)
                // product = new Product(productName, brandName, 'Despensa', []);
                // store.save()
            }
            addMyProduct(product, store, quantity.value)
            

            
            console.log("Finish, redirect to product.id", product.id!);
            redirect()
            // fetch the product and add the price to its list, redirect to product detail
        }

        return { quantity, amount, productInput, productTypeInput, brandInput, storeInput, 
        productList, storeList, brandList, PRODUCT_TYPES, alertMsg,
         onSubmit }
    }
})
</script>

<style>
    .quantity-wrapper{
        display: flex;
        flex-direction: row;
        width:50%;
    }

    .more-less-button{
        color: #595c88;
        border: solid;
        border-color: #595c88;
        font-weight: bold;
        font-size: 25px;
        background-color: transparent;
        text-align: center;
        min-width: 50px;
        height: 50px;
        border-radius: 5px;
    }

        @media only screen and (max-width: 700px) {
        form{
            padding: 30px;
        }
  
    }
</style>