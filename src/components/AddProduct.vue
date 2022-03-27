<!-- Modal for adding product to a User's List: ProductListRecord -->
<template>
    <div class="container">
        <form @submit.prevent="onSubmit">
            <div class="headline">
                <h2>Agregar Producto</h2>
            </div>
            <label for="productName">Nombre del Producto:</label>
            <input type="text" placeholder="ej: Cereal Oatmeal Squares (411g)" />
        
            <FormAlert :msg="alertMsg" />

            <div class="submit">
                <button class="btn btn-primary w-100" type="submit">Registrar Precio</button>
            </div>
        </form>
    </div>
</template>

<script lang="ts">
import FormAlert from './FormAlert.vue'
import { defineComponent, ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import {exampleProductRecords} from '@/models/products'
import ProductList from '@/types/ProductList'

export default defineComponent({
    components:{
        FormAlert
    },
    setup() {

        // Form control
        const amount = ref<string>('0.00');
        const storeInput = ref<string>('');
        const productInput = ref<string>('');
        const brandInput = ref<string>('');

        // Form Validation
        const alertMsg = ref<string>('');
        const router = useRouter();

        /* Selecciona nombre de producto, si existente, jalar los precios y ponerlos en datalist */
        // Si 

        // Product -> Prices[], Price -> Store


        function onSubmit() {
            console.log("haha")
        }

        return { alertMsg, onSubmit }
    }
})
</script>

<style scoped>
</style>