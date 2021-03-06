import ListRecord from '@/types/ListRecord';
import axios from 'axios'
import { User, UserToCreate, CurrentList } from "../types/interfaces/User";


const url = process.env.VUE_APP__API_URL + '/users/';

const UserManager = {
    create : async function(user: UserToCreate) : Promise<[boolean, User | null]> {
        console.log("Create user with email", user.email);
        try {
            const {data} : any = await axios.post(url, user);
            console.log(data);
            return [true, data.newDoc as User];
        } catch (e) {
            console.log("API error creating user" + e);
            return [false, null];
        }
    },
    getAll: async function(): Promise<[User]| null>{
        try{
            const {data} = await axios.get(url) 
            return data as [User]
        }catch(e){
            console.log(e)
            return null
        }
    },
    deleteByID: async function(id: string, currentUser: User): Promise<string|null>{
        try{
            console.log(id)
            const response = await axios.post(url + 'delete/' + id, {
                sudo:'sudo',
            });
            console.log("delete response:", response);
            return response.data as string;
        }catch (e){
            console.log(e)
            return null
        }
    }
    ,
    getUser : async function(id:string) : Promise<User | null> {
        if (!id) {
            console.log('No id provided for user');
            return null;
        }
        try {
            const user = await axios.get(url + id) as User;
            return user;
        } catch (e) {
            console.log("API Error", e);
            return null;
        }
        
    },
    getByUsername : async function(username:string) : Promise<User | null> {
        if (!username) {
            console.log('No username provided for user');
            return null;
        }
        try {
            const body = {
                username
            }

            const user = await axios.post(url + 'by-username', body) as User;
            return user;
        } catch (e) {
            console.log("API Error", e);
            return null;
        }

    },
    getByEmail : async function(email:string) : Promise<User | null> {
        if (!email) {
            console.log('No email provided for user');
            return null;
        }
        try {
            const body = {
                email
            }

            const {data} = await axios.post(url + 'by-email', body);
            return data as User;
        } catch (e) {
            console.log("API Error", e);
            return null;
        }
   
    },
    addProduct : async function (product:ListRecord, email: string) : Promise <User | null>{
        // Receiva a product and append to list
        try {
            const body = {
                product,
                email
            }

            const {data} = await axios.post(url + 'product/add/', body);
            return data as User;
        } catch (e) {
            console.log("API Error", e);
            return null;
        }
    },
    updateList: async function (email:string, list: ListRecord[]) : Promise<User | null> {
        // updates the list to whatever new list we have. 
        // For removal of a product, requesting View should filter by index.
        try {
            const body = {
                email,
                list,
            }

            const {data} = await axios.post(url + 'product/update', body)
            return data as User;
        }
        catch (e) {
            console.log("API Error", e);
            return null;
        }
    },
    clearList: async function (email:string) : Promise<User | null> {
        try {
            const {data} = await axios.post(url + 'product/clear', {email})
            return data as User;
        }
        catch (e) {
            console.log("API Error", e);
            return null;
        }
    },
    saveList: async function (email: string, total: number, products: ListRecord[] ) : Promise<User | null>{
        try {
            const {data} = await axios.post(url + 'product/save', {email: email,total: total, list: products})
            return data as User
        }catch(e){
            console.log("Api error", e)
            return null;
        }
    },
    getCurrency: async function (toCurrency:string): Promise<number>{
        const fromCurrency = 'MXN'
        try{
            const {data} = await axios.post(process.env.VUE_APP__API_URL + '/convert', {fromCurrency, toCurrency})

            return data[`${fromCurrency}_${toCurrency}`] as number;
        }
        catch(e){
            console.log("Currency Converter API error: ", e)
            return 1
        }
    },
    getUserCoolStats: async function (UserKey: string|null): Promise<any>{
        try{
            // const data1 = await axios.post(url + '/stats/recalculate', {UserKey})
            const {data} = await axios.post(url + 'stats/cool', {UserKey})
            return data
        }
        catch(e){
            console.log("API error: ",e)
            return null;
        }
    }
}

Object.freeze(UserManager);

export default UserManager;