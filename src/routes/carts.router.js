import Router from 'express';
import { __dirname } from '../utils.js';
import CartManager from "../managers/CartManager.js";

const router = Router();

const manager = new CartManager(`${__dirname}/data/carrito.json`);


router.get('/', async (req, res) => {

    const carts = await manager.getCarts();


    const consultas = req.query
    const { limit } = consultas

    if (!limit) {
        res.send(carts)
    } else {
        let limitProducts = carts.filter(element => element.id <= limit)
        res.send(limitProducts)
    }

});


router.post('/', async (req, res) => {

    const carts = await manager.getCarts();

    const newCart = req.body;

    if (!newCart.products) {
        return res.status(400).send({ status: 'error', error: 'Incomplete Value' })
    }

    // const cartfound = carts.find(element => element.id === newCartId);
    // console.log(carts)
    // console.log(cartfound)
    // if (cartfound) {
    //     return res.status(400).send({ status: 'error', error: 'Cart already registered' })
    // }

    await manager.addCart(newCart)
    res.send({ status: 'success', payload: newCart })

})



router.post('/:cid/producto/:pid', async (req, res) => {

    // const carts = await manager.getCarts();

    const newProduct = req.body;

    const cart_id = req.params.cid

    if(!newProduct){
        return res.status(400).send({ status: 'error', error: 'Incomplete Value' })
    }
    

    await manager.addProductToCart(cart_id,newProduct)
    const carts = await manager.getCartById(cart_id);
    res.send({ status: 'success', payload: carts })

})



export default router;