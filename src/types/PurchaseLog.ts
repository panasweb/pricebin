import ProductList from "./ProductList";

export default class PurchaseLog {
    // belongs to a user
    // Holds an array of product lists

    log: ProductList[];
    monthlyAverage: number;
    weeklyAverage: number;

    constructor(log: ProductList[], monthlyAverage: number = 0.0, weeklyAverage: number = 0.0) {
        this.log=log;
        this.monthlyAverage=monthlyAverage;
        this.weeklyAverage=weeklyAverage;
    }
    
}