
<template>
    <div>
        <div class="container">
            <div class="row">
                <img :src="productImg" class="productI">
            </div>
            <div class="row">
                <div class="marca">
                    <h4>{{ currentP?.brand }}</h4>
                </div>
                <div class="favoritos"><img src="@/assets/heart.svg"> </div>
                <h3 style="font-weight: bold">{{ currentP?.name }}</h3>
                <h3>Precio mas bajo: <span> $ {{ currentP?.prices[0].amount }}</span></h3>
            </div>
            <div class="prices-container">
                <div v-for="p in currentP?.prices" :key="p.store" class="row" style="font-weight: bold">
                    <div class="col">
                        <img :src="storeLogo" class="logo">
                        <p>{{ p.store }}</p>
                    </div>
                    <div class="col price">
                        ${{p.amount}}
                        <div class="priceVotes">Apoyo: {{priceVotes[p._id!]}}</div>
                    </div>
                </div>
            </div>
            <router-link :to="{
                name: 'add price',
                params: {
                    prefill: productFormData
                }
            }">
                <button class="btn btn-primary w-100">Registrar un precio</button>
            </router-link>

        </div>
    </div>
</template>

<script setup lang="ts">
import { onBeforeMount,  ref } from 'vue'
import {Product} from '../types/interfaces/Product'
import {DEFAULT_LOGO_SVG, DEFAULT_PRODUCT_IMG} from '../utils/constants' 
import {useRoute, useRouter} from 'vue-router'

import ProductManager from '@/models/ProductManager'
import VotesManager from '@/models/VotesManager'
import Price from '@/types/interfaces/Price'

const storeLogo = ref<string>(DEFAULT_LOGO_SVG);
const route = useRoute()
const currentP = ref<Product | null>()
const productFormData= ref<string>('');  
const priceVotes = ref<Record<string, number>>({});  
const productImg = ref<string>(DEFAULT_PRODUCT_IMG);
const router = useRouter();

function redirect() {
    router.push({ name: '404', replace: true });
}

onBeforeMount(async () => {
    currentP.value = await ProductManager.getProduct(route.params.id as string)

    console.log("product", currentP.value);

    if (!currentP.value) {
        redirect();
        return;
    }

    const priceIds = Array.from(currentP.value!.prices!, (price: Price) => price._id!);

    const counts = await VotesManager.getVoteCounts(priceIds as string[]);
    priceVotes.value = counts;

    if (currentP.value?.img) {
        productImg.value = currentP.value.img;
    }

    const objectData: any = {
        productName: currentP!.value?.name,
        brandName: currentP!.value?.brand,
        productType: currentP!.value?.type,
        productId: route.params.id as string
    }
    productFormData.value = JSON.stringify(objectData);
    console.log("product", objectData)
})

</script>

<style scoped>
.logo {
    height: 30px;
    margin-bottom: 10px;
}

.productI {
    height: 100px;
    width: 100%;
    object-fit: contain;
    margin-bottom: 15px;
}

* {
    text-align: left;
}

.container {
    width: 40%;
    margin-top: -40px;
    margin-bottom: 40px;
    display: flex;
    flex-direction: column;
    align-content: center;
}

.row {
    margin: 25px 0;
}

.favoritos {
    width: 5%;
}

.marca {
    width: 90%;
}

.prices-container {
    border-style: solid;
    border-color: #46178f;
    margin: 25px 0;
    padding: 20px;
    border-radius: 5px;
}

.price {
    text-align: right;
    font-weight: bold;
    font-size: 30px;
}

button {
    text-align: center;
}

.row {
    width: 100%;
    justify-content: space-between;
}

span {
    color: #1DC202;
}
.priceVotes {
    font-size: 11px;
    text-align: inherit;
    color: #444;
}

@media only screen and (max-width: 700px) {
    .container {
        width: 100%;
        margin-top: -40px;
        margin-bottom: 40px;
        display: flex;
        flex-direction: column;
        align-content: center;
    }
    .row{
        margin: 25px 0;
    }
    .favoritos{
        width: 5%;
    }
    .marca{
        width: 90%;
    }
    .prices-container{
        border-style: solid;
        border-color: #46178f;
        margin: 25px 0;
        padding: 20px;
        border-radius: 5px;
    }
    .price{
        text-align: right;
        font-weight: bold;
        font-size: 30px;
    }

    button{
        text-align: center;
    }
    .row{
        width: 100%;
        justify-content: space-between;
    }
    span{
        color: #1DC202;
    }

}
</style>