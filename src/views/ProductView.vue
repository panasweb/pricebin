
<template>
    <div>
        <div class="container">
            <div class="row"><img src="@/assets/AtunDolores.svg" class="productI"></div>
            <div class="row">
                <div class="marca" ><h4>{{currentP?.brand}}</h4></div> 
                <div class="favoritos"><img src="@/assets/heart.svg"> </div>
                <h3  style="font-weight: bold" >{{currentP?.name}}</h3>
                <h3>Precio mas bajo: <span> $ {{currentP?.prices[0].amount}}</span></h3> 
            </div>
            <div class="prices-container">
                <div v-for="p in currentP?.prices" :key="p.id" class="row"  style="font-weight: bold">
                    <div class="col">
                        <img :src="storeLogo" class="logo">
                        <p>{{p.store.name}}</p>
                    </div>
                    <div class="col price">
                        ${{p.amount}}
                    </div>
                </div>
            </div>
            <router-link
                :to="{
                    name: 'add price', 
                    params: {
                        prefill: productFormData
                    }
                }"
            >
                <button class="btn btn-primary w-100" >Agregar un precio</button>
            </router-link>
            

            

        </div>

    </div>
</template>

<script lang="ts">
import { defineComponent, onBeforeMount, onMounted, ref } from 'vue'
import { exampleProducts } from '../models/products'
import {Product} from '../types/classes/Product'
import {DEFAULT_LOGO_SVG} from '../utils/constants' 
import {findById } from '../models/products'
import {useRoute} from 'vue-router'
import { propsToAttrMap } from '@vue/shared'

export default defineComponent({
    setup(){
        const storeLogo = ref<string>(DEFAULT_LOGO_SVG);
        const route = useRoute()
        const currentP = ref<Product | null>()
        const productFormData= ref<string>('');  

        
        onBeforeMount(() => {
            currentP.value = findById(route.params.id as string)
            const objectData: any = {
                productName: currentP!.value?.name,
                brandName: currentP!.value?.brand,
                productType: currentP!.value?.type,
                productId: route.params.id as string
            }
            productFormData.value = JSON.stringify(objectData);
            console.log(objectData)
        }),
        onMounted(() =>{
            console.log("Logo ", storeLogo.value)
            
        })
        return {
            currentP, 
            storeLogo,
            productFormData 
        }
    }
})
</script>

<style scoped>
    .logo{
        height: 30px;
        margin-bottom: 10px;
    }
    .productI{
        height: 100px;
        margin-bottom: 15px;
    }
    *{
        text-align: left;
    }
    .container{
        width: 40%;
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

    @media only screen and (max-width: 700px) {
        .container{
            width: 100%;
            margin-top: -40px;
            margin-bottom: 40px;
            display: flex;
            flex-direction: column;
            align-content: center;
        }
  
    }
</style>