import {User} from '@/types/interfaces/User'

type currencySetter = (currency:string)=>void;
type currentUserSetter = (currentUser:User | null)=>void;
type currencyRateSetter = (currencyRate: number) =>void;
type currentLocationSetter = (lat: number, lon:number) =>void;
type convertedAmountGetter = (currencyAmount:number) => number;

export default interface IStore {
    currency: string,
    currencyRate:number,
    currentUser: User | null,
    currentLocation: number[] | null,
    setCurrency?: currencySetter,
    setCurrentUser?: currentUserSetter,
    setCurrencyRate?: currencyRateSetter,
    getConvertedAmount?: convertedAmountGetter,
    setCurrentLocation?: currentLocationSetter,
}