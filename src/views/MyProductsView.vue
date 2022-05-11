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
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { onBeforeMount, defineComponent, ref } from 'vue'
import ProductListRow from '../components/ProductListRow.vue'
import ListRecord from '../types/ListRecord'
import UserManager from '@/models/UserManager'
const currentEmail = ref<string | null>(null);
import { auth } from '../services/auth';
import { useRouter } from 'vue-router'

export default defineComponent({
    setup() {
        const total = ref<number>(0)
        const products = ref<ListRecord[]>([])
        const router = useRouter();

        async function fetchProducts(email: string) {
            let user = await UserManager.getByEmail(email)
            if (user) {
                products.value = user.currentList.list
            }
            // else, display error
        }

        function redirect() {
            router.push({ name: '/login', replace: true });
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
            } else {
                return;
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
                        products.value.forEach(pr => {
                            total.value += (pr.amount * pr.quantity)
                        });
                    }
                }
            })

        })

        return {
            total,
            products,
            deleteRow,
            confirmClear
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