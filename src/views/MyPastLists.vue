<template>
    <div class="container">
        <h1 style="margin-top: 30px; margin-bottom: 30px;">Mis listas pasadas</h1>
        <div v-for="(list, j) in lists" :key="j"  class="row">
            <NCollapse arrow-placement="right">
                <div class="list-card animate__animated animate__fadeInUp animate__faster">
                    <div class="list-card-row">
                        <p>Mi lista del {{dateToString(list.date)}}</p>
                        <p>Total: <b>{{toCurrency(list.total,store)}}</b></p>
                        <p>Productos: {{list.list.length}}</p>
                    </div>
                    <div class="list-card-row">
                        <NCollapseItem  title="Ver productos">
                            <div v-for="(p, i) in list.list" :key="i" class="row">
                                <PreviousListRow :product="p"  />
                            </div>
                        </NCollapseItem>
                    </div>
                    
                </div>
            </NCollapse>
        </div>
    </div>
</template>

<script lang="ts">

import { onBeforeMount, defineComponent, ref } from 'vue'
import ProductList from '@/models/classes/ProductList';
import UserManager from '@/models/UserManager';
const currentId= ref<string | null>(null);
import { auth } from '../services/auth';
import { useRouter } from 'vue-router'
import ListManager from '@/models/ListManager';
import PreviousListRow from '../components/PreviousListRow.vue'
import {  toCurrency } from "@/utils/misc";
import {User} from '@/types/interfaces/User';
import IStore from '@/types/IStore';
import {inject} from 'vue';
import {NCollapse, NCollapseItem} from 'naive-ui';

export default defineComponent({
    setup() {

        const lists = ref<ProductList[]>([])
        const router = useRouter();
        const store : IStore | undefined = inject('store'); 
        

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

        function dateToString(date: string) {
            console.log(typeof date)
            let newDate = new Date(date)
            return newDate.toLocaleDateString('es-ES', {
                day: 'numeric', year: 'numeric',
                month: 'short'
            })

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
                    if(tempUser && tempUser._id) {
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
            lists,
            toCurrency, 
            store, 
            dateToString

        }
    },
    components: {
        NCollapse,
        NCollapseItem, 
        PreviousListRow
    }
})
</script>

<style scoped>
.div-button{
    align-self: center;
}
.list-card{
    margin: 10px;
    padding: 20px;
    box-shadow: 0 2px 2px 0px #888888;
    justify-content: space-between;	
    align-content: center;
    display: flex;
    flex-direction: column;
    border-radius: 0.5rem;
}
.collapse{
    width: 100%;
    height: 25px;
}

.list-card-row{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width:  100%;

}

.n-collapse-item {
    width: 100%;
}

</style>