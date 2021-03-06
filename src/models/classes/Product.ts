import ProductType from '../../types/ProductType'
import Price from './Price'

export class Product {
    
    name: string;
    brand: string;
    type: ProductType;
    prices: Price[];
    id?: string;
    img?: string;

    static dbName = 'products';

    public constructor(name: string, brand: string, type: ProductType, prices: Price[], id?:string) {
        this.name = name;
        this.brand = brand;
        this.type = type;
        this.prices = prices;  // nested list is always sorted lowest to highest
        this.id = id;
    }

    public setImg(img: string) {
        this.img=img;
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

    public updatePriceList(price: Price) : void {
        if (price.id < this.prices.length) {
            // update price at price.id
            this.prices[price.id] = price;
        } else {
            // add
            this.prices.push(price);
        }
    }

}

