import axios from 'axios'
import { Product } from '@/types/interfaces/Product'
import Price from '@/types/interfaces/Price'

const url = 'http://localhost:3010/products/';

const ProductManager = {
    getAll: async function (): Promise<Product[]> {

        const { data } = await axios.get(url);
        return data as Product[];

    },
    create: async function (product: Product): Promise<[boolean, Product | null]> {
        console.log("Create product", product.name, product.brand);

        try {
            const { data }: any = await axios.post(url, product);  // message, newDoc
            console.log(data);
            return [true, data.newDoc as Product];
        } catch (e) {
            console.log("API error creating product");
            return [false, null];
        }
    },
    getProduct: async function (id: string): Promise<Product | null> {
        if (!id) {
            console.log('No id provided for product');
            return null;
        }
        try {
            const { data } = await axios.get(url + id);
            return data as Product;
        } catch (e) {
            console.log("API Error", e);
            return null;
        }
    },
    addPrice: async function (productId: string, price: Price): Promise<[boolean, Product | null]> {
        if (!productId) {
            console.log('No id provided for product');
            return [false, null];
        }

        const endpoint = url + 'add-price'

        try {
            const { data } = await axios.post(endpoint, { productId, price });
            return [true, data.newDoc as Product];

        } catch (e) {
            console.error("")
            return [false, null];
        }
    },
    updatePrice: async function (productId: string, priceId: string, newAmount: number): Promise<[boolean, Product | null]> {
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
            const { data } = await axios.post(endpoint, { productId, priceId, newAmount });
            return [true, data.newDoc as Product];
        } catch (e) {
            console.error("API error", e);
            return [false, null];
        }

    },
    searchProducts: async function (productName: string, typeFilter:string): Promise<Product[]> {
        // Search by name for now
        if (!productName && typeFilter==='') {
            return await this.getAll();
        }

        const endpoint = url + "by-name";
        try {
            const query : any = {
                name:productName
            }
            if (typeFilter) {
                query.type = typeFilter;
            }
            console.log("Send query", query);
            const { data } = await axios.post(endpoint, query);
            return data as Product[];
        } catch (e) {
            console.error("API error", e);
            return [];
        }
    },
    adminDeleteProduct: async function (UserKey: string, productId: string): Promise<[boolean, string | null]> {
        if (!UserKey) {
            console.log("No UserKey provided for admin delete")
            return [false, null]
        }

        if (!productId) {
            console.log("No id provided for product to delete");
            return [false, null]
        }

        const endpoint = url + "delete/" + productId
        try {
            const { data } = await axios.post(endpoint, { UserKey });

            return [true, data as string];

        } catch (e) {
            console.error(e);
            return [false, "Error deleting product"];
        }
    },
    adminDeletePrice: async function (UserKey: string, productId: string, priceId: string): Promise<[boolean, Product | null]> {
        /* 
        FindOneAndUpdate by product id, then pull from array 
        the subdocument matching priceId.
        */
        if (!UserKey) {
            console.log("No UserKey provided for admin delete")
            return [false, null]
        }

        if (!productId) {
            console.log('No id provided for product');
            return [false, null];
        }
        if (!priceId) {
            console.log('No id provided for price');
            return [false, null];
        }

        const endpoint = url + 'delete-price'

        try {
            const reqBody = {
                UserKey,
                productId,
                priceId
            }
            const { data } = await axios.post(endpoint, reqBody);
            console.log(data.message);
            return [true, data.newDoc as Product];
        } catch (e) {
            console.error("API error", e);
            return [false, null];
        }

    }
}

Object.freeze(ProductManager);

export default ProductManager;