interface Price {
    amount: number,
    date: Date | string, // on fetch, date is string
    currency: string,
    store: string,  // store's name
    StoreKey: string,
    _id?:string
}

export default Price