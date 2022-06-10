<!-- Formulario para subir un precio/producto/marca a la base, sea para un producto existente o nuevo -->
<template>
    <div class="container">
        <form @submit.prevent="onSubmit">
            <div class="headline">
                <h2>Registrar Tienda</h2>
            </div>

            <label for="productType">Nombre:</label>
            <input
                type="text"
                v-model="name"
                placeholder="Nombre de la tienda"
            />

            <label for="product">Latitud:</label>
            <input 
                v-model="lat" 
                type="text" 
                placeholder="19.0"
            />

            <label for="brand">Longitud:</label>
            <input 
                v-model="lon" 
                type="text" 
                placeholder="-19.0"
            />

            <label for="brand">Colonia:</label>
            <input 
                v-model="colonia" 
                type="text" 
                placeholder="Coapa"
            />

            <label for="store">Link logo:</label>
            <input 
                v-model="logo" 
                type="text" 
                placeholder="https://link-a-tu-logo.png"
            />
            <!-- Add img selector -->

            <FormAlert :msg="alertMsg" />

            <div class="submit">
                <button class="btn btn-primary w-100" type="submit">Registrar Precio</button>
            </div>
        </form>
        <UnverifiedUserModal v-model:show="showModal" @close="onCloseModal"/>
    </div>
</template>

<script lang="ts">
import FormAlert from './FormAlert.vue'
import { defineComponent, onMounted, onBeforeMount, ref, PropType, inject } from 'vue'
import Store from '@/types/interfaces/Store'
import StoreManager from '@/models/StoreManager'
import UserManager from '@/models/UserManager'
import { useRouter, useRoute } from 'vue-router'
import { auth } from '../services/auth'
import IStore from '@/types/IStore'
import UnverifiedUserModal from '@/components/UnverifiedUserModal.vue'


export default defineComponent({
    components: {
        FormAlert,
        UnverifiedUserModal
    },
    props: {
        title: { type: String as PropType<string>, required: false }
    },
    setup(props: any) {

        // DB data
        const showModal = ref(false);

        // Store data
        const store: IStore | undefined = inject('store');

        // Prefill from route params
        const route = useRoute();
        let prefill: any = null;

        // Form control
        const lat = ref<string>('');
        const lon = ref<string>('');
        const name = ref<string>('');
        const colonia = ref<string>('');
        const logo = ref<string>('');

        // Form Validation
        const alertMsg = ref<string>('');
        const router = useRouter();


        // Hooks
        onBeforeMount(() => {
            auth.onAuthStateChanged((currentUser) => {
                if (!currentUser) {
                    redirectToLogin();
                }
            })
        })

        // Methods
        function redirect(route: string) {
            router.push('/products')
        }

        function isNumeric(n: string) {
            return !isNaN(parseFloat(n)) && isFinite(n);
        }

        function redirectToLogin() {
            router.push('/login');
        }

        function isVerified(): boolean {
            return store?.currentUser?.verified || false;
        }


        // Modal-related
        function onCloseModal(): void {
            showModal.value = false
        }

        function doShowModal() {
            showModal.value = true;
        }

        // On Form submit
        async function onSubmit(): Promise<void> {
            alertMsg.value = '';

            // Verified check
            if (!isVerified()) {
                doShowModal();
                return;
            }


            if (!name.value) {
                console.error("No Store name introduced");
                alertMsg.value = "Ingresa el nombre de la tienda."
                return;
            }

            if (!lat.value) {
                console.error("No latitude");
                alertMsg.value = "Ingresa la latitud."
                return;
            }
            
            if (!isNumeric(lat.value)){
                console.error("Latitude is not a number");
                alertMsg.value = "La latitud debe ser un número."
                return;
            }

            if (!lon.value) {
                console.error("No latitude");
                alertMsg.value = "Ingresa la latitud."
                return;
            }

            if (!isNumeric(lon.value)){
                console.error("longitude is not a number");
                alertMsg.value = "La longitud debe ser un número."
                return;
            }

            if (!colonia.value) {
                console.error("No hay una colonia");
                alertMsg.value = "Ingresa la colonia."
                return;
            }


            let storeName = name.value.trim();
            let latitude = parseInt(lat.value.trim());
            let longitude = parseInt(lon.value.trim());
            let col = colonia.value.trim();

            // Find store by name. Create if not exists
            let store: Store | null = await StoreManager.getByName(storeName);
            
            if(store){
                console.log("Store already exists");
                alertMsg.value = "La tienda ya existe."
                return;
            }
            if (!store) {
                console.log(`Store ${storeName} not found. Creating store...`);

                const [created, newStore] = await StoreManager.create({ name: storeName, location: [latitude, longitude], branch: col, logo: logo.value });

                if (created) {
                    store = newStore as Store;
                } else {
                    console.log("Error creating store");
                    return;
                }
            } 
        }

        return {
            name, lat, lon, colonia, logo, onSubmit, showModal, onCloseModal, alertMsg
        }

    }
})
</script>

<style>
.quantity-wrapper {
    display: flex;
    flex-direction: row;
    width: 50%;
}

.more-less-button {
    color: #595c88;
    border: solid;
    border-color: #595c88;
    font-weight: bold;
    font-size: 25px;
    background-color: transparent;
    text-align: center;
    min-width: 50px;
    height: 50px;
    border-radius: 5px;
}

@media only screen and (max-width: 700px) {
    form {
        padding: 30px;
    }

}
</style>