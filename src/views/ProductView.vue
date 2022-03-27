
<template>
    <div>
        <div class="container">
            <div class="row"><img src="@/assets/AtunDolores.svg" class="productI"></div>
            <div class="row">
                <div class="col"><h4>{{products[0].brand}}</h4></div> 
                <div class="col"><img src="@/assets/heart.svg"> </div>
                <h3>{{products[0].name}}</h3>
                <h3>Precio mas bajo: $<span>{{products[0].prices[0].amount}}</span></h3> 
            </div>

            <div v-for="p in products[0].prices" :key="p.store" class="row">
                <div class="col">
                    <img :src="storeLogo" class="logo">
                    <p>{{p.store.name}}</p>
                </div>
                <div class="col">
                    ${{p.amount}}
                </div>
            </div>

            <div class="row">
                <button class="btn btn-primary">Agregar un precio</button>
            </div>
        </div>

    </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue'
import { exampleProducts } from '../models/products'
import {Product} from '../types/Product'
import {DEFAULT_LOGO_SVG} from '../utils/constants' 

export default defineComponent({
    setup(){
        const products = ref<Product[]>(exampleProducts)
        const storeLogo = ref<string>(DEFAULT_LOGO_SVG);

        onMounted(() =>{
            console.log("lista de productos", products.value)
        })
        return {
            products, 
            storeLogo
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
</style>