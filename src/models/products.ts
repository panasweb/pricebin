import Price from "@/types/Price";
import {Product} from "@/types/Product";
import ProductListRecord from "@/types/ProductListRecord";
import {tunaPrices, waterPrices, garatPrices} from './prices'

export const exampleProducts = [
    new Product('Atún Dolores (Lata 140g)', 'Dolores',  'Despensa', tunaPrices, '123'),
    new Product('Garrafón Ciel (10lt)', 'Ciel','Despensa', waterPrices, '456'),
    new Product('Café Garat Descafeinado (450g)', 'Garat', 'Despensa', garatPrices, '789')
]

export const exampleProductRecords = [
    {productName: "Atún Dolores (Lata 140g)", brandName:'Dolores', amount: 14.50, quantity: 2}, 
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

export const addOrUpdatePrice = (product : Product, price: Price) => {
    product.updatePriceList(price);
    console.log("New Product JSON")
    console.dir(product);
    console.log(JSON.stringify(product))
}

export const fetchProducts = () => {
    console.log("Fetch products from db")
}