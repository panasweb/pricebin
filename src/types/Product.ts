import ProductType from './ProductType'
import Price from './Price'

// interface Product {
//     name: string,
//     type: ProductType,
//     prices: Price[],
// }

class Product {
    
    name: string;
    type: ProductType;
    prices: Price[];

    static dbName = 'products';

    constructor(name: string, type: ProductType, prices: Price[]) {
        this.name = name;
        this.type = type;
        this.prices = prices;
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

export default Product