<template>
    <div v-if="product" class="row">
        <div class="col-2">
            <!-- Render the image of every item -->
            <img :src="productImg" class="row-img"/>
            <p>{{ product.productName }}</p>
        </div>
        <div class="col-2">
            <!-- Render the image of the store -->
            <p>{{ product.storeName }}</p>
        </div>
        
        <div class="col-2">
            <p>
                <!-- Render the price times the number of units -->
                ${{ formatAmt(product.amount) }}
            </p>
        </div>
        <div class="col-2">
            <p>
                {{ product.quantity }}
            </p>
        </div>
        <div class="col-2">
            <button @click="onClick">
                BORRAR
            </button>
        </div>
    </div>
</template>

<script lang ="ts">
import {inject} from 'vue'
import { defineComponent, onMounted, PropType, ref } from "@vue/runtime-core";
import ListRecord from '../types/ListRecord'
import { DEFAULT_PRODUCT_IMG, DEFAULT_LOGO_SVG, DEFAULT_STORE } from '@/utils/constants'
import { formatAmt } from "@/utils/misc";

export default defineComponent({
    props: {
        product: { type: Object as PropType<ListRecord>, required: true },
        onClick: {type: Object as PropType<any>, required: true}
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