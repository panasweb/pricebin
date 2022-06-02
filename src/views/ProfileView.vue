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
  
  <div v-if="statsRender">
      <h4>Tienda favorita: {{favStore}}</h4>
      <h4>Articulo favorito: {{favProduct}}</h4>
      <a class="btn btn-primary btn-lg" @click="changeRenderStats" >Ocultar mis stats</a>
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

let statsRender = ref<boolean>(false);      

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
    console.log(currentEmail.value);
    const userData = await UserManager.getByEmail(currentEmail.value!);
    const stats = await UserManager.getUserStats(userData!._id!); 
    favStore.value = stats["favStore"];
    favProduct.value = stats["favProduct"];
    return stats
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
</style>
