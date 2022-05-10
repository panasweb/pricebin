<template>

        <RegisterPrice :title="'Añadir a mi lista'"/>

</template>

<script lang="ts">
/**
 * 
 * TEMPORARY VIEW TO ADD PRODUCTS TO A USER CURRENT LIST
 * 
 */
import { defineComponent, onBeforeMount, ref } from 'vue'
import {auth, logIn, logOut} from '../services/auth';
import RegisterPrice from '../components/RegisterPrice.vue'

export default defineComponent({
    name: 'NewProductView',
    components: {
        RegisterPrice
    },

    setup () {
        const loggedIn = ref<boolean>(false);
        const currentEmail = ref<string | null>(null);

        onBeforeMount(() => {
            // Setup a listener that persists throughout component lifecycle
            auth.onAuthStateChanged(user => {
                if (!user) {
                    loggedIn.value = false;
                } else {
                    loggedIn.value = true;
                    currentEmail.value = user.email;
                }
            })
        })


        return { loggedIn, currentEmail }
    }
})
</script>

<style scoped>

</style>