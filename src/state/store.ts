import { User } from '../types/interfaces/User'
import {reactive} from 'vue'
import UserManager from '@/models/UserManager';

interface IStore {
    currency: string,
    currentUser?: User,
}

export const store : IStore = reactive({
    currency:'MXN',
    currentUser: undefined,

    setCurrency(currency:string) {
        this.currency = currency;
    },

    setCurrentUser(currentUser: User | undefined) {
        this.currentUser = currentUser;
    }
})

