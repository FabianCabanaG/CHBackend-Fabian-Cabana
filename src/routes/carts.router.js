import Router from 'express';
import { __dirname } from '../utils.js';
// import CartManager from "../managers/CartManager.js";
import {
    getCartController
    ,addCartController
    ,getCartByIdController
    ,updateCartController
    ,deleteAllProductsFromCartController
    ,addProductToCartController
    ,updateCartProductController
    ,deleteProductFromCartController
    ,addManyCartsController
    ,cartPurchaseController
}from '../controller/carts.controller.js';
 
const router = Router();

router.get('/', getCartController);

router.post('/', addCartController)

router.get('/:cid/',getCartByIdController);

router.put('/:cid/', updateCartController);

router.delete('/:cid/', deleteAllProductsFromCartController);

router.post('/:cid/producto/:pid', addProductToCartController);

router.put('/:cid/producto/:pid', updateCartProductController);

router.delete('/:cid/producto/:pid', deleteProductFromCartController);

router.post('/:cid/purchase', cartPurchaseController);

router.post('/devinsertmany', addManyCartsController)


export default router;