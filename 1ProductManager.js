class ProductManager {

    constructor() {
        this.products = [];
    }

    getProducts = () => {
        return this.products;
    }

    getProductById = (id) => {
        const checkId = id;
        const productFound = this.products.find(element => element.id === checkId);
        if (!productFound) {
            console.log('Producto No registrado');
            return
        }
        return productFound
    }

    addProduct = (title, description, price, thumbnail, code, stock) => {
        const producto = {
            title,
            description,
            price,
            thumbnail,
            code,
            stock
        }
        //Hacer todos los campos obligatorios 
        if (!title || !description || !price || !thumbnail || !code || !stock) {
            console.log('Todos los campos son obligatorios');
            return
        }
        // validar que no se repita el campo code 
        const productCode = this.products.findIndex(element => element.code === producto.code);
        // console.log(productCode)
        if (!(productCode === -1)) {
            console.log('Producto ya registrado');
            return
        }

        // Continues execution after validation
        if (this.products.length === 0) {
            // console.log(this.products.length);
            producto.id = 1;
        } else {
            // console.log(this.products.length);
            producto.id = this.products[this.products.length - 1].id + 1;
        }

        this.products.push(producto);
    }

}


const prueba = new ProductManager();


// prueba.addProduct('comida', 'comida de gato', 200, 'meh', 'P11', '10');

// console.log('1',prueba.getProducts());


// prueba.addProduct('producto prueba', '”Este es un producto prueba”', 200, 'Sin imagen', 'abc123', 25);

// console.log('2',prueba.getProducts());

// prueba.addProduct('producto prueba', '”Este es un producto prueba”', 200, 'Sin imagen', 'abc123', 25);

// console.log('3',prueba.getProducts());

// console.log('4',prueba.getProductById(2));
// console.log(prueba.getProductById(3));
