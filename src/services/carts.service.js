import { __dirname } from '../utils.js';
import CartManager from '../dao/dbManagers/carts.manager.js';
import productsManager from '../dao/dbManagers/products.manager.js'
import * as ticketsService from './tickets.service.js'


const manager = new CartManager();

const productManager = new productsManager();


const getCartService = async (limit) => {
        const carts = await manager.getCarts();
        // console.log('2',carts)
        if (!limit) {
            return(carts)
        } else {
            let limitProducts = carts.filter(element => element.id <= limit)
            return limitProducts
        }
};


const addCartService  = async (newCart) => {
    const carts = await manager.getCarts();
    await manager.addCart(newCart)
    return (carts)
}

const getCartByIdService = async (cart_id) => {

    const carts = await manager.getCartById(cart_id);
    return carts;
};

const updateCartService =  async (newProduct,cart_id) => {

    if(!newProduct){
        return res.status(400).send({ status: 'error', error: 'Incomplete Value' })
    }
    
    await manager.updateCart(cart_id,newProduct)
    const carts = await manager.getCartById(cart_id);
    return carts

};


const deleteAllProductsFromCartService =  async (cart_id) => {

    const result = await manager.deleteAllProductsFromCart(cart_id)
    
    return result

};



const addProductToCartService =  async (newProduct,cart_id) => {

    await manager.addProductToCart(cart_id,newProduct)
    const carts = await manager.getCartById(cart_id);
    return carts;

};

const updateCartProductService =  async (cart_id,product_id,updateQuantity) => {

    updateQuantity = parseInt(updateQuantity)

    product_id = parseInt(product_id)
    

    const result = await manager.updateCartProduct(cart_id,product_id,updateQuantity)

    return result
};

const deleteProductFromCartService =  async (cart_id,product_id) => {
    const result = await manager.deleteProductFromCart(cart_id,product_id)

    return result

};

const addManyCartsService =  async (newProducts) => {

    await manager.addManyCarts(newProducts)

    return newProducts

}

const cartPurchaseService = async (cid,user) => {
    //1. Obtener carrito por id
    const cart = await manager.getCartById(cid);

    
    // 2. Iterar el arreglo de productos que tienen 
    let amount = 0
    // Arreglo para almacenar los productos no disponibles
    const outOfStock = []
    cart.forEach( async ({product,quantity}) => {
        if(product.stock >= quantity){
            amount += product.price * quantity;
            product.stock -= quantity;
            // 3. Actualizar el stock del producto correspondiente.
            await productManager.updateProduct(product._id,product);
        } else {
            outOfStock.push({product,quantity});
        }
    })

    const ticket = await ticketsService.addTicketService(user,amount)
    // 4. Actualizar el carrito con los productos que no se pudieron comprar.
    await manager.updateCartProduct(cid,outOfStock);


}

export {
     getCartService
    ,addCartService
    ,getCartByIdService
    ,updateCartService
    ,deleteAllProductsFromCartService
    ,addProductToCartService
    ,updateCartProductService
    ,deleteProductFromCartService
    ,addManyCartsService
    ,cartPurchaseService
}