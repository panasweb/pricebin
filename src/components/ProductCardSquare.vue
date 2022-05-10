<template>
    <div class="dummy-container">
        <router-link :to="`/product/${product._id}`">
            <div class="price-card">
                <div class="price-card-content">
                    <div class="card-image" :style="{ 'background-image': `url(${productImg})` }"></div>

                    <div class="card-body">
                        <div class="card-info">
                            <h4 class="product-title">{{ product.name }}</h4>
                            <div class="product-info">
                                <span class="product-type-pill">{{ product.type }}</span>
                                <span class="num-prices">{{ product.prices.length }} precios</span>
                            </div>
                        </div>

                        <div class="card-actions">
                            <!-- Manda a Registrar Precio, pre-llenado -->
                            <router-link
                                :to="`/product/${product._id}`"
                            >
                                <button type="button" class="btn btn-light">Ver precios</button>
                            </router-link>
                            <router-link
                                :to="{
                                    name: 'add price',
                                    params: {
                                        prefill: productFormData
                                    }
                                }"
                            >
                                <button type="button" class="btn btn-dark">Registrar</button>
                            </router-link>
                        </div>
                    </div>
                </div>
            </div>
        </router-link>
    </div>
    <!-- Mostrar nombre, precios -->
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { DEFAULT_PRODUCT_IMG } from '@/utils/constants'
import { Product } from '@/types/interfaces/Product';

export default defineComponent({
    props: {
        product: {
            type: Object as ()=> Product,
            required: true,
        }
    },
    setup(props) {
        // collect information for adding price
        const objectData: any = {
            productName: props.product.name,
            brandName: props.product.brand,
            productType: props.product.type,
            productId: props.product._id || null
        }
        const productImg = ref<string>(props.product.img ?? DEFAULT_PRODUCT_IMG);

        const productFormData = ref<string>(JSON.stringify(objectData));
        return { productFormData, productImg }
    }
})
</script>

<style>
.dummy-container {
    height: 350px;
    width: 300px;
}
.price-card {
    position: absolute;
    width: 300px;
    height: auto;
    border-radius: 25px;
    background-color: white;
    box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
    margin-top: 10px;
    transition: all 0.2s ease-out;
}
.price-card:hover {
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
    margin-top: 0;
}
.card-image {
    width: 100%;
    height: 100px;
    border-radius: 25px 25px 0 0;
    margin-top: 0px;
    background-repeat: no-repeat;
    background-size: contain;
    background-position: center;
}
.card-info {
    padding: 10px;
}
.product-title {
    font-size: 16px;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    overflow: hidden;
    -webkit-line-clamp: 2;
    margin-bottom: 2px;
    margin: 0 12px;
    font-weight: 600;
}
.product-info {
    width: 80%;
    display: inline-flex;
    justify-content: space-between;
    padding: 10px;
}
.card-actions {
    width: 90%;
    display: inline-flex;
    justify-content: space-between;
    bottom: 0;
    margin: 0 auto;
}
.card-body {
    height: calc(100% - 100px);
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}
.price-card-content{
    padding: 10px 0;
}
</style>