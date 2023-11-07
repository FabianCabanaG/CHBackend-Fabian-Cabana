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

    getCartById = async (id) =>  {
        // pasar de BSON a POJO (Plain Old Javascript Object)
         const carts = await cartsModel.find({_id:id}).lean();
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

    updateCartProduct = async (id,productId,quantity) => {
        const result = await cartsModel.updateOne(
            {_id:id,'products.id':productId},
            {$set:{'products.$.quantity':quantity}},
            {new:true}
            );
        return result;
    }

    deleteProductFromCart = async (id,productId) => {
        const result = await cartsModel.updateOne({_id:id},{$pull:{products:{id:productId}}});
        return result;
    }

    deleteAllProductsFromCart = async (id) => {
        const result = await cartsModel.updateOne({_id:id},{$unset:{products:1}});
        return result;
    }

    addManyCarts = async(products) => {
        const result = await cartsModel.insertMany(products);
        console.log(result);
    }
}