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
    }
})
</script>

<style scoped>

</style>