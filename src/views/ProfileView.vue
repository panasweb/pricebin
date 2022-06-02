<template>
<div class="container-fluid">
  <div class="profile">
      <div class="top">
            <h1>{{headline}}</h1>
            <div class="img-container">
                <img :src="avatar" alt="" class="profile-pic">
            </div>
            <div class="info">
                <h2>{{currentEmail}}</h2>
            </div>
      </div>
  </div>
  
  <div v-if="statsRender" class="statContainer">
    <div v-if="statSelected == 1">
        <h6 class="statSub">Has creado</h6>
        <h4 class="stat">{{userLogStats["nLists"]}} Listas</h4>
    </div>
    <div v-else-if="statSelected == 2">
        <h6 class="statSub">Tienes:</h6>
        <h4 class="stat">{{userLogStats["nMonths"]}}</h4>
        <h6 v-if="userLogStats['nMonths'] != 1" class="statSub">Meses en Pricebin</h6>
        <h6 v-else class="statSub">Mes en Pricebin</h6>
    </div>
    <div v-else-if="statSelected == 3">        
        <h6 class="statSub">Tienes:</h6>
        <h4 class="stat">{{userLogStats["nWeeks"]}}</h4>
        <h6 v-if="userLogStats['nWeeks'] != 1" class="statSub">Semanas en Pricebin</h6>
        <h6 v-else class="statSub">Semana en Pricebin</h6>
    </div>
    <div v-else-if="statSelected == 4">
        <h6 class="statSub">Tu gasto promedio por <u>lista</u> es de :</h6>
        <h4 class="stat">${{userLogStats["listAverage"]}}</h4>
    </div>
    <div v-else-if="statSelected == 5">
        <h6 class="statSub">Tu gasto promedio <u>mensual</u> es de :</h6>
        <h4 class="stat">${{userLogStats["monthlyAverage"]}}</h4>
    </div>
    <div v-else-if="statSelected == 6">
        <h6 class="statSub">Tu gasto promedio <u>semanal</u> es de :</h6>
        <h4 class="stat">${{userLogStats["weeklyAverage"]}}</h4>
    </div>
    <div v-else-if="statSelected == 7">
        <h6 class="statSub">Tu gasto <u>total</u> es de :</h6>
        <h4 class="stat">${{userLogStats["globalTotal"]}}</h4>
    </div>
    <div v-else-if="statSelected == 8">
        <h6 class="statSub">Te uniste a Pricebin el:</h6>
        <h4 class="stat">{{userLogStats["start"].toLocaleDateString('es-MX', {year: 'numeric', month: 'long', day: 'numeric'})}}</h4>
    </div>
    <div v-else-if="statSelected == 9">
        <h6 class="statSub">Tu tienda favorita es:</h6>
        <h4 class="stat">{{favStore}}</h4>
    </div>
    <div v-else-if="statSelected == 10">
        <h6 class="statSub">Tu producto favorito es:</h6>
        <h4 class="stat">{{favProduct}}</h4>
    </div>

    <a class="btn btn-primary btn-lg" @click="changeStat" >Siguente stat</a>
    <br><br>
    <hr>
  </div>
  
  <a v-if="!statsRender" class="btn btn-primary btn-lg" @click="getCoolStats" >Ver mis stats</a>
  <a class="btn btn-secondary btn-lg">Ver mi historial de listas</a>
    
</div>
  
</template>

<script setup lang="ts">
import { onBeforeMount, defineComponent, ref } from 'vue';
import { auth } from '../services/auth';
import { useRouter } from 'vue-router';
import UserManager from '../models/UserManager';
import { DEFAULT_AVI } from "../utils/constants";

const currentEmail = ref<string | null>(null);

const router = useRouter();
const avatar = ref<string>(DEFAULT_AVI);
const headline = ref<string>('Mi perfil');
const email = ref<string>('');
const favStore = ref<string>('');
const favProduct = ref<string>('');
let userLogStats = ref<any>({});
let statsRender = ref<boolean>(false);      
let statSelected = ref<number>(1);

function redirect() {
    router.push({ name: 'login', replace: true });
}

function changeRenderStats(): void {
    statsRender.value = !statsRender.value;
}	



onBeforeMount(() => {
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
        }
    })
})

async function getCoolStats(): Promise<void>{
    changeRenderStats();
    const userData = await UserManager.getByEmail(currentEmail.value!);
    const stats = await UserManager.getUserStats(userData!._id!);

    userLogStats.value = userData!.UserLog!
    console.log(userLogStats.value.start)
    userLogStats.value.start = new Date(userLogStats!.value.start);
    favStore.value = ("favStore" in userLogStats.value) ? userLogStats.value.favStore : "No tienes tienda favorita (aún)";
    favProduct.value = ("favProduct" in userLogStats.value) ? userLogStats.value.favProduct : "No tienes un producto favorito (aún)";
    return stats
}

function changeStat(){

    if((Object.keys(userLogStats.value).length + 2 )== statSelected.value){
        statSelected.value = 1;
    }
    else{
        statSelected.value = statSelected.value + 1;
    }
}

        
</script>

<style scoped>

.container-fluid{
    padding: 0;
}
.top{
    padding: 1rem 0;
    background: linear-gradient(180deg, #595C88 50%, #FFFFFF 50%);
}

.top h1{
    color: #FFFFFF;
    font-weight: bold;
    text-align: center;
}

.top .img-container{
    margin: 1rem auto;
    padding: 3rem;
    border-radius: 50%;
    background-color: #ffffff;
}

.top img{
    width: 160px;
}

.btn{
    display: block;
    margin: 1rem auto;
    width: 50%;
}

.statContainer{
    margin: 4rem auto;
}

.statContainer statSub{
    font-size: 1.2rem;
}

.statContainer .stat{
    font-size: 5rem;
    font-weight: bold;
}
</style>
