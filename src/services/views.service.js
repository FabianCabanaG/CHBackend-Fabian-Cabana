// import { manager } from "./products.router.js";
import  Product  from "../dao/dbManagers/products.manager.js";
import Chat  from "../dao/dbManagers/chat.manager.js";
import Carts from '../dao/dbManagers/carts.manager.js';

const cartManager = new Carts();

const manager = new Product();

const getProductsViewService = async (req,res) => {
    const products = await manager.getProducts();
    let productsC = products.docs.map(product => product.toObject())
    // console.log({product: products})
    res.render('index',{product: productsC,user: req.session.user});
};

const getCartByIdViewService =  async (req, res) => {
    // const carts = await manager.getCarts();
    const cart_id = req.params.cid
    const carts = await cartManager.getCartById(cart_id);

    // let cartsC = carts.map(cart => cart.toObject())
    console.log(carts[0].products);
    console.log(carts[0].products[0].id.title)
    res.render('carts',{product: carts[0].products});

};

const getProductsViewTService = async (req,res) => {
    
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
    res.render('products',{product: fullResponse.payload,hasPrevPage    ,hasNextPage    ,prevLink    ,nextLink ,prevPage, nextPage,user: req.session.user});
};

const realTimeProductsService =  async (req,res) => {
    const products = await manager.getProducts();
    // console.log(products)
    // console.log({product: products})
    res.render('realTimeProducts',{product: products});
};

const chatService =  async (req,res) => {
    // console.log(products)
    // console.log({product: products})
    res.render('chat');
};


const registerService = (req,res) => {
    res.render('register')
};

const loginService = (req,res) => {
    res.render('login')
};

const retrievePasswordService = (req,res) => {
    res.render('retrievePassword')
};

const resetPasswordService = (req,res) => {
    res.render('resetpassword')
};


const profileService =  (req,res) => {
    console.log(req.session.user)
    res.render('profile',{
        user: req.session.user,

    })
};


export {
    getProductsViewService
   ,getCartByIdViewService
   ,getProductsViewTService
   ,realTimeProductsService
   ,chatService
   ,registerService
   ,loginService
   ,profileService
   ,retrievePasswordService
   ,resetPasswordService
};