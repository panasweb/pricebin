<template>
    <div class="container">
        <h1>Mis productos</h1>
        <div class="row">
            <div class="col-2">
                <h2>Hoy</h2>
            </div>
            <div class="col-8">
                <div class="division">
                </div>
            </div>
            <div class="col-2">
                <!-- Renderear la sumatoria total de los productos -->
                <h2>${{ total }}</h2>
            </div>
        </div>
        <div v-for="p in products" :key="p.productName" class="row">
            <ProductListRow :product="p"/>
        </div>

        <div class="row">
            <button class="btn btn-primary">Agregar producto</button> <!-- Debe enviar a Add product to List -->
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue'
import { exampleProductRecords} from '../models/products'
import ProductListRow from '../components/ProductListRow.vue'
import ProductListRecord from '../types/ProductListRecord'

export default defineComponent({
    setup(){
        const total = ref<number>(0)
        const products = ref<ProductListRecord[]>(exampleProductRecords)
        onMounted(() =>{
            // console.log("lista de productos", products.value)
            products.value.forEach(pr => {
                total.value += (pr.amount * pr.quantity)
            }); 
        })
        return {
            total, 
            products
        }
    },
    components:{
        ProductListRow
    }
})
</script>

<style scoped>
    .division{
        width: 100%;
        height: 50%;
        border-bottom: 3px solid black;
        border-radius: 2px;
    }
</style>