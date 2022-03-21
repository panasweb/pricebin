<template>
    <form @submit.prevent="onSubmit">
        <h3>Inicia sesión</h3>
        <label for="email">Email:</label>
        <input type="email" name="email" required v-model="email" />

        <label for="password">Contraseña:</label>
        <input type="password" name="password" required v-model="password" />
        <div class="submit">
            <button type="submit">Iniciar Sesión</button>
        </div>
    </form>

</template>


<script lang="ts">
import { defineComponent, ref } from "vue"

export default defineComponent({

    setup() {
        const email = ref<string>("");
        const password = ref<string>("");

        function onSubmit() {
            console.log("Submitted!");
        }

        return { email, password, onSubmit }
    }
})
</script>
