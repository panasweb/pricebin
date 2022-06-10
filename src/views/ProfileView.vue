<template>
    <div class="container-fluid">
        <div class="profile">
            <div class="top">
                <h1>{{ headline }}</h1>
                <div class="img-container animate__animated animate__flipInY">
                    <img :src="avatar" alt="" class="profile-pic">
                </div>
                <div class="info">
                    <h2>{{ currentEmail }}</h2>
                </div>
            </div>
        </div>

        <div v-if="statsRender" class="statContainer">
            <div class="stat-container" v-if="statSelected == 1">
                <h6 class="statSub">Has creado</h6>
                <h4 class="stat">{{ userLogStats["nLists"] }} Listas</h4>
            </div>
            <div class="stat-container" v-else-if="statSelected == 2">
                <h6 class="statSub">Tienes:</h6>
                <h4 class="stat">{{ userLogStats["nMonths"] }}</h4>
                <h6 v-if="userLogStats['nMonths'] != 1" class="statSub">Meses en Pricebin</h6>
                <h6 v-else class="statSub">Mes en Pricebin</h6>
            </div>
            <div class="stat-container" v-else-if="statSelected == 3">
                <h6 class="statSub">Tienes:</h6>
                <h4 class="stat">{{ userLogStats["nWeeks"] }}</h4>
                <h6 v-if="userLogStats['nWeeks'] != 1" class="statSub">Semanas en Pricebin</h6>
                <h6 v-else class="statSub">Semana en Pricebin</h6>
            </div>
            <div class="stat-container" v-else-if="statSelected == 4">
                <h6 class="statSub">Tu gasto promedio por <u>lista</u> es de :</h6>
                <h4 class="stat">{{ toCurrency(parseInt(userLogStats["listAverage"]), store) }}</h4>
            </div>
            <div class="stat-container" v-else-if="statSelected == 5">
                <h6 class="statSub">Tu gasto promedio <u>mensual</u> es de :</h6>
                <h4 class="stat">{{ toCurrency(parseInt(userLogStats["monthlyAverage"]), store) }}</h4>
            </div>
            <div class="stat-container" v-else-if="statSelected == 6">
                <h6 class="statSub">Tu gasto promedio <u>semanal</u> es de :</h6>
                <h4 class="stat">{{ toCurrency(parseInt(userLogStats["weeklyAverage"]), store) }}</h4>
            </div>
            <div class="stat-container" v-else-if="statSelected == 7">
                <h6 class="statSub">Tu gasto <u>total</u> es de :</h6>
                <h4 class="stat">{{ toCurrency(parseInt(userLogStats["globalTotal"]), store) }}</h4>
            </div>
            <div class="stat-container" v-else-if="statSelected == 8">
                <h6 class="statSub">Te uniste a Pricebin el:</h6>
                <h4 class="stat">{{ userLogStats["start"].toLocaleDateString('es-MX', {
                        year: 'numeric', month: 'long',
                        day: 'numeric'
                    })
                }}</h4>
            </div>
            <div class="stat-container" v-else-if="statSelected == 9">
                <h6 class="statSub">Tu tienda favorita es:</h6>
                <h4 class="stat">{{ favStore }}</h4>
            </div>
            <div class="stat-container" v-else-if="statSelected == 10">
                <h6 class="statSub">Tu producto favorito es:</h6>
                <h4 class="stat">{{ favProduct }}</h4>
            </div>

            <a class="btn btn-primary btn-lg" @click="changeStat">Siguente stat</a>
            <br><br>
            <hr>
        </div>

        <button v-if="!statsRender" class="btn btn-primary btn-lg" @click="showCoolStats">
            <n-spin :show="isLoading" size="small" stroke="#fff">
                <p>Ver mis stats</p>
            </n-spin>
        </button>
        <router-link class="nav-link cta" :to="{ name: 'get Lists' }">
            <a class="btn btn-primary btn-lg">Ver listas pasadas</a>
        </router-link>

        <router-link v-if="isAdmin" class="nav-link cta" :to="{name: 'add store'}">
                <a class="btn btn-primary btn-lg">Agrega nueva tienda</a>
        </router-link>

        <div class="config">
            <h4>Configuración</h4>
            <div class="child">
                <p>Divisa: </p>
                <div class="currency-select-container">
                    <CurrencySelect />
                </div>
            </div>
        </div>
        

    </div>

