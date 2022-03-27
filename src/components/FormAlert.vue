<template>
    <div v-if="msg" class="alert alert-warning" role="alert">
        {{msg}}
    </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'

export default defineComponent({
    props: {
        msg: {
            type: String as PropType<string>,
            required:true,
        }
    },
    setup(props) {
        return {props}
    }
})
</script>
