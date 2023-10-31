import { Router } from "express";
import { manager } from "./products.router.js";
import Chat  from "../dao/dbManagers/chat.manager.js";

const chatManager = new Chat();

const router = Router();

router.get('/', async (req,res) => {
    const products = await manager.getProducts();
    // console.log(products)
    // console.log({product: products})
    res.render('index',{product: products});
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