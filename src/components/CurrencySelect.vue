<template>
<n-space vertical>
              <n-select :value="currency" @update:value="changeHandler" :options="CURRENCY_OPTIONS" color="#f76d66"/>
          </n-space>
          <n-button @click="setCurrency" color="#f76d66" :disabled="disableBtn">
                <template #icon>
                    <n-icon>
                        <cash/>
                    </n-icon>     
                </template>
                Set currency
          </n-button>
</template>

<script setup lang="ts">
import {NSpace, NSelect, NButton, NIcon, SelectOption} from 'naive-ui';
import {CURRENCY_OPTIONS} from '../utils/constants';
import { CurrencyExchangeOutlined as cash } from '@vicons/material';
import {inject, ref} from "vue"
import IStore from '@/types/IStore';
import UserManager from '@/models/UserManager';

const store: IStore | undefined = inject('store');

const currency = ref<string>(store!.currency);
const disableBtn = ref<boolean>(true);

function changeHandler(value: string, option: SelectOption) {
    console.log("Select changed!", value);
    currency.value = value;
    disableBtn.value=false;
}

async function setCurrency(){
    // If currency is the same, ignore
    const currentCurrency = store?.currency || "MXN"
    if (currency.value === currentCurrency) {
      console.log("Same currency, no change");
      disableBtn.value=true;
      return;
    }

    const newCurrency = await UserManager.getCurrency(currency.value);
    if (store?.setCurrency && store?.setCurrencyRate){
        store.setCurrency(currency.value)
        store.setCurrencyRate(newCurrency)
        console.log("Currency rate:",store.currencyRate)
    }
    disableBtn.value=true;
}

</script>

<style scoped>

</style>