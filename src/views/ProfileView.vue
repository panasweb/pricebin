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

function redirect() {
    router.push({ name: 'login', replace: true });
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
    display: inline-block;
    margin: 1rem auto;
    padding: 3rem;
    border-radius: 50%;
    background-color: #ffffff;
}

.top img{
    width: 160px;
}
</style>
