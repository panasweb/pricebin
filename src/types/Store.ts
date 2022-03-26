import StoreLogo from './StoreLogo'


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
}