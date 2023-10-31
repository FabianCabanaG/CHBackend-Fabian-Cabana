import { cartsModel } from "./models/carts.models.js";

export default class Carts {
    constructor () {
        console.log('Working carts with db');
    }

    getCarts = async () =>  {
       // pasar de BSON a POJO (Plain Old Javascript Object)
        const carts = await cartsModel.find().lean();
        return carts;
    }

    addCart = async (cart) => {
        const result = await cartsModel.create(cart);
        return result;
    }

    updateCart = async (id,cart) => {
        const result = await cartsModel.updateOne({_id:id},cart);
        return result;
    }

}