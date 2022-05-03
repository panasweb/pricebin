import axios from 'axios'
import { User, UserToCreate } from "../types/interfaces/User";

const url = 'http://localhost:3010/users/';

const UserManager = {
    create : async function(user: UserToCreate) : Promise<[boolean, User | null]> {
        console.log("Create user with email", user.email);
        try {
            const {data} : any = await axios.post(url, user);
            console.log(data);
            return [true, data.newDoc as User];
        } catch (e) {
            console.log("API error creating user");
            return [false, null];
        }
    },
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

            const user = await axios.post(url + 'by-email', body) as User;
            return user;
        } catch (e) {
            console.log("API Error", e);
            return null;
        }
   
    },
}

Object.freeze(UserManager);

export default UserManager;