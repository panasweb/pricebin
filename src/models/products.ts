import Product from "@/types/Product";
import {tunaPrices, waterPrices} from './prices'

export const exampleProducts = [
    new Product('Atún Dolores (Lata 140g)', 'Despensa', tunaPrices),
    new Product('Garrafón Ciel (10lt)', 'Despensa', waterPrices),
]