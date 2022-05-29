/* Reflects User model from API */
import ListRecord from '../ListRecord'
import PastRecord from '../PastRecord'
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

export interface CurrentList {
    list: ListRecord[], 
    total: number
}

export interface User {
    username: string,
    email: string,
    UserLog: UserLog,
    rank: number,
    points:number, 
    currentList: CurrentList,
    pastList: PastRecord[]
}

export interface UserToCreate {
    username?:string,
    email:string,
}