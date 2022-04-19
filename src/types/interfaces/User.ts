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

export interface User {
    username: string,
    email: string,
    UserLog: UserLog,
    rank: number,
    points:number
}

export interface UserToCreate {
    username?:string,
    email:string,
}