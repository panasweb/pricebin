import axios from 'axios'
import {Product} from '@/types/interfaces/Product'
import Price from '@/types/interfaces/Price'

const url = 'http://localhost:3010/products/';

const ProductManager = {
    create : async function(product: Product) : Promise<[boolean, Product | null]> {
        console.log("Create product", product.name, product.brand);
        
        try {
            const {data} : any = await axios.post(url, product);  // message, newDoc
            console.log(data);
            return [true, data.newDoc as Product];
        } catch (e) {
            console.log("API error creating product");
            return [false, null];
        }
    },
    getProduct : async function(id:string) : Promise<Product | null> {
        if (!id) {
            console.log('No id provided for product');
            return null;
        }
        try {
            const product = await axios.get(url + id) as Product;
            return product;
        } catch (e) {
            console.log("API Error", e);
            return null;
        }
    },
    addPrice : async function(productId:string, price:Price) : Promise<[boolean, Product | null]> {
        //TODO
        console.log("to implement!");
        return [false, null];
    },
    updatePrice : async function(productId:string, priceId:string, newAmount:number) : Promise<[boolean, Product | null]> {
        // TODO
        /* Finds the price by price id in given product, and updates the amount.
        Essentially you update how much it costs at a given Store. */
        console.log("to implement!");
        return [false, null];
    }
}

Object.freeze(ProductManager);

export default ProductManager;