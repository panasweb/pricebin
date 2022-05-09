/* Reflects User model from API */

interface UserLog {
    nLists: number,
    nWeeks:number,
    nMontsh:number,
    monthlyAverage:number,
    weeklyAverage:number,
    listAverage:number,
    start: Date,
    globalTotal: number,
}
interface ListRecord{
    productName: string, 
    brandName: string, 
    storeName: string, 
    amount: number,
    quantity: number
}
interface CurrentList {
    list: ListRecord[], 
    total: number
}
export interface User {
    username: string,
    email: string,
    UserLog: UserLog,
    rank: number,
    points:number, 
    currentList: CurrentList
}

export interface UserToCreate {
    username?:string,
    email:string,
}