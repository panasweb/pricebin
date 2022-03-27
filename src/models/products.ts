import {Product} from "@/types/Product";
import ProductListRecord from "@/types/ProductListRecord";
import {tunaPrices, waterPrices} from './prices'

export const exampleProducts = [
    new Product('Atún Dolores (Lata 140g)', 'Dolores',  'Despensa', tunaPrices,"1"),
    new Product('Garrafón Ciel (10lt)', 'Ciel','Despensa', waterPrices,"2")
]

export const exampleProductRecords = [
    {productName: "Atún Dolores (Lata 140g)", brandName:'Dolores', amount: 14.50, quantity: 2},
    {productName: "Garrafón Ciel (10lt)", brandName: 'Ciel', amount: 31.50, quantity: 3}
]

export const findById = (productId: string) : Product|null => {
    const res: Product | undefined = exampleProducts.find((p:Product) => p.id == productId);

    return res || null;
}

export const findProductByNameAndBrand = (productName: string, brandName: string) : Product|null => {
    const res: Product | undefined = exampleProducts.find((p:Product) => 
        p.name === productName && p.brand === brandName);

    return res || null;
}