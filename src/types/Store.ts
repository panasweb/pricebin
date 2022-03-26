import StoreLogo from './StoreLogo'
/* eslint-disable */

export default class Store {
    name:string;
    branch: string|null;  // name specifier e.g. Coapa, Satélite
    lat: number;
    lon: number;
    logo: StoreLogo|null;

    constructor(name:string, branch: string|null, lat: number=0, lon: number=0, logo:StoreLogo|null=null) {
        this.name=name;
        this.branch=branch;
        this.lat=lat;
        this.lon=lon;
        this.logo=logo;
    }
}