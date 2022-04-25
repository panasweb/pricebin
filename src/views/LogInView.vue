<template>
    <div class="form-wrapper">
    <form @submit.prevent="onSubmit">
        <img class="logo" src="../assets/logo.svg" alt="Pricebin logo">
        <h4 class="subtitle">Inicia sesión</h4>
        <label for="email">Email:</label>
        <input type="email" name="email" required v-model="email" />

        <label for="password">Contraseña:</label>
        <input type="password" name="password" required v-model="password" />
        <div class="submit">
            <button class="btn btn-primary w-100" type="submit">Iniciar Sesión</button>
        </div>
                     <router-link to="/register" class="form-link">¿Nuevo en el barrio? <span>Registrate</span></router-link> 
    </form>
    </div>
</template>


<script setup lang="ts">

import { logIn } from "@/services/auth";
import { ref } from "vue"
import { useRouter } from "vue-router"
const router = useRouter();
const email = ref<string>("");
const password = ref<string>("");

function redirect() {
    router.push({name: 'home', replace:true});
}

async function onSubmit() {
    console.log("Logging in", email);
    
    const loginResponse = await logIn(email.value, password.value);

    if (loginResponse.success) {
        redirect();
    } else {
        console.error("Error logging in", loginResponse.error);
    }
}

/*
script setup is syntactic sugar for better performance and less boilerplate
defineProps and defineEmits are automatically available. No need to 'return' anything.
  these are compiler macros only usable inside script setup.

>> https://vuejs.org/api/sfc-script-setup.html#typescript-only-features

*/
</script>
