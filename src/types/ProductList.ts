import ProductListRecord from "./ProductListRecord";

export default class ProductList {
    list: ProductListRecord[];
    date: Date;

    constructor(date: Date, list: ProductListRecord[] = []) {
        this.list = list;
        this.date = date;
    }
}