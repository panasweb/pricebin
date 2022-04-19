/* Reflects Product Model from MongoDB */
import ProductType from '../ProductType'
import Price from './Price'

export interface Product {
    name: string,
    brand?: string,
    type: ProductType,
    prices: Price[],
    img?: string
}

// TBA interface for ProductToCreate