<template>
    <div class="dummy-container">
        <router-link :to="`/product/${product.id}`">
            <div class="price-card">
                <div class="card-image" :style="{'background-image': `url(${productImg})`}"></div>

                <div class="card-info">
                    <h4 class="product-title">{{product.name}}</h4>
                    <div class="product-info">
                        <span class="product-type-pill">{{product.type}}</span>
                        <span class="num-prices">{{ product.prices.length }} precios</span>
                    </div>
                </div>

                <div class="card-actions">
                    <!-- Manda a Registrar Precio, pre-llenado -->
                    <router-link :to="{
                        name:'add price',
                        params: {
                            prefill: productFormData
                        }
                    }">
                        <button>Agregar precio</button>
                    </router-link>
                    <!-- Mostaría un modal con lista de precios a añadir -->
                    <button>Añadir a lista</button>
                </div>
            </div>
        </router-link>
    </div>
    <!-- Mostrar nombre, precios -->
</template>

<script lang="ts">
import { Product } from '@/types/Product'
import { defineComponent, ref } from 'vue'
import {DEFAULT_PRODUCT_IMG} from '@/utils/constants'

export default defineComponent({
    props: {
        product: {
            type: Product,
            required: true,
        }
    },
    setup(props) {
        const objectData: any = {
            productName: props.product.name,
            brandName: props.product.brand,
            productType: props.product.type,
            productId: props.product.id || null
        }

        const productImg = ref<string>(props.product.img ?? DEFAULT_PRODUCT_IMG);

        const productFormData = ref<string>(JSON.stringify(objectData));
        console.log("Product Form Data", productFormData.value);
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
    height: 300px;
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
    width:100%;
    height: 100px;
    border-radius: 25px 25px 0 0;
    margin-top: 0px;
    background-repeat: no-repeat;
    background-size:contain;
    background-position: center;
}
</style>