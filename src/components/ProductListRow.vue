<template>
    <div v-if="productData" class="row">
        <div class="col-4">
            <!-- Render the image of every item -->
            <img src="../assets/AtunDolores.svg" />
            <p>{{ product.productName }}</p>
        </div>
        <div class="col-4">
            <!-- Render the image of the store -->
            <img :src="storeLogo" class="logo">
            <p>{{ productData.prices[0].store.name }}</p>
        </div>
        
        <div class="col-4">
            <h2>
                <!-- Render the price times the number of units -->
                ${{ product.amount }} x {{ product.quantity }}
            </h2>
            <p>Encontrado en ${{ productData.prices[0].amount }}</p>
        </div>
    </div>
</template>

<script lang ="ts">
import { Product } from "@/types/Product";
import { defineComponent, onMounted, PropType, ref } from "@vue/runtime-core";
import { findProductByNameAndBrand } from '../models/products'
import ProductListRecord from '../types/ProductListRecord'
import {DEFAULT_LOGO_SVG} from '../utils/constants' 

export default defineComponent({
    props: {
        product: { type: Object as PropType<ProductListRecord>, required: true }
    },
    setup(props) {
        const productData = ref<Product|null>();
        const storeLogo = ref<string>(DEFAULT_LOGO_SVG);

        onMounted(() => {
            productData.value = findProductByNameAndBrand(props.product.productName, props.product.brandName);
            console.log("Product Data", productData.value); 
        })

        return { productData, storeLogo }
    }
})
</script>

<style scoped>
    .logo{
        height: 50px;
    }
</style>