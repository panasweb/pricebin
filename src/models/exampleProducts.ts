import Price from "@/models/classes/Price";
import {Product} from "@/models/classes/Product";
import ListRecord from "@/types/ListRecord";
import {tunaPrices, waterPrices, garatPrices} from './examplePrices'
import {exampleStores} from './exampleStores'
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

export const addMyProduct = (product: Product, store: Store, quan: number)=>{
    exampleProductRecords.push({productName: product.name, brandName: product.brand, storeName: store.name, amount: 14.50, quantity: quan})
    console.log(exampleProductRecords)
}
export const addProduct = (product: Product)=>{
    exampleProducts.push(product)
    console.log(exampleProducts)
}
