import Price from "@/models/classes/Price";
import {Product} from "@/models/classes/Product";
import ListRecord from "@/types/ListRecord";
import {tunaPrices, waterPrices, garatPrices} from './prices'
import {exampleStores} from './stores'
import Store from "@/models/classes/Store";

export const exampleProducts = [
    new Product('Atún Dolores (Lata 140g)', 'Dolores',  'Despensa', tunaPrices, '123'),
    new Product('Garrafón Ciel (10lt)', 'Ciel','Despensa', waterPrices, '456'),
    new Product('Café Garat Descafeinado (450g)', 'Garat', 'Despensa', garatPrices, '789')
]

export const exampleProductRecords = [
    {productName: "Atún Dolores (Lata 140g)", brandName:'Dolores', storeName:exampleStores[0].name, amount: 14.50, quantity: 2},
    {productName: "Garrafón Ciel (10lt)", brandName: 'Ciel', storeName:exampleStores[1].name ,amount: 31.50, quantity: 3} 
]  // podría instanciarse ProductList con esto...
