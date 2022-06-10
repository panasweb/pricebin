import axios from 'axios'
import Store from "../types/interfaces/Store";


const url = process.env.VUE_APP__API_URL +'/stores/';

const StoreManager = {
    create : async function(store: Store) : Promise<[boolean, Store | null]> {
        //console.log("Create store with email", store.email);
        
        try {
            const {data} : any = await axios.post(url, store);
            console.log(data);
            return [true, data.newDoc as Store];
        } catch (e) {
            console.log("API error creating store");
            return [false, null];
        }
    },
    getStore : async function(id:string) : Promise<Store | null> {
        if (!id) {
            console.log('No id provided for store');
            return null;
        }
        try {
            const {data} = await axios.get(url + id);
            return data.newDoc as Store;
        } catch (e) {
            console.log("API Error", e);
            return null;
        }
        
    },
    getByName : async function(name:string) : Promise<Store | null> {
        // The search is done case-insensitive
        if (!name) {
            console.log('No name provided for store');
            return null;
        }
        try {
            const body = {
                name
            }

            const {data} = await axios.post(url + 'by-name', body);
            return data as Store;
        } catch (e) {
            console.log("API Error", e);
            return null;
        }

    },
    getAll : async function() : Promise<Store[]> {
        try {
            const {data} = await axios.get(url); 
            return data as Store[];
        } catch (e) {
            console.error("Error fetching stores", e);
            return []   
        }
    }
}

Object.freeze(StoreManager);

export default StoreManager;