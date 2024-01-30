import { Router } from "express";
// import { manager } from "./products.router.js";
import {
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
} from '../services/views.service.js'

import { generateUsers } from "../utils.js";


const router = Router();
// Middleware --> mudar a su propio sitio
const publicAccess = (req,res,next) => {
    if(req.session?.user) return res.redirect('/');
    next();
};

const privateAccess = (req,res,next) => {
    if(!req.session?.user) return res.redirect('/login');
    next();
}

const mockingService = (req,res) => {
    let products = [];

    for (let i=0; i<100 ; i++ ) {
        products.push(generateUsers());
    }

    res.render('mockingProducts',{product: products})
};

router.get('/',privateAccess,loginService );
router.get('/carts/:cid', getCartByIdViewService);
router.get('/products',getProductsViewTService );
router.get('/realTimeProducts',realTimeProductsService );
router.get('/chat',chatService );
router.get('/register',publicAccess,registerService );
router.get('/login',publicAccess,loginService );
router.get('/current',privateAccess, profileService);
router.get('/mocking_products',publicAccess,mockingService)
router.get('/retrievePassword',publicAccess,retrievePasswordService)
router.get('/resetpassword',publicAccess,resetPasswordService)


export default router;