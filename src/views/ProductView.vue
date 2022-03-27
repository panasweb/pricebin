
<template>
    <div>
        <div class="container">
            <div class="row"><img src="@/assets/AtunDolores.svg" class="productI"></div>
            <div class="row">
                <div class="col"><h4>{{currentP.brand}}</h4></div> 
                <div class="col"><img src="@/assets/heart.svg"> </div>
                <h3>{{currentP.name}}</h3>
                <h3>Precio mas bajo: $<span>{{currentP.prices[0].amount}}</span></h3> 
            </div>

            <div v-for="p in currentP.prices" :key="p.id" class="row">
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
import { defineComponent, onBeforeMount, onMounted, ref } from 'vue'
import { exampleProducts } from '../models/products'
import {Product} from '../types/Product'
import {DEFAULT_LOGO_SVG} from '../utils/constants' 
import {findById } from '../models/products'
import {useRoute} from 'vue-router'

export default defineComponent({
    setup(){
        const storeLogo = ref<string>(DEFAULT_LOGO_SVG);
        const route = useRoute()
        const currentP = ref<Product | null>()
        
        onBeforeMount(() => {
            currentP.value = findById(route.params.id as string)
        }),
        onMounted(() =>{
            console.log("Logo ", storeLogo.value)
        })
        return {
            currentP, 
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