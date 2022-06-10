import { User } from '../types/interfaces/User'
import {reactive} from 'vue'
import IStore from '../types/IStore';


const store : IStore = reactive({
    currency:'MXN',
    currencyRate:1, 
    currentUser: (null as unknown as User), // ts workaround
    currentLocation: null,
    setCurrency(currency:string) {
        this.currency = currency;
    },

    setCurrencyRate(currencyRate: number){
        this.currencyRate = currencyRate;
    },

    setCurrentUser(currentUser: User | null) {
        this.currentUser = (currentUser as unknown as User);
    }, 

    getConvertedAmount(currencyAmount:number){
        return currencyAmount * this.currencyRate;
    }
})

export default store