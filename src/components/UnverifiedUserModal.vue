<template>
    <!-- Modal for Unverified users -->
    <n-modal :mask-closable="false" preset="dialog" title="Verifica tu cuenta en Pricebin"
      content="Revisa el correo electrónico que te enviamos para verificar que no eres una inteligencia artififical 🤖"
      positive-text="OK" negative-text="Reenviar Correo" @positive-click="onPositiveClick"
      @negative-click="onNegativeClick" />
</template>

<script setup lang="ts">
import { defineEmits } from 'vue'
import { NModal, useMessage } from 'naive-ui'
const message = useMessage();
const emit = defineEmits(['close'])

function onPositiveClick(): void {
  emit('close');
}
function onNegativeClick(): void {
  message.success('Correo reenviado')
  emit('close');
}
</script>

<style scoped>

</style>