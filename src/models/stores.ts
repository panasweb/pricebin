import Store from "@/types/classes/Store";

const img = '@/assets/logos/'

/* SAMPLE STORES FOR PRICES TO POINT AT */
export const exampleStores = [
    new Store('Walmart', 19.293009, -99.123882, {key: "Walmart", uri: img + 'Walmart.svg'}),
    new Store('MEGA Soriana', 19.285797, -99.137691, {key: "Soriana", uri: img + 'Soriana.svg'}),
]