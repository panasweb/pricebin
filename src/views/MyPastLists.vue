<template>
    <div class="container">
        <h1>Mis Listas pasadas</h1>
        <div v-for="(list, j) in lists" :key="j"  class="row">
            <h3>My lista del {{list.date}}</h3>
            <h3>Total: {{list.total}}</h3>
            <div v-for="(p, i) in list.list" :key="i" class="row">
                <PreviousListRow :product="p"  />
                    <!-- <button @click="deleteRow(i)">X</button> -->
            </div>
            <div class="div-button">
                <button class="btn btn-primary" @click="turnToCurrent">Usar Lista</button>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { onBeforeMount, defineComponent, ref, computed } from 'vue'
import PreviousListRow from '../components/PreviousListRow.vue'
import ProductList from '@/models/classes/ProductList';
import UserManager from '@/models/UserManager';
const currentId= ref<string | null>(null);
import { auth } from '../services/auth';
import { useRouter } from 'vue-router'
import ListManager from '@/models/ListManager';
import {User} from '@/types/interfaces/User';
export default defineComponent({
    setup() {

        const lists = ref<ProductList[]>([])
        const router = useRouter();
        

        async function fetchProducts(id: string) {
            let listRecords = await ListManager.getUser(id)
            if (listRecords) {
                lists.value = listRecords
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

        async function turnToCurrent(){
            console.log("turn to current")
        }

        onBeforeMount(() => {
            auth.onAuthStateChanged(async (user) => {
                if (!user) {
                    redirect();
                } else {
                    let tempUser : User | null = await UserManager.getByEmail(user.email!)
                    if(tempUser){
                        currentId.value = tempUser._id
                        if (currentId.value) {
                            await fetchProducts(currentId.value);
                        }
                    }
                    
                }
            })

        })

        return {
            confirmClear,
            turnToCurrent,
            lists
        }
    },
    components: {
        PreviousListRow
    }
})
</script>

<style scoped>
.div-button{
    align-self: center;
}

</style>