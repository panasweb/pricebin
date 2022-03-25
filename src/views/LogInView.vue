<template>
    <form @submit.prevent="onSubmit">
        <h3>Inicia sesión</h3>
        <label for="email">Email:</label>
        <input type="email" name="email" required v-model="email" />

        <label for="password">Contraseña:</label>
        <input type="password" name="password" required v-model="password" />
        <div class="submit">
            <button class="btn btn-primary w-100" type="submit">Iniciar Sesión</button>
        </div>
    </form>

</template>


<script lang="ts">
import { defineComponent, ref } from "vue"
import {useRouter} from "vue-router"
import {logIn} from '../firebase/auth'

export default defineComponent({

    setup(props, ctx) {
        const router = useRouter();

        const email = ref<string>("");
        const password = ref<string>("");

        async function onSubmit() {
        console.log('logging in...');
        const res = await logIn(email.value, password.value);

        function redirect() {
            router.push({ name: 'home', replace: true })
        }
        
        if (res.success) {
            redirect();

        } else {
            console.error("Error logging in", res.error);
            // show feedback
        }

        }

        return { email, password, onSubmit }
    }
})
</script>
