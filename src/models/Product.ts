/* import Product from '../types/interfaces/Product';
import Price from './classes/Price'

const ProductDB : any = {
    findById: async (productId: string) : Product|null => {
    const res: Product | undefined = exampleProducts.find((p:Product) => p.id == productId);
    return res || null;
    }

}

ProductDB.findProductByNameAndBrand = (productName: string, brandName: string) : Product|null => {
    const res: Product | undefined = exampleProducts.find((p:Product) => 
        p.name === productName && p.brand === brandName);

    return res || null;
}

ProductDB.addOrUpdatePrice = (product : Product, price: Price) => {
    ProductDB.updatePriceList(price);
    console.log("New Product JSON")
    console.dir(product);
    console.log(JSON.stringify(product))
}

ProductDB.fetchProducts = () => {
    console.log("Fetch products from db")
}

ProductDB.addMyProduct = (product: Product, store: Store, quan: number)=>{
    exampleProductRecords.push({productName: ProductDB.name, brandName: ProductDB.brand, storeName: store.name, amount: 14.50, quantity: quan})
    console.log(exampleProductRecords)
}
ProductDB.addProduct = (product: Product)=>{
    exampleProducts.push(product)
    console.log(exampleProducts)
}

export default ProductDB; */