<template>
    <div v-if="product" class="row">
        <div class="col">
            <!-- Render the image of every item -->
            <img :src="productImg" class="row-img"/>
            <p>{{ product.productName }}</p>
        </div>
        <div class="col">
            <!-- Render the image of the store -->
            <p>{{ product.storeName }}</p>
        </div>
        
        <div class="col">
            <p>
                <!-- Render the price times the number of units -->
                ${{ formatAmt(product.amount) }}
            </p>
        </div>
        <div class="col">
            <p>
                {{ product.quantity }}
            </p>
        </div>
    </div>
</template>

<script lang ="ts">
import { defineComponent, onMounted, PropType, ref } from "@vue/runtime-core";
import ListRecord from '../types/ListRecord'
import {DEFAULT_LOGO_SVG} from '../utils/constants' 
import { DEFAULT_PRODUCT_IMG } from '@/utils/constants'
import { formatAmt } from "@/utils/misc";

export default defineComponent({
    props: {
        product: { type: Object as PropType<ListRecord>, required: true }
    },
    setup(props) {
        const storeLogo = ref<string>(DEFAULT_LOGO_SVG);
        const productImg = ref<string>(DEFAULT_PRODUCT_IMG);

        return { storeLogo, productImg, formatAmt }
    }
})
</script>

<style scoped>
    .logo{
        height: 50px;
    }
</style>