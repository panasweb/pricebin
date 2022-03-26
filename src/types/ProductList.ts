import ProductListRecord from "./ProductListRecord";

export default class ProductList {
    list: ProductListRecord[];
    date: Date;
    total: number;

    constructor(date: Date, list: ProductListRecord[] = []) {
        this.list = list;
        this.date = date;
        this.total = this.getListTotal()
    }

    addItem(record : ProductListRecord) {
        this.list.push(record);
        this.total += record.amount * record.quantity;
    }

    deleteItem(index : number = -1) {
        if (!this.list) return;
        
        let record = this.list[index];
        this.total -= record.amount * record.quantity;
        this.list.splice(index, 1);
    }

    getListTotal() {
        let total = 0;
        this.list.forEach((item) => {
            total += item.amount * item.quantity;
        })

        return total;
    }
    
}