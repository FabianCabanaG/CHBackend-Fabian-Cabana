import Router from 'express';
import { __dirname } from '../utils.js';
// import CartManager from "../managers/CartManager.js";
import {
    getCartService
    ,addCartService
    ,getCartByIdService
    ,updateCartService
    ,deleteAllProductsFromCartService
    ,addProductToCartService
    ,updateCartProductService
    ,deleteProductFromCart
    ,addManyCartsService
} from '../services/carts.service.js'
 
const router = Router();

router.get('/', getCartService);

router.post('/', addCartService)

router.get('/:cid/',getCartByIdService);

router.put('/:cid/', updateCartService);

router.delete('/:cid/', deleteAllProductsFromCartService);

router.post('/:cid/producto/:pid', addProductToCartService);

router.put('/:cid/producto/:pid', updateCartProductService);

router.delete('/:cid/producto/:pid', deleteProductFromCart);

router.post('/devinsertmany', addManyCartsService)


export default router;