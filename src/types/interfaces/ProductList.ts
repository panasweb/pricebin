import ListRecord from "../ListRecord";

export default interface ProductList {
    list: ListRecord[],
    date: Date | string,
    total: number,
    UserKey?:string
}