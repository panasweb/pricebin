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
            <p>
                <!-- Render the price times the number of units -->
                ${{ product.amount }} x {{ product.quantity }}
            </p>
        </div>
        <div class="col-4">
            <button @click="onClick">
                X
            </button>
        </div>
    </div>
</template>

<script lang ="ts">
import { defineComponent, onMounted, PropType, ref } from "@vue/runtime-core";
import ListRecord from '../types/ListRecord'
import {DEFAULT_LOGO_SVG} from '../utils/constants' 
import { DEFAULT_PRODUCT_IMG } from '@/utils/constants'


export default defineComponent({
    props: {
        product: { type: Object as PropType<ListRecord>, required: true },
        onClick: {type: Object as PropType<any>, required: true}
    },
    setup(props) {
        const storeLogo = ref<string>(DEFAULT_LOGO_SVG);
        const productImg = ref<string>(DEFAULT_PRODUCT_IMG);

        return { storeLogo, productImg }
    }
})
</script>

<style scoped>
    .logo{
        height: 50px;
    }
    
</style>