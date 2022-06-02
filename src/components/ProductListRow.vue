<template>
    <div v-if="product" class="row container">
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
                {{ toCurrency(product.amount, store) }}
            </p>
        </div>
        <div class="col">
            <p>
                {{ product.quantity }}
            </p>
        </div>
        <div class="col">
            <button @click="onClick" class="btn btn-secondary">
                Borrar
            </button>
        </div>
    </div>
</template>

<script lang ="ts">
import {inject} from 'vue'
import { defineComponent, onMounted, PropType, ref } from "@vue/runtime-core";
import ListRecord from '../types/ListRecord'
import { DEFAULT_PRODUCT_IMG, DEFAULT_LOGO_SVG, DEFAULT_STORE } from '@/utils/constants'
import { formatAmt, toCurrency } from "@/utils/misc";
import IStore from '@/types/IStore';

export default defineComponent({
    props: {
        product: { type: Object as PropType<ListRecord>, required: true },
        onClick: {type: Object as PropType<any>, required: true}
    },
    setup(props) {
        const store : IStore | undefined = inject('store'); 
        const storeLogo = ref<string>(DEFAULT_LOGO_SVG);
        const productImg = ref<string>(DEFAULT_PRODUCT_IMG);
        return { store, storeLogo, productImg, formatAmt, toCurrency }
    }
})
</script>

<style scoped>
    .logo{
        height: 50px;
    }
    .container{
        width: 80%;
        margin: 25px 10% ;
    }
    
</style>