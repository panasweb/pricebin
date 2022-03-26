<template>
    <div v-if="productData" class="row">
        <div class="col-4">
            <!-- Render the image of every item -->
            <img src="../assets/AtunDolores.svg">
            <p>{{product.productName}}</p>
        </div>
        <div class="col-4">
            <!-- Render the image of the store -->
            <img src="@/assets/logos/Walmart.svg"/>
            <p>{{productData.prices[0].where.name}}</p>
        </div>
        <div class="col-4">
            <h2>
                <!-- Render the price times the number of units -->
                ${{ productData.prices[0].amount}} x 1
            </h2>
            <p>Encontrado en ${{ productData.prices[0].amount }}</p>
        </div>
    </div>
</template>

<script lang ="ts">
import { defineComponent, onMounted, PropType, ref } from "@vue/runtime-core";
import { exampleProducts } from '../models/products'
import ProductListRecord from '../types/ProductListRecord'
import Product from '../types/Product'


export default defineComponent({
    props: {
        product: {type: Object as PropType<ProductListRecord>, required: true}
    },
    setup(props){
        const productData = ref()
        onMounted(() =>{
            productData.value = Product.findProductByName(props.product.productName)
            console.log("Name:", props.product.productName)
            console.log("CTM AMLO ", productData.value)
        })
        
        return{productData}
    }
})
</script>

<style>

</style>