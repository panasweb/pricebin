<template>
    <div class="container">
        <h1>Mis productos</h1>
        <div class="row">
            <div class="col-2">
                <h2>Hoy</h2>
            </div>
            <div class="col-8">
                <div class="division">
                </div>
            </div>
            <div class="col-2">
                <!-- Renderear la sumatoria total de los productos -->
                <h2>${{ total }}</h2>
            </div>
        </div>
        <div v-for="p in products" :key="p.productName" class="row">
            <ProductListRow :product="p"/>
        </div>

        <div class="row">
            <router-link
                :to="{
                    name: 'create Product'
                }"
            >
                <button class="btn btn-primary" >Agregar producto</button> 
            </router-link>
            
        </div>
    </div>
</template>

<script lang="ts">
import { onBeforeMount, defineComponent, onMounted, ref } from 'vue'
import { exampleProductRecords} from '../models/exampleProducts'
import ProductListRow from '../components/ProductListRow.vue'
import ListRecord from '../types/ListRecord'
import { onAuthStateChanged } from "@firebase/auth"
import ProductManager from '@/models/ProductManager';
import UserManager from '@/models/UserManager'
const loggedIn = ref<boolean>(false);
const currentEmail = ref<string | null>(null);
import { auth } from '../services/auth';

export default defineComponent({
    setup(){
        const total = ref<number>(0)
        const products = ref<ListRecord[]>([])
        
        async function fetchProducts(email: string ) {
            let user = await UserManager.getByEmail(email)
            if(user){
                products.value = user.currentList.list
            }
            
        }

        onBeforeMount(()=>{
            auth.onAuthStateChanged(async (user) => {
                if (!user) {
                    loggedIn.value = false;
                } else {
                    loggedIn.value = true;
                    currentEmail.value = user.email;
                    if(currentEmail.value){
                        await fetchProducts(currentEmail.value);
                        products.value.forEach(pr => {
                        total.value += (pr.amount * pr.quantity)
                    });
                    }
                }
            })
            
        })

        return {
            total, 
            products
        }
    },
    components:{
        ProductListRow
    }
})
</script>

<style scoped>
    .division{
        width: 100%;
        height: 50%;
        border-bottom: 3px solid black;
        border-radius: 2px;
    }
</style>