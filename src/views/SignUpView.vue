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
                <button class="btn btn-primary w-100" type="submit">Crear Cuenta</button>
            </div>
             <router-link to="/login" class="form-link">¿Ya tienes una cuenta? <span>Ingresa</span></router-link> 
        </form>
    </div>
</template>
<style scoped>
    @import '../styles/Form.css';
</style>>



<script lang="ts">
    import {
        defineComponent,
        ref
    } from "vue"
    import {
        useRouter
    } from 'vue-router'
    import {
        validateNewPassword
    } from "@/utils/validation"
    import {
        newUser
    } from '../firebase/auth'

    export default defineComponent({

        setup(props, ctx) {
            const router = useRouter();

            const email = ref < string > ("");
            const password = ref < string > ("");
            const confirmPassword = ref < string > ("");
            const role = ref < string > ("developer")
            const acceptedTerms = ref < boolean > (false);
            const passwordError = ref < string > ("");


            function redirect() {
                console.log("Redirecting")
                router.push({
                    name: 'home',
                    replace: true
                })
            }

            async function onSubmit() {
                passwordError.value = validateNewPassword(password.value);

                if (passwordError.value) {
                    console.log(passwordError.value)
                } else if (password.value !== confirmPassword.value) {
                    console.log("Las contraseñas no son iguales")
                } else {
                    console.log("Submitted");
                    const res = await newUser(email.value, password.value);

                    if (res.error) {
                        console.error("Algo salió mal:", res.error);
                    } else {
                        // Redirigir a Home
                        redirect()
                    }
                }
            }

            return {
                email,
                password,
                confirmPassword,
                role,
                acceptedTerms,
                onSubmit
            }
        }
    })
</script>