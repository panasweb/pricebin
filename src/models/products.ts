import Product from "@/types/Product";
import {tunaPrices, waterPrices} from './prices'

export const exampleProducts = [
    new Product('Atún Dolores (Lata 140g)', 'Dolores',  'Despensa', tunaPrices),
    new Product('Garrafón Ciel (10lt)', 'Ciel','Despensa', waterPrices)
]

export const exampleProductRecords = [
    {productName: "Atún Dolores (Lata 140g)", brandName:'Dolores', amount: 14.50, quantity: 2}, 
]