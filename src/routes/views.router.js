import { Router } from "express";
import { manager } from "./products.router.js";

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

export default router;