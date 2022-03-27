import Store from './Store'

class Price {
    amount: number;
    date?: Date;
    currency?: string;
    store: Store;

    static dbName = 'prices';

    constructor(amount: number, store: Store, date?:Date, currency?:string) {
        this.amount = amount;
        this.store = store;
        this.date = date;
        this.currency = currency;
    }

    public static createPrice() {
        console.log("get prices");
    }

    public static deletePrice(id: string) {
        console.log("delete price")
    }

    public static updatePrice(id: string) {
        // update p.amount
        console.log("delete price")
    }
    
    public static pricesOfProduct(prodId: string) {
        // query for the prices of a product whose id: name-type-store
        console.log("Prices of", prodId);
    }

    public static pricesAtStore(storeId: string) {
        // query for the prices of a product whose id: name-type-store
        console.log("Prices of", storeId);
    }

}


export default Price