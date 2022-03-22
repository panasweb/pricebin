<template>
    <form @submit.prevent="onSubmit">
        <h3>Crear Cuenta</h3>
        <label for="email">Email:</label>
        <input type="email" name="email" required v-model="email" />
        <!-- vmodel directive to have two-way communication: binding+onChange -->
        <label for="password">Contraseña:</label>
        <input type="password" name="password" required v-model="password" />
        <label for="confirmPassword">Confirma Contraseña:</label>
        <input type="confirmPassword" name="confirmPassword" required v-model="confirmPassword" />
        
        <div class="terms">
            <input name="terms" type="checkbox" v-model="acceptedTerms" />
            <label for="terms">Aceptar Términos y Condiciones</label>
        </div>
        <div class="submit">
            <button type="submit">Crear Cuenta</button>
        </div>
    </form>

</template>


<script lang="ts">
import { defineComponent, ref } from "vue"
import { validateNewPassword } from "@/utils/validation"
import {newUser} from '../firebase/auth'

export default defineComponent({

    setup() {
        const email = ref<string>("");
        const password = ref<string>("");
        const confirmPassword = ref<string>("");
        const role = ref<string>("developer")
        const acceptedTerms = ref<boolean>(false);
                const passwordError = ref<string>("");

        async function onSubmit() {
            passwordError.value = validateNewPassword(password.value);

            if (passwordError.value) {
                console.log(passwordError.value) 
            } 
            else if (password.value !== confirmPassword.value) {
                console.log("Las contraseñas no son iguales") 
            }
            else {
                console.log("Submitted");
                const res = await newUser(email.value, password.value);

                if (res.error) {
                    console.error("Algo salió mal:", res.error);
                } else {
                    // Redirigir a Home
                }

            }

        }

        return { email, password, confirmPassword, role, acceptedTerms, onSubmit }
    }
})
</script>
