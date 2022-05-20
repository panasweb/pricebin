import {User} from '@/types/interfaces/User'

type currencySetter = (currency:string)=>void;
type currentUserSetter = (currentUser:User | null)=>void;

export default interface IStore {
    currency: string,
    currencyRate:number,
    currentUser: User | null,
    setCurrency?: currencySetter,
    setCurrentUser?: currentUserSetter
}