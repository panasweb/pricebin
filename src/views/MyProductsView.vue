<template>
    <div class="container">
        <h1>Mis productos</h1>
        <router-link :to="{
            name: 'get Lists'
        }">
            <button class="btn btn-primary">Ver listas pasadas</button>
        </router-link>
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
                <h2>{{toCurrency(total, store)}}</h2>
            </div>
        </div>
        <div v-for="(p, i) in products" :key="i" class="row">
            <ProductListRow :product="p" :onClick="() => deleteRow(i)" />
            <!-- <button @click="deleteRow(i)">X</button> -->
        </div>
        <div class="list-buttons">
            <router-link :to="{
                name: 'create Product'
            }">
                <button class="btn btn-primary">Agregar producto</button>
            </router-link>
            <div>
                <button class="btn btn-primary" @click="confirmClear">Limpiar Lista</button>
                <button class="btn btn-primary" @click="saveList">Guardar Lista</button>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { onBeforeMount, defineComponent, ref, computed, inject } from 'vue'
import ProductListRow from '../components/ProductListRow.vue'
import ListRecord from '../types/ListRecord'
import UserManager from '@/models/UserManager'
import { auth } from '../services/auth';
import { useRouter } from 'vue-router'
import ListManager from '@/models/ListManager';
import {toCurrency} from "@/utils/misc"
import IStore from '@/types/IStore';


export default defineComponent({
    setup() {
        const store : IStore | undefined = inject('store');

    const currentEmail = ref<string | null>(null);
        const products = ref<ListRecord[]>([])
        const id = ref<string | null| undefined>(null)
        const router = useRouter();
        
        const total = computed(() => {
            let sum = 0.0
            products.value.forEach(element => {
                sum += ((element.amount * element.quantity))
            });
            return sum;
        })

        async function fetchProducts(email: string) {
            let user = await UserManager.getByEmail(email)
            if (user) {
                products.value = user.currentList.list
                id.value = user._id
            }
            
            // else, display error
        }

        function redirect() {
            router.push({ name: 'login', replace: true });
        }

        async function confirmClear() {
            if( !auth.currentUser) {
                redirect();
                return;
            }

            if (confirm("¿Borrar toda la lista?") == true) {
                // do clear
                console.log("Clearing list...");
                await UserManager.clearList(auth.currentUser.email!);
                await fetchProducts(auth.currentUser.email!);
            } else {
                return;
            }
        }

        async function saveList() {
            if( !auth.currentUser) {
                redirect();
                return;
            }
            console.log("Salvando Lista");
            if(id.value){
                await ListManager.saveList(id.value, products.value);
                //confirmClear()
                await UserManager.clearList(auth.currentUser.email!);
                await fetchProducts(auth.currentUser.email!);
            }
            
        }

        async function deleteRow(index: number) {
            let newList = products.value.filter((p, i) => i != index); // remove 1 element from index
            if (!auth.currentUser) {
                redirect();
                return;
            }
            await UserManager.updateList(auth.currentUser.email!, newList);
            await fetchProducts(auth.currentUser.email!);
        }


        onBeforeMount(() => {
            auth.onAuthStateChanged(async (user) => {
                if (!user) {
                    redirect();
                } else {
                    currentEmail.value = user.email;
                    if (currentEmail.value) {
                        await fetchProducts(currentEmail.value);
                        /* products.value.forEach(pr => {
                            total.value += (pr.amount * pr.quantity)
                        }); */
                    }
                }
            })

        })

        return {
            store,
            total,
            products,
            deleteRow,
            confirmClear,
            saveList,
            toCurrency,
        }
    },
    components: {
        ProductListRow
    }
})
</script>

<style scoped>
.division {
    width: 100%;
    height: 50%;
    border-bottom: 3px solid black;
    border-radius: 2px;
}
</style>