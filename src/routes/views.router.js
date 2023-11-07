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
    res.render('carts',{product: carts[0].products});

});

router.get('/products', async (req,res) => {
    
    const consultas = req.query
 
    let { limit = 10,page = 1,sort,filterName,filterValue} = consultas
    
    page = parseInt(page);
    limit = parseInt(limit)
    sort = parseInt(sort)

    const products = await manager.getProducts(limit,page,sort,filterName,filterValue);

    let productsC = products.docs.map(product => product.toObject())
    
    let fullResponse = {status:'success',payload:productsC,totalPages:products.totalPages,
    prevPage:products.prevPage,
    nextPage:products.nextPage,
    page:products.page,
    hasPrevPage:products.hasPrevPage,
    hasNextPage:products.hasNextPage,
    prevLink:`/products?page=${products.prevPage}`,
    nextLink:`/products?page=${products.nextPage}`
    }

    console.log(fullResponse)
    const {
        prevPage
        ,nextPage
        ,hasPrevPage
        ,hasNextPage
        ,prevLink
        ,nextLink } = fullResponse

    // console.log({product: products})
    res.render('products',{product: fullResponse.payload,hasPrevPage    ,hasNextPage    ,prevLink    ,nextLink ,prevPage, nextPage});
});

// productsRouter.get('/', async (req, res) => {
//     const consultas = req.query
//     let { limit = 10,page = 1,sort,filterName,filterValue} = consultas
//     page = parseInt(page);
//     limit = parseInt(limit)
//     sort = parseInt(sort)
//     console.log(filterName,filterValue)
//     const products = await manager.getProducts(limit,page,sort,filterName,filterValue);

//     let productsC = products.docs.map(product => product.toObject())
//     res.send({status:'success',payload:productsC,totalPages:products.totalPages,
//     prevPage:products.prevPage,
//     nextPage:products.nextPage,
//     page:products.page,
//     hasPrevPage:products.hasPrevPage,
//     hasNextPage:products.hasNextPage,
//     prevLink:`localhost:8080/api/products?page=${products.prevPage}`,
//     nextLink:`localhost:8080/api/products?page=${products.nextPage}`
//     })

// });



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