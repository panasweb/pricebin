<template>
    <div v-if="product" class="row">
        <div class="col-4">
            <!-- Render the image of every item -->
            <img :src="productImg" class="row-img"/>
            <p>{{ product.productName }}</p>
        </div>
        <div class="col-4">
            <!-- Render the image of the store -->
            <p>{{ product.storeName }}</p>
        </div>
        
        <div class="col-4">
            <h2>
                <!-- Render the price times the number of units -->
                ${{ product.amount }} x {{ product.quantity }}
            </h2>
        </div>
    </div>
</template>

<script lang ="ts">
import { Product } from "@/models/classes/Product";
import { defineComponent, onMounted, PropType, ref } from "@vue/runtime-core";
import { findProductByNameAndBrand } from '../models/exampleProducts'
import ListRecord from '../types/ListRecord'
import {DEFAULT_LOGO_SVG} from '../utils/constants' 
import { DEFAULT_PRODUCT_IMG } from '@/utils/constants'


export default defineComponent({
    props: {
        product: { type: Object as PropType<ListRecord>, required: true }
    },
    setup(props) {
        const storeLogo = ref<string>(DEFAULT_LOGO_SVG);
        const productImg = ref<string>(DEFAULT_PRODUCT_IMG);

        // onMounted(() => {
        //     product.value = props.product;
        //     console.log("Product Data", product.value); 
        // })

        return { storeLogo, productImg /* , product,  */ }
    }
})
</script>

<style scoped>
    .logo{
        height: 50px;
    }
    
</style>