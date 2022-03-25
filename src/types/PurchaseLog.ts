import ProductList from "./ProductList";
import LogSummaryStats from "./LogSummaryStats";
import { WEEK_MILISECONDS } from "@/utils/constants";
import { updatedAverage } from "@/utils/misc";
export default class PurchaseLog {
    // belongs to a user
    // Holds an array of product lists

    log: ProductList[];
    monthlyAverage: number;
    weeklyAverage: number;
    start: Date;  // defines n, number of weeks and months
    globalTotal: number;
    nMonths: number;
    nWeeks: number;

    constructor(log: ProductList[], globalTotal:number=0, monthlyAverage: number = 0.0, weeklyAverage: number = 0.0) {
        this.log=log;
        this.monthlyAverage=monthlyAverage;
        this.weeklyAverage=weeklyAverage;
        this.start = new Date();
        this.globalTotal = globalTotal;
        this.nMonths = 1;
        this.nWeeks = 1;
    }

    setBeginning(newDate: Date) {
        this.start = newDate;
    }

    resetBeginning() : void {
        this.setBeginning(new Date());
        this.nWeeks = 1
        this.nMonths = 1
    }

    recalculateWeeks() : void {
        const today = (new Date()).getTime();
        const start = this.start.getTime();
        const diff = Math.abs(today - start);

        this.nWeeks =  Math.max(Math.floor(diff / WEEK_MILISECONDS), 1);
    }

    recalculateMonths() : void {
        const today = new Date();
        const monthsToday = today.getFullYear()*12 + today.getMonth();
        const monthsBegin = this.start.getFullYear()*12 + this.start.getMonth();

        this.nMonths = Math.max(monthsToday - monthsBegin, 1);
    }

    updateLog(newList : ProductList) : void {
        // adds a new, populated productlist
        this.log.push(newList);
        this.globalTotal += newList.total;
        this.recalculateMonths();
        this.recalculateWeeks();

        this.updateAllAverages();
    }

    updateAllAverages(): void {
        // updates weekly and monthly averages in one call
        this.weeklyAverage = this.globalTotal / this.nWeeks;
        this.monthlyAverage = this.globalTotal / this.nMonths;
    }



    getSummaryStats() : LogSummaryStats {
        return {weekly: this.weeklyAverage, monthly: this.monthlyAverage, n_lists: this.log.length};
    }
    
}

