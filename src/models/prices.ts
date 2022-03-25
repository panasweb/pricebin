import Price from "@/types/Price"
import {exampleStores} from './stores'


export const tunaPrices: Price[] = [
    new Price(14.50, exampleStores[0], new Date()),
    new Price(14.50, exampleStores[1], new Date()),
]

export const waterPrices: Price[] = [
    new Price(31.50, exampleStores[0], new Date()),
    new Price(33, exampleStores[1], new Date()),
]