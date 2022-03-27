import Price from "@/types/Price"
import {exampleStores} from './stores'
/* SAMPLE PRICES TO NEST IN PRODUCT ITEM */

export const tunaPrices: Price[] = [
    new Price(0, 14.50,  exampleStores[0], new Date()),
    new Price(1, 16.50,  exampleStores[1], new Date()),
]

export const waterPrices: Price[] = [
    new Price(0, 31.50,  exampleStores[0], new Date()),
    new Price(1, 33, exampleStores[1], new Date()),
]

export const garatPrices: Price[] = [
    new Price(0, 200,  exampleStores[0], new Date()),
    new Price(1, 180, exampleStores[1], new Date()),
]