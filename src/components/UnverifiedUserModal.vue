<template>
  <!-- Modal for Unverified users -->
  <n-modal :mask-closable="false" preset="dialog" title="Verifica tu cuenta en Pricebin"
    content="Revisa el correo electrónico que te enviamos para verificar que no eres una inteligencia artififical 🤖"
    positive-text="OK" negative-text="Reenviar Correo" @positive-click="onPositiveClick"
    @negative-click="onNegativeClick" />
</template>

<script setup lang="ts">
import axios from 'axios';
import { PRICEBIN_API } from '@/utils/constants'
import { inject, defineEmits } from 'vue'
import { NModal, useMessage } from 'naive-ui'
import IStore from '@/types/IStore';


const message = useMessage();
const emit = defineEmits(['close'])
const store: IStore | undefined = inject('store');

function onPositiveClick(): void {
  emit('close');
}
async function onNegativeClick(): Promise<void> {
  message.success('Correo reenviado')
  emit('close');
  if (store && store!.currentUser) {
    const UserKey = store.currentUser._id!;
    console.log("Resend mail to", UserKey);
    const response = await axios.post(PRICEBIN_API + '/users/mail/resend', { UserKey })
    console.log("resend response", response);
  }
}
</script>

<style scoped>
</style>