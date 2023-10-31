import { productsModel } from "./models/products.models.js";

export default class Products {
    constructor () {
        console.log('Working products with db');
    }

    getProducts = async () =>  {
       // pasar de BSON a POJO (Plain Old Javascript Object)
        const products = await productsModel.find().lean();
        return products;
    }

    addProduct = async (product) => {
        const result = await productsModel.create(product);
        return result;
    }

    updateProduct = async (id,product) => {
        const result = await productsModel.updateOne({_id:id},product);
        return result;
    }

}