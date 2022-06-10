<template>
    <div>
        <div v-if="isSuperUser()">
            <h3>
                Consola de Administrador
            </h3>
            <div>
                Usuarios
                <div v-for="(user, i) in users" :key="i">
                    {{ user.email }}
                    <button @click="() => deleteUser(i)">Borrar</button>
                </div>
            </div>
        </div>
        <div v-else>
            No encontramos lo que estás buscando.<br />
            <button @click="redirectHome">Regresar a Home</button>
        </div>
    </div>
</template>

<script setup lang="ts">
import { User } from '@/types/IStore';
import { inject, onBeforeMount, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router';
import { auth, logOut } from '@/services/auth';
import IStore from '@/types/IStore';
import UserManager from '@/models/UserManager';
import CurrencySelect from '@/components/CurrencySelect.vue';
import { NMessageProvider, useMessage } from 'naive-ui';
import { SUPERUSER } from '@/utils/constants'

const router = useRouter();
const users = ref<User[]>([]);
const isLoading = ref<boolean>(true);
const store: IStore | undefined = inject('store');
const message = useMessage();

function redirectHome() {
    router.push({ name: "home", replace: true });
}

onBeforeMount(async () => {
    // If not superuser, show redirect to 404
    console.log("Mount")
    await fetchUsers();
})

function isSuperUser() {
    return store ? store.currentUser?.email === SUPERUSER : false;
}

async function fetchUsers() {
    users.value = await UserManager.getAll();
}

async function deleteUser(index: number) {
    console.log("Try delete",users.value[index].email );
    if (confirm(`¿Borrar usuario? ${users.value[index].email}`) == true) {
        const api_res = await UserManager.deleteByID(users.value[index]._id);
        if (!api_res) {
            message.error("No se pudo borrar usuario.");
        }else {
            await fetchUsers();
        }        
    }
}

</script>

<style scoped>
</style>