</template>

<script setup lang="ts">
import { onBeforeMount, ref, inject, onMounted } from 'vue';
import { auth } from '../services/auth';
import { useRouter } from 'vue-router';
import UserManager from '../models/UserManager';
import { DEFAULT_AVI, ADMIN_RANK } from "../utils/constants";
import { toCurrency } from '@/utils/misc';
import IStore from "@/types/IStore";
import { NSpin } from "naive-ui";
import CurrencySelect from "../components/CurrencySelect.vue"



const store: IStore | undefined = inject('store');
const currentEmail = ref<string | null>(null);
const router = useRouter();
const avatar = ref<string>(DEFAULT_AVI);
const headline = ref<string>('Mi perfil');
const favStore = ref<string>('');
const favProduct = ref<string>('');
const userLogStats = ref<any>({});
const statsRender = ref<boolean>(false);
const isLoading = ref<boolean>(false);
const statSelected = ref<number>(1);
const isAdmin = ref<boolean>(false);

function redirect() {
    router.push({ name: 'login', replace: true });
}

function togleRenderStats(): void {
    statsRender.value = !statsRender.value;
}



 onBeforeMount(async () => {
    auth.onAuthStateChanged(async (user) => {
        if (!user) {
            redirect();
        } else {
            const currentUser = await UserManager.getByEmail(user.email!);
            currentEmail.value = user.email;
            headline.value = "Perfil de " + user.displayName;
            if (currentUser?.avatar) {
                avatar.value = currentUser.avatar;
                console.log(user)
                console.log(currentUser)
            }
            // get stats
            console.log("Mounted profile")
            isLoading.value = true;
            await getCoolStats();
            console.log("stats returned");
            isLoading.value = false;
        }
    })
    // Set Admin Privileges
    const adminUser = await UserManager.getByEmail(auth.currentUser!.email!);
    if (!adminUser) {
        console.error("ERROR: CURRENT USER NOT EXISTS IN MONGO");
        return;
    }
    isAdmin.value = adminUser.rank === ADMIN_RANK
    console.log("isAdmin?", isAdmin.value);
})


function showCoolStats(): void {
    togleRenderStats();
}

async function getCoolStats(): Promise<void> {
    const userData = await UserManager.getByEmail(currentEmail.value!);
    const stats = await UserManager.getUserCoolStats(userData!._id!);

    userLogStats.value = userData!.UserLog!
    userLogStats.value.start = new Date(userLogStats!.value.start); // default to now() if no .start
    favStore.value = stats["favStore"] ? stats["favStore"] : "No tienes tienda favorita (aún)";
    favProduct.value = stats["favProduct"] ? stats["favProduct"] : "No tienes un producto favorito (aún)";
    // API returns null if no lists 
}

function changeStat() {

    if ((Object.keys(userLogStats.value).length + 2) == statSelected.value) {
        statSelected.value = 1;
    }
    else {
        statSelected.value = statSelected.value + 1;
    }
}


</script>

<style scoped>
.container-fluid {
    padding: 0;
}

.top {
    padding: 1rem 0;
    background: linear-gradient(180deg, #595C88 50%, #FFFFFF 50%);
}

.top h1 {
    color: #FFFFFF;
    font-weight: bold;
    text-align: center;
}

.top .img-container {
    margin: 1rem auto;
    padding: 3rem;
    border-radius: 50%;
    background-color: #ffffff;
}

.top img {
    width: 160px;
}

.btn {
    display: block;
    margin: 1rem auto;
    width: 50%;
}

.statContainer {
    margin: 4rem auto;
}

.statContainer .statSub {
    font-size: 1.2rem;
}

.statContainer .stat {
    font-size: 5rem;
    font-weight: bold;
}

.config {
    padding: 2rem;
    border: 1px #595C88 solid;
    max-width: 50%;
    margin: 4rem auto;
    border-radius: 0.5rem;
}

.config h4 {
    text-align: left;
    margin-bottom: 2rem;
}

.config .child {

    display: flex;
}

.config p {
    font-weight: bold;
}

.stat-container {
    min-height: 250px;
}

.currency-select-container {
    width: 12%;
    display: flex;
    margin-left: 1rem;
}
@media (max-width: 426px) {
    .config {
        max-width: 90%;
    }
}
</style>
