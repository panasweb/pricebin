import Product from "@/types/Product";
import ProductListRecord from "@/types/ProductListRecord";
import {tunaPrices, waterPrices} from './prices'
import { productNameToID } from "@/utils/misc";

export const exampleProducts = [
    new Product('Atún Dolores (Lata 140g)', 'Dolores',  'Despensa', tunaPrices, 'atun-dolores-140g'),
    new Product('Garrafón Ciel (10lt)', 'Ciel','Despensa', waterPrices, 'garrafon-ciel-10lt'),
]

export const exampleProductRecords = [
    {productName: "Atún Dolores (Lata 140g)", brandName:'Dolores', amount: 14.50, quantity: 2}, 
]