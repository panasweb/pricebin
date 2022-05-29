<template>
    <div class="container">
        <h1>Mis Listas pasadas</h1>
        <div v-for="(list, j) in lists" :key="j"  class="row">
            <h3>My lista del {{list.saveDate}}</h3>
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
import PastRecord from '../types/PastRecord'
import UserManager from '@/models/UserManager'
const currentEmail = ref<string | null>(null);
import { auth } from '../services/auth';
import { useRouter } from 'vue-router'

export default defineComponent({
    setup() {

        const lists = ref<PastRecord[]>([])
        const router = useRouter();
        

        async function fetchProducts(email: string) {
            let user = await UserManager.getByEmail(email)
            if (user) {
                lists.value = user.pastList
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
                    currentEmail.value = user.email;
                    if (currentEmail.value) {
                        await fetchProducts(currentEmail.value);

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