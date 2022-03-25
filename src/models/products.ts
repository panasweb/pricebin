import Product from "@/types/Product";
import {tunaPrices, waterPrices} from './prices'

export const exampleProducts = () : Product[] => {


    const products: Product[] = [
        {
            name: 'Atún Dolores (Lata 140g)',
            type: 'Despensa',
            prices: tunaPrices
        },
        {
            name: 'Garrafón Ciel (10lt)',
            type: 'Despensa',
            prices: waterPrices,
        },
    ]

    return products;
}