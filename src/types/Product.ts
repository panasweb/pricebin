import ProductType from './ProductType'
import Price from './Price'
// import { exampleProducts } from '@/models/products';

export class Product {
    
    name: string;
    brand: string;
    type: ProductType;
    prices: Price[];
    id?: string;

    static dbName = 'products';

    public constructor(name: string, brand: string, type: ProductType, prices: Price[], id?:string) {
        this.name = name;
        this.brand = brand;
        this.type = type;
        this.prices = prices;  // nested list is always sorted lowest to highest
        this.id = id;
    }

    public static createProduct() {
        console.log("get products");
    }

    public static deleteProduct(id: string) {
        console.log("delete product")
    }

    public static updateProduct(id: string) {
        // update p.amount
        console.log("delete product")
    }
    
    public static pricessOfProduct(prodId: string) {
        // query for the products of a product whose id: name-type-store
        console.log("prices of", prodId);
    }

    public static productsAtStore(storeId: string) {
        // query for the products of a product whose id: name-type-store
        console.log("Products at", storeId);
    }

   

}

