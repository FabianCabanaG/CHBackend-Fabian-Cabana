// const fs = require('fs')
import fs from 'fs';


class CartManager {

    constructor(path) {
        // this.products = [];
        this.path = path;
    }

    getCarts = async () => {
        try {
            if (fs.existsSync(this.path)) {
                const data = await fs.promises.readFile(this.path, 'utf-8');
                const products = JSON.parse(data);
                return products;
            } else {
                return [];
            }
        } catch (error) {
            console.log(error)
        }
    }

    getCartById = async (id) => {
        try {

            const checkId = Number(id);
            const carts = await this.getCarts();
            const cartFound = carts.find(element => element.id === checkId);
            if (!cartFound) {
                console.log('Carrito No registrado');
                const objeto_error = { objeto: 'no encontrado' }
                return objeto_error
            }
            return cartFound

        } catch (error) {
            console.log(error);
        }
    }

    updateCart = async (id, objeto) => {
        try {

            const checkId = id;
            const carts = await this.getCarts();
            const cartFound = carts.find(element => element.id === checkId);
            if (!cartFound) {
                console.log('Producto No registrado');
                return
            }
            // si no se da un objeto como argumento, detener la ejecucion
            if (!objeto) {
                console.log('se debe dar un objeto para reemplazar')
                return
            }

            if (!objeto.product || !objeto.quantity) {
                console.log('Todos los campos del objeto deben existir')
                return
            }

            objeto.id = checkId

            let cart_completo_2 = carts.filter(element => element.id !== checkId);

            cart_completo_2.push(objeto);

            await fs.promises.writeFile(this.path, JSON.stringify(cart_completo_2, null, '\t'));

            return cart_completo_2

        } catch (error) {
            console.log(error);
        }
    }


    deleteCart = async (id) => {
        try {

            const checkId = id;
            const cart_completo = await this.getCarts();
            const cartFound = cart_completo.find(element => element.id === checkId);
            if (!cartFound) {
                console.log('Producto No registrado');
                return
            }

            let cart_completo_2 = cart_completo.filter(element => element.id !== checkId);

            await fs.promises.writeFile(this.path, JSON.stringify(cart_completo_2, null, '\t'));

            return cart_completo_2

        } catch (error) {
            console.log(error);
        }
    }

    addProductToCart = async (cartId, producto) => {
        try {
            const carts = await this.getCarts();
            const checkId = Number(cartId);
            console.log(carts)
            const cartFound = carts.find(element => element.id === checkId);
            console.log(cartFound.products);
            // cartFound.products.push(producto)
            // console.log(cartFound.products);
            // console.log(cartFound)
            // console.log(carts)
            const productIdCart = cartFound.products.findIndex(element => element.id === producto.id)
            
            if(productIdCart === -1) {
                cartFound.products.push(producto)
            } else{
                cartFound.products[productIdCart].quantity++
            }

            console.log(cartFound.products);
            console.log(cartFound)
            console.log(carts)
            await fs.promises.writeFile(this.path, JSON.stringify(carts, null, '\t'));

            return (carts);
        } catch (error) {
            console.log(error);
        }
    }

    addCart = async (producto) => {
        try {
            const producto_completo = await this.getCarts()

            // validar que no se repita el id 
            const productId = producto_completo.findIndex(element => element.id === producto.id);
            // console.log(productCode)
            if (!(productId === -1)) {
                console.log('Carrito ya registrado');
                return
            }
            // Campos obligatorios
            if (!producto.products) {
                console.log('Todos los campos obligatorios deben existir')
                return
            }

            // Continues execution after validation
            if (producto_completo.length === 0) {
                // console.log(this.products.length);
                producto.id = 1;
            } else {
                // console.log(this.products.length);
                producto.id = producto_completo[producto_completo.length - 1].id + 1;
            }

            producto_completo.push(producto);


            await fs.promises.writeFile(this.path, JSON.stringify(producto_completo, null, '\t'));

            return (producto_completo);

        } catch (error) {
            console.log(error);
        }
    }

}



// module.exports = {
//     ProductManager
// }

export default CartManager