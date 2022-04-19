import {reactive} from 'vue'

export const store = reactive({
    currency:'MXN',

    setCurrency(currency:string) {
        this.currency = currency;
    }
})

