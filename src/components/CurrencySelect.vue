<template>
    <n-space vertical>
        <n-select :value="currency" @update:value="changeHandler" size="small" :options="CURRENCY_OPTIONS" :theme-overrides="selectThemeOverrides"/>
    </n-space>
    <n-button @click="setCurrency" color="#f76d66" size="small" :disabled="disableBtn">
        <div>
            <n-icon>
                <cash />
            </n-icon>
            Set currency
        </div>
    </n-button>
</template>

<script setup lang="ts">
import { NSpace, NSelect, NButton, NIcon, SelectOption, SelectProps } from 'naive-ui';
import { CURRENCY_OPTIONS } from '../utils/constants';
import { CurrencyExchangeOutlined as cash } from '@vicons/material';
import { inject, ref } from "vue"
import IStore from '@/types/IStore';
import UserManager from '@/models/UserManager';
type SelectThemeOverrides = NonNullable<SelectProps['themeOverrides']>

const store: IStore | undefined = inject('store');

const selectThemeOverrides: SelectThemeOverrides = {
  peers: {
    InternalSelection: {
      textColor: "#FFFFFF",
      color: '#f76d66',
      heightMedium: '42px'
    },
    InternalSelectMenu: {
      optionTextColor: "#FFFFFF",
      color: '#f76d66',
    },
  }
}

const currency = ref<string>(store!.currency);
const disableBtn = ref<boolean>(true);

function changeHandler(value: string, option: SelectOption) {
    console.log("Select changed!", value);
    currency.value = value;
    disableBtn.value = false;
}

async function setCurrency() {
    // If currency is the same, ignore
    const currentCurrency = store?.currency || "MXN"
    if (currency.value === currentCurrency) {
        console.log("Same currency, no change");
        disableBtn.value = true;
        return;
    }

    const newCurrency = await UserManager.getCurrency(currency.value);
    if (store?.setCurrency && store?.setCurrencyRate) {
        store.setCurrency(currency.value)
        store.setCurrencyRate(newCurrency)
        console.log("Currency rate:", store.currencyRate)
    }
    disableBtn.value = true;
}

</script>

<style scoped>
</style>