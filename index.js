const {ProductManager} = require('./managers/ProductManager');

const manager = new ProductManager('./CHBackend-Fabian Cabana/files/products.json');


const env = async () => {
    const products = await manager.getProducts();
    console.log(products);

    // const productstwo = await manager.getProductById(1);
    // console.log(productstwo);

    // const product_prueba = {
    //     title: 'producto prueba',
    //     description:'Este es un producto prueba',
    //     price:200,
    //     thumbnail:'Sin imagen',
    //     code:'abc12355',
    //     stock:25
    // };

    const product_prueba_2 = {
        title: 'producto pruebaaaaaaaaaaaaaaa',
        description:'Este es un producto pruebaaaaaaaaaaaaaaa',
        price:200,
        thumbnail:'Sin imagenaaaaaaaaaa',
        code:'abc1235512153112',
        stock:25
    };
    
    await manager.addProduct(product_prueba_2);

    // await manager.updateProduct(1,product_prueba_2)

    // await manager.deleteProduct(1);

    const productss = await manager.getProducts();
    console.log(productss);

}

env();

// manager.addProduct('ra','ra',12,'raa','rar',12);

// console.log(manager.getProducts())