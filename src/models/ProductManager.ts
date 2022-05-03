import axios from 'axios'
import {Product} from '@/types/interfaces/Product'
import Price from '@/types/interfaces/Price'

const url = 'http://localhost:3010/products/';

const ProductManager = {
    getAll: async function(): Promise<Product[]> {
        try {
            const {data} = await axios.get(url); 
            return data as Product[];
        } catch (e) {
            console.error("Error fetching products", e);
            return []   
        }

    },
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
            const {data} = await axios.get(url + id);
            return data as Product;
        } catch (e) {
            console.log("API Error", e);
            return null;
        }
    },
    addPrice : async function(productId:string, price:Price) : Promise<[boolean, Product | null]> {
        if (!productId) {
            console.log('No id provided for product');
            return [false, null];
        }
        
        const endpoint = url + 'add-price'

        try {
            const {data} = await axios.post(endpoint, {productId, price});
            return [true, data.newDoc as Product];

        } catch (e) {
            console.error("")
            return [false, null];
        }
    },
    updatePrice : async function(productId:string, priceId:string, newAmount:number) : Promise<[boolean, Product | null]> {
        /* 
        FindOneAndUpdate by price id in given product, simply updates the amount.
        A product has one price per Store.
        */
        if (!productId) {
            console.log('No id provided for product');
            return [false, null];
        }

        const endpoint = url + 'update-price'

        try {
            const {data} = await axios.post(endpoint, {productId, priceId, newAmount});
            return [true, data.newDoc as Product];
        } catch (e) {
            console.error("API error", e);
            return [false, null];
        }

    },
    findProductByNameAndBrand() {
        // TODO
        return null;
    }
}

Object.freeze(ProductManager);

export default ProductManager;