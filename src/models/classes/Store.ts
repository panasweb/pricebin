import { exampleStores } from '@/models/exampleStores';
/* eslint-disable */

export default class Store {
    name:string;
    lat: number;
    lon: number;
    id?: string;  
    branch?: string;  // name specifier e.g. Coapa, Satélite
    logo?: string;

    constructor(name:string, lat=0, lon=0, logo?:string, id?:string, branch?:string) {
        this.name=name;
        this.lat=lat;
        this.lon=lon;
        this.logo= logo;  // TODO: default store icon
        this.branch= branch;
        this.id = id;       // database id
    }

    static getStoreByName(storeName: string) : Store|null {
        const res = exampleStores.find(s => s.name == storeName);

        return res || null;
    }
}


export const fetchStores = () => {
    console.log("Fetch stores from db")
}