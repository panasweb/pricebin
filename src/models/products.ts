import Product from "@/types/Product";
import {tunaPrices, waterPrices} from './prices'
import { productNameToID } from "@/utils/misc";

export const exampleProducts = [
    new Product('Atún Dolores (Lata 140g)', 'Despensa', tunaPrices, 'atun-dolores-140g'),
    new Product('Garrafón Ciel (10lt)', 'Despensa', waterPrices, 'garrafon-ciel-10lt'),
]