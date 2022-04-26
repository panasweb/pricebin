<template>
    <div class="form-wrapper">
        <form @submit.prevent="onSubmit">
            <img class="logo" src="../assets/logo.svg" alt="Pricebin logo">
            <h4 class="subtitle">Crea tu cuenta para PriceBin</h4>
            <label for="email">Email:</label>
            <input type="email" name="email" required v-model="email" />

            <label for="password">Contraseña:</label>
            <input type="password" name="password" required v-model="password" />

            <label for="confirmPassword">Confirma Tu Contraseña:</label>
            <input type="password" name="confirmPassword" required v-model="confirmPassword" />

            <div class="terms form-check">
                <input class="form-check-input" name="terms" type="checkbox" v-model="acceptedTerms" />
                <label class="form-check-label" for="terms">Acepto Los Términos y Condiciones</label>
            </div>
            <div class="submit">
                <button class="btn btn-primary w-100" type="submit">
                    <n-spin :show="isLoading" size="small" stroke="#fff">
                        <p>Crear Cuenta</p>
                    </n-spin>
                </button>
                <n-alert v-show="showAlert" title="Error" type="error">
                    {{ alertMessage }}
                </n-alert>
            </div>
            <router-link to="/login" class="form-link">¿Ya tienes una cuenta? <span>Ingresa</span></router-link>
        </form>
    </div>
</template>
<style scoped>
@import '../styles/Form.css';
</style>>



<script setup lang="ts">
import { defineComponent, ref } from "vue"
import { useRouter } from 'vue-router'
import { validateNewPassword } from "@/utils/validation"
import { newUser } from '../services/auth'
import { NAlert, NSpin } from "naive-ui";

const router = useRouter();
const email = ref<string>("");
const password = ref<string>("");
const confirmPassword = ref<string>("");
const acceptedTerms = ref<boolean>(false);
const passwordError = ref<string>("");

const alertMessage = ref<string>("");
const showAlert = ref<boolean>(false);
const isLoading = ref<boolean>(false);


function redirect() {
    console.log("Redirecting")
    router.push({
        name: 'home',
        replace: true
    })
}

async function onSubmit() {
    if (isLoading.value) return;
    console.log("Sign up", email.value)
    showAlert.value = false;

    passwordError.value = validateNewPassword(password.value);

    if (passwordError.value) {
        showAlert.value = true;
        alertMessage.value = "Sugerimos una contraseña mayor a 6 caracteres";
    } else if (password.value !== confirmPassword.value) {
        showAlert.value = true;
        alertMessage.value = "Las contraseñas no coinciden :(";
    } else {
        isLoading.value = true;
        console.log("Submitted");
        const res = await newUser(email.value, password.value);
        isLoading.value = false;
        if (res.error) {
            showAlert.value = true;
            console.log("Error:", res.error);
            if (res.error === 'auth/email-already-in-use') {
                alertMessage.value = "El correo " + email.value +" ya está en uso.";
            } else {
                alertMessage.value = "Algo salió mal, por favor intenta de nuevo.";
            }
        } else {
            // Redirigir a Home
            redirect()
        }
    }
}

</script>