<!-- Formulario para subir un precio/producto/marca a la base, sea para un producto existente o nuevo -->
<template>
    <div class="container">
        <form @submit.prevent="onSubmit">
            <div class="headline">
                <h2>{{customTitle}}</h2>
            </div>

            <label for="productType">Tipo:</label>
            <select name="productType" v-model="productTypeInput" :disabled="hasProduct">
                <option v-for="t in PRODUCT_TYPES" :value="t" :key="t">
                    {{ t }}
                </option>
            </select>

            <label for="product">Producto:</label>
            <input type="text" name="product" list="productName" v-model="productInput" :disabled="hasProduct" />
            <datalist id="productName">
                <option v-for="p in productList" :v-if="p.type = productTypeInput" :value="p.name" :key="p.name">{{
                        p.name
                }}</option>
            </datalist>

            <label for="brand">Marca:</label>
            <input type="text" name="brand" list="brandName" v-model="brandInput" :disabled="hasProduct" />
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
                <input v-model="amount" type="text" class="form-control"
                    aria-label="Dollar amount (with dot and two decimal places)" />
            </div>

            <FormAlert :msg="alertMsg" />

            <div class="submit">
                <button class="btn btn-primary w-100" type="submit">Registrar Precio</button>
            </div>
        </form>
    </div>
</template>

<script lang="ts">
import FormAlert from './FormAlert.vue'
import { defineComponent, onMounted, onBeforeMount, ref, PropType } from 'vue'
import { Product } from '@/types/interfaces/Product'
import { PRODUCT_TYPES } from '@/utils/constants'
import StoreManager from '@/models/StoreManager'
import { exampleBrands } from '@/models/exampleBrands'
import UserManager from '@/models/UserManager'
import Store from '@/types/interfaces/Store'
import Price from '@/types/interfaces/Price'
import Brand from '@/types/Brand'
import ProductType from '@/types/ProductType'
import ProductManager from '@/models/ProductManager'
import { useRouter, useRoute } from 'vue-router'

import { auth } from '../services/auth';

export default defineComponent({
    components: {
        FormAlert,
    },
    props: {
        title: { type: String as PropType<string>, required: false }
    },
    setup(props: any) {

        // DB data
        const productList = ref<Product[]>([]);
        const storeList = ref<Store[]>([]);
        const brandList = ref<Brand[]>([]);
        const hasProduct = ref<boolean>(false);
        const customTitle = ref<string>( props.title || 'Registrar Nuevo Producto');  // either comes from Add to List or register Product

        // Prefill from route params
        const route = useRoute();
        let prefill: any = null;

        if (route.params.prefill) {
            prefill = JSON.parse(route.params.prefill as string);
            hasProduct.value = true;
            console.log('prefill', prefill);
            customTitle.value = 'Registrar Precio';  // Comes from Add Price
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


        // Hooks
        onBeforeMount(() => {
            auth.onAuthStateChanged((currentUser) => {
                if (!currentUser) {
                    redirectToLogin();
                }
            })
        })


        onMounted(() => {
            fetchProducts();
            fetchStores();
            fetchBrands();
        })

        // Methods
        function redirect(route: string) {
            router.push('/products')
        }

        function redirectToLogin() {
            router.push('/login');
        }

        function redirectToProduct(p: Product) {
            router.push('/product/' + p._id);
        }


        async function fetchProducts(): Promise<void> {
            let response = await ProductManager.getAll();
            console.log(response);
            productList.value = response;
        }

        async function fetchStores(): Promise<void> {
            storeList.value = await StoreManager.getAll();
        }

        function fetchBrands(): void {
            brandList.value = exampleBrands
        }

        async function onSubmit(): Promise<void> {
            alertMsg.value = '';

            console.log("New product")


            if (!productInput.value) {
                console.error("No Store selected");
                alertMsg.value = "Ingresa el nombre de producto."
                return;
            }

            if (!storeInput.value) {
                console.error("No Store selected");
                alertMsg.value = "Selecciona el nombre de Tienda."
                return;
            }

            const amt = Number.parseFloat(amount.value);
            if (Number.isNaN(amt) || amt <= 0) {
                console.error("Amount is not a number");
                alertMsg.value = "Ingresa un monto válido."
                return;
            }


            let storeName = storeInput.value.trim();
            let productName = productInput.value.trim();
            let brandName = brandInput.value.trim();

            // Find store by name. Create if not exists
            let store: Store | null = await StoreManager.getByName(storeName);
            if (!store) {
                console.log(`Store ${storeName} not found. Creating store...`);

                const [created, newStore] = await StoreManager.create({ name: storeName });

                if (created) {
                    store = newStore as Store;
                } else {
                    console.log("Error creating store");
                    return;
                }
            }


            const price: Price = {
                amount: amt,
                date: new Date(),
                currency: 'MXN',
                store: storeName,
                StoreKey: store._id!
            };

            // New product registry
            if (!hasProduct.value) {
                console.log("Creating product...");

                const newProduct = {
                    name: productName,
                    brand: brandName,
                    type: productTypeInput.value!,
                    prices: [price]
                }

                const [created, newProd] = await ProductManager.create(newProduct);

                if (created) {
                    redirectToProduct(newProd!);
                } else {
                    console.log("Error registrando nuevo producto");
                    alertMsg.value = "Error registrando el producto. Intenta de nuevo."
                    return;
                }

            } else {
                console.log("Appending price:", price);
                console.log("to product", prefill.productId);

                const [created, newProd] = await ProductManager.addPrice(prefill.productId, price);
                if (created) {
                    redirectToProduct(newProd!);
                } else {
                    console.log("Error registrando nuevo producto");
                    alertMsg.value = "Error añadiendo precio. Intenta de nuevo."
                    return;
                }
            }
        }

        return {
            amount, productInput, productTypeInput, brandInput, storeInput, customTitle,
            productList, storeList, brandList, PRODUCT_TYPES, alertMsg, hasProduct,
            onSubmit
        }
    }
})
</script>

<style>
.quantity-wrapper {
    display: flex;
    flex-direction: row;
    width: 50%;
}

.more-less-button {
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
    form {
        padding: 30px;
    }

}
</style>