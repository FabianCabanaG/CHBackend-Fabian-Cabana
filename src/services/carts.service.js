import { __dirname } from '../utils.js';
import CartManager from '../dao/dbManagers/carts.manager.js';

const manager = new CartManager();


const getCartService = async (req, res) => {

    const carts = await manager.getCarts();


    const consultas = req.query
    const { limit } = consultas

    if (!limit) {
        res.send(carts)
    } else {
        let limitProducts = carts.filter(element => element.id <= limit)
        res.send(limitProducts)
    }

};


const addCartService  = async (req, res) => {
// input format
    // {
    //     "products":
    //     [
    //                 {
    //                     "id": 34,
    //                     "quantity": 5
    //                 },
    //                 {
    //                     "id": 12,
    //                     "quantity": 16
    //                 },
    //                             {
    //                     "id": 123,
    //                     "quantity": 161
    //                 },
    //                             {
    //                     "id": 1002,
    //                     "quantity": 1611
    //                 }
    //     ],
    //     "id": 5
    //     }

    const carts = await manager.getCarts();

    const newCart = req.body;

    if (!newCart.products) {
        return res.status(400).send({ status: 'error', error: 'Incomplete Value', payload:req.body })
    }

    // const cartfound = carts.find(element => element.id === newCartId);
    // console.log(carts)
    // console.log(cartfound)
    // if (cartfound) {
    //     return res.status(400).send({ status: 'error', error: 'Cart already registered' })
    // }

    await manager.addCart(newCart)
    res.send({ status: 'success', payload: newCart })

}

const getCartByIdService = async (req, res) => {

    // const carts = await manager.getCarts();

    const cart_id = req.params.cid

    const carts = await manager.getCartById(cart_id);
    res.send({ status: 'success', payload: carts })

};

const updateCartService =  async (req, res) => {

    // const carts = await manager.getCarts();

    const newProduct = req.body;

    const cart_id = req.params.cid

    if(!newProduct){
        return res.status(400).send({ status: 'error', error: 'Incomplete Value' })
    }
    

    await manager.updateCart(cart_id,newProduct)
    const carts = await manager.getCartById(cart_id);
    res.send({ status: 'success', payload: carts })

};


const deleteAllProductsFromCartService =  async (req, res) => {

    // const carts = await manager.getCarts();


    const cart_id = req.params.cid

    const result = await manager.deleteAllProductsFromCart(cart_id)
   
    res.send({ status: 'success', payload: result })

};



const addProductToCartService =  async (req, res) => {

    // const carts = await manager.getCarts();

    const newProduct = req.body;

    const cart_id = req.params.cid

    if(!newProduct){
        return res.status(400).send({ status: 'error', error: 'Incomplete Value' })
    }
    

    await manager.addProductToCart(cart_id,newProduct)
    const carts = await manager.getCartById(cart_id);
    res.send({ status: 'success', payload: carts })

};




const updateCartProductService =  async (req, res) => {

    // const carts = await manager.getCarts();

    const cart_id = req.params.cid

    let product_id = req.params.pid

    let updateQuantity = req.body.quantity
    
    // console.log(req.body.quantity)

    updateQuantity = parseInt(updateQuantity)

    product_id = parseInt(product_id)
    

    const result = await manager.updateCartProduct(cart_id,product_id,updateQuantity)

    res.send({ status: 'success', payload: result })

};

const deleteProductFromCart =  async (req, res) => {

    // const carts = await manager.getCarts();

    const cart_id = req.params.cid

    let product_id = req.params.pid
    product_id = parseInt(product_id)
    

    const result = await manager.deleteProductFromCart(cart_id,product_id)

    res.send({ status: 'success', payload: result })

};

const addManyCartsService =  async (req, res) => {

    const newProducts = req.body;

    await manager.addManyCarts(newProducts)

    res.send({ status: 'success', payload: newProducts })

}

export {
     getCartService
    ,addCartService
    ,getCartByIdService
    ,updateCartService
    ,deleteAllProductsFromCartService
    ,addProductToCartService
    ,updateCartProductService
    ,deleteProductFromCart
    ,addManyCartsService
}