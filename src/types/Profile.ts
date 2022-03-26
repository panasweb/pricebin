// Data object for a User's profile

import PurchaseLog from "./PurchaseLog";

/* interface Profile {
    name: string,
    email: string,
    uid: string,
    rank: number,  // increases as you add more prices
} */

class Profile {
    name: string;
    uid: string | null;
    email: string;
    log: PurchaseLog|null;  // nested
    
    constructor(name:string, email:string, uid:string|null=null, log:PurchaseLog|null=null) {
        this.name=name;
        this.uid=uid;
        this.email=email;
        this.log=log;
    }
}