<template>

        <AddToList :title="'Añadir a mi lista'"/>

</template>

<script lang="ts">
/**
 * 
 * TEMPORARY VIEW TO ADD PRODUCTS TO A USER CURRENT LIST
 * 
 */
import { defineComponent, onBeforeMount, ref } from 'vue'
import {auth} from '../services/auth';
import AddToList from '../components/AddToList.vue'

export default defineComponent({
    name: 'NewProductView',
    components: {
        AddToList
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