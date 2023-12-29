import {
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
} from '../services/carts.service.js'

const getCartController = async (req, res) => {
    try {
        const consultas = req.query
        const { limit } = consultas
        // console.log('1',limit)

        const carts = await getCartService(limit)
        console.log(carts)
        res.send({ status: 'success', payload:carts })
    } catch (error) {
        res.status(500).send({error:error.message})
    }


};

const addCartController  = async (req, res) => {
    try {
        const newCart = req.body;
        

        if (!newCart.products) {
            return res.status(400).send({ status: 'error', error: 'Incomplete Value', payload:req.body })
        }

        const resultado = await addCartService(newCart)
        res.send({ status: 'success', payload: resultado })

    } catch (error) {
        res.status(500).send({error:error.message})
    }
}

const getCartByIdController = async (req, res) => {
    try {
        const cart_id = req.params.cid
        const carts = await getCartByIdService(cart_id);
        res.send({ status: 'success', payload: carts })

    } catch (error) {
        res.status(500).send({error:error.message})
    }
};


const updateCartController =  async (req, res) => {

    const newProduct = req.body;

    const cart_id = req.params.cid

    if(!newProduct){
        return res.status(400).send({ status: 'error', error: 'Incomplete Value' })
    }

    const carts = updateCartService(newProduct,cart_id);

    res.send({ status: 'success', payload: carts })

};

const deleteAllProductsFromCartController =  async (req, res) => {

    const cart_id = req.params.cid

    const result = await deleteAllProductsFromCartService(cart_id);
   
    res.send({ status: 'success', payload: result })

};

const addProductToCartController =  async (req, res) => {

    const newProduct = req.body;

    const cart_id = req.params.cid

    if(!newProduct){
        return res.status(400).send({ status: 'error', error: 'Incomplete Value' })
    }
    

    const carts = await addProductToCartService(cart_id,newProduct);
    res.send({ status: 'success', payload: carts })

};

const updateCartProductController =  async (req, res) => {

    const cart_id = req.params.cid

    let product_id = req.params.pid

    let updateQuantity = req.body.quantity
    
    // console.log(req.body.quantity)

    updateQuantity = parseInt(updateQuantity)

    product_id = parseInt(product_id)
    
    const result = await updateCartProductService(cart_id,product_id,updateQuantity)

    res.send({ status: 'success', payload: result })

};

const deleteProductFromCartController =  async (req, res) => {

    const cart_id = req.params.cid

    let product_id = req.params.pid
    product_id = parseInt(product_id)
    

    const result = await deleteProductFromCartService(cart_id,product_id)

    res.send({ status: 'success', payload: result })

};


const addManyCartsController =  async (req, res) => {

    const newProducts = req.body;

    const result = await addManyCartsService(newProducts)

    res.send({ status: 'success', payload: result })

}

const cartPurchaseController = async (req,res) => {
    try {
        const {cid} = req.params;
        console.log(req.session)
        const { user } = req.session.user;

        const result = await cartPurchaseService(cid,user);

        res.send(result)

    } catch (error) {
        res.status(500).send({error:error.message})
    }
}

export {
    getCartController
    ,addCartController
    ,getCartByIdController
    ,updateCartController
    ,deleteAllProductsFromCartController
    ,addProductToCartController
    ,updateCartProductController
    ,deleteProductFromCartController
    ,addManyCartsController
    ,cartPurchaseController
}