import StoreLogo from './StoreLogo'
import { exampleStores } from '@/models/stores';

export default class Store {
    name:string;
    lat: number;
    lon: number;
    id?: string;  
    branch?: string;  // name specifier e.g. Coapa, Satélite
    logo?: StoreLogo;

    constructor(name:string, lat=0, lon=0, id?:string, branch?:string,  logo?:StoreLogo) {
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