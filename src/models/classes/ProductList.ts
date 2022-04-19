import ListRecord from "../../types/ListRecord";

export default class ProductList {
    list: ListRecord[];
    date: Date;
    total: number;

    constructor(date: Date, list: ListRecord[] = []) {
        this.list = list;
        this.date = date;
        this.total = this.getListTotal()
    }

    addItem(record : ListRecord) {
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