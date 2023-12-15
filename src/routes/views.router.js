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
} from '../services/views.service.js'


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


router.get('/',privateAccess,getProductsViewService );
router.get('/carts/:cid', getCartByIdViewService);
router.get('/products',getProductsViewTService );
router.get('/realTimeProducts',realTimeProductsService );
router.get('/chat',chatService );
router.get('/register',publicAccess,registerService );
router.get('/login',publicAccess,loginService );
router.get('/',privateAccess, profileService);


export default router;