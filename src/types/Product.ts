import ProductType from './ProductType'
import Price from './Price'
import { exampleProducts } from '@/models/products';

export default class Product {
    
    name: string;
    brand: string;
    type: ProductType;
    prices: Price[];

    static dbName = 'products';

    constructor(name: string, brand: string, type: ProductType, prices: Price[]) {
        this.name = name;
        this.brand = brand;
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

    // public static findById(productId: string) : Product|null {
    //     const res: Product | undefined = exampleProducts.find((p:Product) => p.id == productId);

    //     return res || null;
    // }

    public static findProductByNameAndBrand(productName: string, brandName: string) : Product|null {
        const res: Product | undefined = exampleProducts.find((p:Product) => 
            p.name === productName && p.brand === brandName);

        return res || null;
    }

}

