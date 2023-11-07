import { productsModel } from "./models/products.models.js";

export default class Products {
    constructor () {
        console.log('Working products with db');
    }

    getProducts = async (limitP = 10,pageP = 1,sortP,queryAtributeP,queryFilter) =>  {
       // pasar de BSON a POJO (Plain Old Javascript Object)
    
       if(sortP && queryAtributeP && queryFilter) {
        let queryObject = {
            [queryAtributeP]:queryFilter
           }
        const products = await productsModel.paginate(queryObject,{sort:{price:sortP},limit:limitP, page:pageP});
        console.log('both');
        // console.log(products);
        return products;
       } else if (sortP){
        const products = await productsModel.paginate({},{sort:{price:sortP},limit:limitP, page:pageP});
        console.log('sort');
        // console.log(products);
        return products;
       } else if (queryAtributeP && queryFilter){
        let queryObject = {
            [queryAtributeP]:queryFilter
           };

        const products = await productsModel.paginate(queryObject,{limit:limitP, page:pageP});
        //  const products = await productsModel.paginate({category:'Libros'},{limit:limitP, page:pageP});
        // console.log('qry',queryAtributeP,queryFilter)
        // console.log(products)
        return products;
       } else {
        let products = await productsModel.paginate({},{limit:limitP,page:pageP});
        console.log('default');
        // console.log(products);
        return products
       }

     
    }

    addProduct = async (product) => {
        const result = await productsModel.create(product);
        return result;
    }

    updateProduct = async (id,product) => {
        const result = await productsModel.updateOne({_id:id},product);
        return result;
    }

    addManyProducts = async(products) => {
        const result = await productsModel.insertMany(products);
        console.log(result);
    }

}