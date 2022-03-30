<template>
    <div>
        <p v-if="loggedIn">Logged in as {{currentEmail}}</p>
        <p v-else>No current user</p>
        <div class="">
            <button>
                <span v-show="loggedIn" @click="doLogout">Log out</span>
                <span v-show="!loggedIn" @click="doLogin">Log in</span>
            </button>
        </div>
        <!-- <AddProduct /> -->
    </div>
</template>

<script lang="ts">
import { defineComponent, onBeforeMount, ref } from 'vue'
import {auth, logIn, logOut} from '../firebase/auth';
import AddProduct from '../components/AddProduct.vue'

export default defineComponent({
    components: {
        // AddProduct
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

        async function doLogout() {
            console.log('logging out...')
            const res = await logOut();
            console.log(res);
        }

        async function doLogin() {
            console.log('logging in...');
            const res = await logIn('ericjardon@hotmail.com', '1234567');
            console.log(res);
        }

        return { loggedIn, currentEmail, doLogin, doLogout }
    }
})
</script>

<style scoped>

</style>