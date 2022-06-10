import ListRecord from '@/types/ListRecord';
import axios from 'axios'
import ProductList from './classes/ProductList';


const url = process.env.VUE_APP__API_URL+ '/lists/';

const UserManager = {

    saveList: async function (UserKey: string, products: ListRecord[] ) : Promise<ProductList | null>{
        try {
            console.log(url)
            const {data} = await axios.post(url , {UserKey: UserKey , list: products, date: Date.now()})
            return data as ProductList
        }catch(e){
            console.log("Api error", e)
            return null;
        }
    },
    deleteList: async function (id: string ) : Promise<ProductList | null>{
        try {
            const {data} = await axios.post(url + 'delete/' + id)
            return data as ProductList
        }catch(e){
            console.log("Api error", e)
            return null;
        }
    },
    getUser: async function (userId: string ) : Promise<ProductList[] | null>{
        try {
            const {data} = await axios.get(url + 'of/' + userId)
            return data as ProductList[]
        }catch(e){
            console.log("Api error", e)
            return null;
        }
    },
    getOne: async function (id: string ) : Promise<ProductList | null>{
        try {
            const {data} = await axios.get(url +  id)
            return data as ProductList
        }catch(e){
            console.log("Api error", e)
            return null;
        }
    },
    getAll: async function (userId: string ) : Promise<ProductList | null>{
        try {
            const {data} = await axios.get(url)
            return data as ProductList
        }catch(e){
            console.log("Api error", e)
            return null;
        }
    }
}

Object.freeze(UserManager);

export default UserManager;