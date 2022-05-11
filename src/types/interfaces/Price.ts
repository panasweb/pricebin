interface Price {
    amount: number,
    date: Date,
    currency: string,
    store: string,  // store's name
    StoreKey: string,
    _id?:string
}

export default Price