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
                <button class="btn btn-primary w-100" type="submit">
                    <n-spin :show="isLoading" size="small" stroke="#fff">
                        <p>Iniciar Sesión</p>
                    </n-spin>
                </button>
                
                <GoogleSignInButton @click="googleSignIn"/>

                <n-alert v-show="showAlert" title="Error Text" type="error">
                    {{ alertMessage }}
                </n-alert>
            </div>
            <router-link to="/register" class="form-link">¿Nuevo en el barrio? <span>Registrate</span></router-link>
        </form>
    </div>
</template>


<script setup lang="ts">
import { auth, logIn } from "@/services/auth";
import { onAuthStateChanged } from "@firebase/auth"
import { ref, onBeforeMount } from "vue"
import { useRouter } from "vue-router"
import { NAlert, NSpin } from "naive-ui";
import GoogleSignInButton from '@/components/GoogleSignInButton.vue'

onBeforeMount(() => {

    onAuthStateChanged(auth, (user) => {
        if (user) {
            console.log("already signed in");
            redirect();
        }
    })
})

const router = useRouter();
const email = ref<string>("");
const password = ref<string>("");
const alertMessage = ref<string>("");
const showAlert = ref<boolean>(false);
const isLoading = ref<boolean>(false);

function redirect() {
    router.push({ name: 'home', replace: true });
}

async function onSubmit() {
    if (isLoading.value) return;
    console.log("Logging in", email.value);
    showAlert.value = false;
    isLoading.value = true;

    const loginResponse = await logIn(email.value, password.value);
    isLoading.value = false;
    if (loginResponse.success) {
        redirect();
    } else {
        showAlert.value = true;
        alertMessage.value = "Usuario / Contraseña incorrectos"
        console.error("Error logging in", loginResponse.error);
    }
}

async function googleSignIn() {
    console.log("Sign in Google");
}

/*
script setup is syntactic sugar for better performance and less boilerplate
defineProps and defineEmits are automatically available. No need to 'return' anything.
  these are compiler macros only usable inside script setup.

>> https://vuejs.org/api/sfc-script-setup.html#typescript-only-features

*/
</script>
