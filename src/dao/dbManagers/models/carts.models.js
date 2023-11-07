import mongoose from 'mongoose';

// Especificar nombre de la colección
 
const cartsCollection = 'carts';

// Definir schema del documento => atributos que tendrá el usuario

const cartsSchema = new mongoose.Schema({
    id :{
        type: Number,
        required:true,
    },
    products: [{
            id: {
                type: mongoose.Schema.Types.ObjectId,
                ref:'products'
            },
            quantity:Number
            

            
        }]
});

// middleware for populate 
cartsSchema.pre(['find','findOne'], function(){
    this.populate('products.id');
});

// Parte funcional del modelo, en donde se interactúa con la DB => Consultas, transaciones, escritura, actualización y borrado.

export const cartsModel = mongoose.model(cartsCollection,cartsSchema);



