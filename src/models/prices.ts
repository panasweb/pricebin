import Price from "@/types/Price"
import {exampleStores} from './stores'
/* SAMPLE PRICES TO NEST IN PRODUCT ITEM */

export const tunaPrices: Price[] = [
    new Price(14.50, 0, exampleStores[0], new Date()),
    new Price(14.50, 1, exampleStores[1], new Date()),
]

export const waterPrices: Price[] = [
    new Price(31.50, 0, exampleStores[0], new Date()),
    new Price(33, 1, exampleStores[1], new Date()),
]

export const garatPrices: Price[] = [
    new Price(200, 0, exampleStores[0], new Date()),
    new Price(180, 1, exampleStores[1], new Date()),
]