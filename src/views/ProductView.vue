
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
                        <div class="priceVotes">
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M0 8C0 3.58065 3.58065 0 8 0C12.4194 0 16 3.58065 16 8C16 12.4194 12.4194 16 8 16C3.58065 16 0 12.4194 0 8ZM9.41935 11.7419V8H11.7065C12.0516 8 12.2258 7.58064 11.9806 7.33871L8.27419 3.65161C8.12258 3.5 7.88065 3.5 7.72903 3.65161L4.01935 7.33871C3.77419 7.58387 3.94839 8 4.29355 8H6.58064V11.7419C6.58064 11.9548 6.75484 12.129 6.96774 12.129H9.03226C9.24516 12.129 9.41935 11.9548 9.41935 11.7419Z" id="unvoted"/></svg>
                            x{{priceVotes[p._id!]}} 
                        </div>
                    </div>
                    <button class="add col" @click="addToList(p)">+</button>

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
import { auth } from '../services/auth';

import ProductManager from '@/models/ProductManager'
import VotesManager from '@/models/VotesManager'
import Price from '@/types/interfaces/Price'
import UserManager from '@/models/UserManager'
import ListRecord from '@/types/ListRecord'

const user= ref <string>("random@email.com");

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
function redirectToList() {
    router.push('/myproducts/');
}

onBeforeMount(async () => {
    currentP.value = await ProductManager.getProduct(route.params.id as string)

    console.log("product", currentP.value);

    if (!currentP.value) {
        redirect();
        return;
    }
    auth.onAuthStateChanged((userCurrent) => {
        if (!userCurrent) {
            console.log("no tiene usuario")
        } else if(userCurrent.email){
            user.value = userCurrent.email
            console.log("user value: ")
            console.log(user.value)
        }
    })

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
       
async function addToList(price : Price): Promise <void>{

    let productRecord : ListRecord | null = null
    console.log("click")
    
    
    if (user.value === "random@email") {
        redirect()
    } 

    if(currentP.value){
        productRecord = {
            productName: currentP!.value?.name,
            storeName:  price.store,
            brandName: currentP!.value?.brand,
            amount: price.amount,
            quantity: 1
        }
        console.log(productRecord)
        await UserManager.addProduct(productRecord, user.value )
        redirectToList();
        
    }
        
    
}


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

.add {
    color: #f76d66;
    font-weight: bolder;
    font-size: 50px;
    background-color: transparent;
    border-color: transparent;
    max-width: 50px;
    margin: 5px;
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

#unvoted{
    fill: black;
}

#voted{
    fill: #F76D66;
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