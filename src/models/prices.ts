import Price from "@/types/Price"
import {getStores} from './stores'


export const tunaPrices: Price[] = [
    new Price(14.50, getStores[0], new Date()),
    new Price(14.50, getStores[0], new Date()),
]

export const waterPrices: Price[] = []