<template>
    <div>
        <div class="price-container">
            <ProductCardSquare v-for="p in products" :key="p.id" :product="p" />
            <ProductCardSquare v-for="p in products" :key="p.id" :product="p" />
            <ProductCardSquare v-for="p in products" :key="p.id" :product="p" />
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, onBeforeMount, onMounted, ref } from 'vue'
import ProductCardSquare from '../components/ProductCardSquare.vue'
import { exampleProducts } from '@/models/products';
import { Product } from '@/types/Product';

export default defineComponent({
    components: {
        ProductCardSquare
    },
    setup() {

        const products = ref<Product[]>([]);
        
        function fetchProducts() {
            products.value = exampleProducts;
        }

        onBeforeMount(()=>{
            fetchProducts();
        })

        return {products};
    },
})
</script>

<style>
.price-container {
    width:100%;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    padding: 20px 80px;
}

@media(max-width:426px) {
    .price-container {
        padding: 0;
        flex-direction: column;
        justify-content: center;
        flex-wrap: nowrap;
        align-items: center;
    }
}

</style>