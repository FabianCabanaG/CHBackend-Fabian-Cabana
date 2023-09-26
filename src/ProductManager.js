// const fs = require('fs')
import fs from 'fs';


class ProductManager {

    constructor(path) {
        // this.products = [];
        this.path = path;
    }

    getProducts = async () => {
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

    getProductById = async (id) => {
        try {

            const checkId = id;
            const producto_completo = await this.getProducts();
            const productFound = producto_completo.find(element => element.id === checkId);
            if (!productFound) {
                console.log('Producto No registrado');
                const objeto_error = {objeto:'no encontrado'}
                return objeto_error
            }
            return productFound

        } catch (error) {
            console.log(error);
        }
    }

    updateProduct = async (id, objeto) => {
        try {

            const checkId = id;
            const producto_completo = await this.getProducts();
            const productFound = producto_completo.find(element => element.id === checkId);
            if (!productFound) {
                console.log('Producto No registrado');
                return
            }
            // si no se da un objeto como argumento, detener la ejecucion
            if (!objeto) {
                console.log('se debe dar un objeto para reemplazar')
            }

            if (!objeto.title || !objeto.description || !objeto.price || !objeto.thumbnail || !objeto.code || !objeto.stock) {
                console.log('Todos los campos del objeto deben existir')
            }

            objeto.id = checkId

            let producto_completo_2 = producto_completo.filter(element => element.id !== checkId);

            producto_completo_2.push(objeto);

            await fs.promises.writeFile(this.path, JSON.stringify(producto_completo_2, null, '\t'));

            return producto_completo_2

        } catch (error) {
            console.log(error);
        }
    }


    deleteProduct = async (id) => {
        try {

            const checkId = id;
            const producto_completo = await this.getProducts();
            const productFound = producto_completo.find(element => element.id === checkId);
            if (!productFound) {
                console.log('Producto No registrado');
                return
            }

            let producto_completo_2 = producto_completo.filter(element => element.id !== checkId);

            await fs.promises.writeFile(this.path, JSON.stringify(producto_completo_2, null, '\t'));

            return producto_completo_2

        } catch (error) {
            console.log(error);
        }
    }

    addProduct = async (producto) => {
        try {
            const producto_completo = await this.getProducts()

            // validar que no se repita el campo code 
            const productCode = producto_completo.findIndex(element => element.code === producto.code);
            // console.log(productCode)
            if (!(productCode === -1)) {
                console.log('Producto ya registrado');
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


const prueba = new ProductManager();

// module.exports = {
//     ProductManager
// }

export default ProductManager