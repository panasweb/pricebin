<template>
    <div class="col">
        <img :src="storeLogo" class="logo" />
        <p>{{ props.p.store }}</p>
    </div>
    <div class="col price">
        ${{ props.p.amount }}
        <div class="priceInfo">
            <div class="price-date">{{ (props.p.date as string).slice(0, 10) }}</div>
            <div v-if="!props.hasVoted" class="priceVotes">
                <span @click="props.vote(props.p._id!)">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M0 8C0 3.58065 3.58065 0 8 0C12.4194 0 16 3.58065 16 8C16 12.4194 12.4194 16 8 16C3.58065 16 0 12.4194 0 8ZM9.41935 11.7419V8H11.7065C12.0516 8 12.2258 7.58064 11.9806 7.33871L8.27419 3.65161C8.12258 3.5 7.88065 3.5 7.72903 3.65161L4.01935 7.33871C3.77419 7.58387 3.94839 8 4.29355 8H6.58065V11.7419C6.58065 11.9548 6.75484 12.129 6.96774 12.129H9.03226C9.24516 12.129 9.41935 11.9548 9.41935 11.7419Z"
                            id="unvoted" />
                    </svg>
                </span>
                x{{ props.votes }}
            </div>
            <div v-else class="priceVotes">
                <span @click="props.unvote(props.p._id!)">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M0 8C0 3.58065 3.58065 0 8 0C12.4194 0 16 3.58065 16 8C16 12.4194 12.4194 16 8 16C3.58065 16 0 12.4194 0 8ZM9.41935 11.7419V8H11.7065C12.0516 8 12.2258 7.58064 11.9806 7.33871L8.27419 3.65161C8.12258 3.5 7.88065 3.5 7.72903 3.65161L4.01935 7.33871C3.77419 7.58387 3.94839 8 4.29355 8H6.58065V11.7419C6.58065 11.9548 6.75484 12.129 6.96774 12.129H9.03226C9.24516 12.129 9.41935 11.9548 9.41935 11.7419Z"
                            id="voted" />
                    </svg>
                </span>
                x{{ props.votes }}
            </div>
        </div>

    </div>
    <button class="add col" @click="props.addToList(props.p)">+</button>
    <div v-if="props.isAdmin" class="del-price-btn">
        <button @click="props.deletePrice(props.p)">Borrar precio</button>
    </div>
</template>

<script setup lang="ts">
import Price from "@/types/interfaces/Price";
import { defineProps, PropType } from "vue";

const props = defineProps({
    storeLogo: String as PropType<string>,
    isAdmin: Boolean as PropType<boolean>,
    p: {
        type: Object as PropType<Price>,
        required:true,
    },
    votes: {
        type: Number as PropType<number>,
        required: true,
    },
    hasVoted: {
        type: Boolean as PropType<boolean>,
        required: true,
    },
    deletePrice: {
        type: Function as PropType<(price: Price) => Promise<void>>,
        required: true
    },
    addToList: {
        type: Function as PropType<(price: Price) => Promise<void>>,
        required: true
    },
    vote: {
        type: Function as PropType<(priceId: string) => Promise<void>>,
        required: true
    },
    unvote: {
        type: Function as PropType<(priceId: string) => Promise<void>>,
        required: true
    }
});

/* const {
    p,
    isAdmin,
    votes,
    storeLogo,
    addToList,
    vote,
    unvote,
    deletePrice 
    } = props; */

</script>

<style scoped>
</style>