import { Router } from "express";
import { manager } from "./products.router.js";
import Chat  from "../dao/dbManagers/chat.manager.js";
import Carts from '../dao/dbManagers/carts.manager.js';

const cartManager = new Carts();

const router = Router();

router.get('/', async (req,res) => {
    const products = await manager.getProducts();
    let productsC = products.docs.map(product => product.toObject())
    // console.log({product: products})
    res.render('index',{product: productsC});
});

router.get('/carts/:cid', async (req, res) => {

    // const carts = await manager.getCarts();

    const cart_id = req.params.cid
    const carts = await cartManager.getCartById(cart_id);

    // let cartsC = carts.map(cart => cart.toObject())
    console.log(carts[0].products);
    console.log(carts[0].products[0].id.title)
    res.render('index',{product: carts[0].products});

});


router.get('/realTimeProducts', async (req,res) => {
    const products = await manager.getProducts();
    // console.log(products)
    // console.log({product: products})
    res.render('realTimeProducts',{product: products});
});

router.get('/chat', async (req,res) => {
    // console.log(products)
    // console.log({product: products})
    res.render('chat');
});

export default router;