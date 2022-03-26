<template>
    <div>
        <div class="container">
            <div class="row"><img src="@/assets/AtunDolores.svg" width="80px" height="50px"></div>
            <div class="row">
                <div class="col"><h4>Dolores</h4></div> 
                <div class="col"><img src="@/assets/heart.svg"> </div>
                <h3>Atun Dolores Atleta Amarilla en Agua 140g</h3>
                <h3>Precio mas bajo: <span>$18.00</span></h3> 
            </div>

            <div class="row">
                <div class="col">
                    <img src="@/assets/logos/Walmart.svg" width="80px" height="50px">
                </div>
                <div class="col">
                    $18.00
                </div>
            </div>
            <div class="row">
                <div class="col">
                    <img src="@/assets/logos/Soriana.svg" width="80px" height="50px">
                </div>
                <div class="col">
                    $19.90
                </div>
            </div>
            <div class="row">
                <div class="col">
                    <img src="@/assets/logos/Oxxo.svg" width="80px" height="50px">
                </div>
                <div class="col">
                    $22.00
                </div>
            </div>

            <div class="row">
                <button class="btn btn-primary">Agregar un precio</button>
            </div>
        </div>

    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { exampleProducts } from '../models/products'

export default defineComponent({
    setup () {
        return {
            
        }
    },
    data () {
        return{
            products: exampleProducts
        }
    }
    
})
</script>

<style scoped>

</style>