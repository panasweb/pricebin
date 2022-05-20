import { User } from '../types/interfaces/User'
import {reactive} from 'vue'
import UserManager from '@/models/UserManager';
import IStore from '../types/IStore';


const store : IStore = reactive({
    currency:'USD',
    currencyRate:0.050, 
    currentUser: (null as unknown as User), // ts workaround

    setCurrency(currency:string) {
        this.currency = currency;
    },

    setCurrentUser(currentUser: User | null) {
        this.currentUser = (currentUser as unknown as User);
    }
})

export default store